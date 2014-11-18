import Ember from "ember";

var get = Ember.get;

/**
 * Ember select-2 component wrapping the jQuery select2 plugin while
 * respecting Ember data bindings and getter/setter methods on the content.
 *
 * Terminology:
 *  - Value: The currently selected value(s). Propagated to controllers etc.
 *    through the "value=..."" binding. Types:
 *    - Object: when using select-2 without any further configuration
 *    - Array of Objects: when using select-2 with "multiple=true"
 *    - Mixed: when using select-2 with "optionValuePath=..."
 *    - Array of Mixed: when using select-2 with "multiple=true" and
 *      "optionValuePath=..."
 *
 *  - Content: Array of Objects used to present to the user for choosing the
 *    selected values. "content" cannot be an Array of Strings, the Objects are
 *    expected to have an "id" and a property to be used as the label (by default,
 *    it is "text", but it can be overwritten it via "optionLabelPath"). These 
 *    properties can be computed properties or just plain JavaScript values.
 */
var Select2Component = Ember.Component.extend({
  tagName: "input",
  classNames: ["form-control"],
  classNameBindings: ["inputSize"],
  attributeBindings: ["style"],
  style: "display: hidden;",

  // Bindings that may be overwritten in the template
  inputSize: "input-md",
  cssClass: null,
  optionValuePath: null,
  optionLabelPath: 'text',
  optionDescriptionPath: 'description',
  placeholder: null,
  multiple: false,
  allowClear: false,
  enabled: true,
  query: null,
  typeaheadSearchingText: 'Searching…',
  typeaheadNoMatchesText: 'No matches found',
  typeaheadErrorText: 'Loading failed',

  // internal state
  _hasSelectedMissingItems: false,
  _hasPendingContentPromise: Ember.computed.alias('content.isPending'),
  _hasFailedContentPromise: Ember.computed.alias('content.isRejected'),
  _typeaheadMode: Ember.computed.bool('query'),

  didInsertElement: function() {
    var self = this,
        options = {},
        optionLabelPath = this.get('optionLabelPath'),
        optionDescriptionPath = this.get('optionDescriptionPath'),
        content = this.get('content');


    // ensure select2 is loaded
    Ember.assert("select2 has to exist on Ember.$.fn.select2", Ember.$.fn.select2);

    // setup
    options.placeholder = this.get('placeholder');
    options.multiple = this.get('multiple');
    options.allowClear = this.get('allowClear');

    // allowClear is only allowed with placeholder
    Ember.assert("To use allowClear, you have to specify a placeholder", !options.allowClear || options.placeholder);

    /*
      Formatting functions that ensure that the passed content is escaped in
      order to prevent XSS vulnerabilities. Escaping can be avoided by passing
      Handlebars.SafeString as "text" or "description" values.

      Generates the html used in the dropdown list (and is implemented to
      include the description html if available).
     */
    options.formatResult = function(item) {
      if (!item) {
        return;
      }

      var id = get(item, "id"),
          text = get(item, optionLabelPath),
          description = get(item, optionDescriptionPath),
          output = Ember.Handlebars.Utils.escapeExpression(text);

      // only for "real items" (no group headers) that have a description
      if (id && description) {
        output += " <span class=\"text-muted\">" +
          Ember.Handlebars.Utils.escapeExpression(description) + "</span>";
      }

      return output;
    };

    /*
      Generates the html used in the closed select input, displaying the
      currently selected element(s). Works like "formatResult" but
      produces shorter output by leaving out the description.
     */
    options.formatSelection = function(item) {
      if (!item) {
        return;
      }

      var text = get(item, optionLabelPath);

      // escape text unless it's passed as a Handlebars.SafeString
      return Ember.Handlebars.Utils.escapeExpression(text);
    };

    /*
      Provides a list of items that should be displayed for the current query
      term. Uses the default select2 matcher (which handles diacritics) with the
      Ember compatible getter method for optionLabelPath.
     */
    options.query = function(query) {
      var select2 = this;

      if (self.get('_typeaheadMode')) {
        var deferred = Ember.RSVP.defer('select2#query: ' + query.term);

        self.sendAction('query', query, deferred);

        deferred.promise.then(function(data) {
          if (data instanceof Ember.ArrayProxy) {
            data = data.toArray();
          }
          query.callback({
            results: data
          });
        }, function(reason) {
          query.callback({
            hasError: true,
            errorThrown: reason
          });
        });
      } else {
        Ember.assert("select2 has no content!", self.get('content'));

        var filteredContent = self.get("content").reduce(function(results, item) {
          // items may contain children, so filter them, too
          var filteredChildren = [];

          if (item.children) {
            filteredChildren = item.children.reduce(function(children, child) {
              if (select2.matcher(query.term, get(child, optionLabelPath))) {
                children.push(child);
              }
              return children;
            }, []);
          }

          // apply the regular matcher
          if (select2.matcher(query.term, get(item, optionLabelPath))) {
            // keep this item either if itself matches
            results.push(item);
          } else if (filteredChildren.length) {
            // or it has children that matched the term
            var result = Ember.$.extend({}, item, { children: filteredChildren });
            results.push(result);
          }
          return results;
        }, []);

        query.callback({
          results: filteredContent
        });
      }
    };

    /* 
      Supplies the string used when searching for options, can be set via
      `typeaheadSearchingText`
     */
    options.formatSearching = function() {
      var text = self.get('typeaheadSearchingText');

      return Ember.String.htmlSafe(text);
    };

    /* 
      Format the no matches message, substituting the %@ placeholder with the
      html-escaped user input
     */
    options.formatNoMatches = function(term) {
      var text = self.get('typeaheadNoMatchesText');
      if (text instanceof Ember.Handlebars.SafeString) {
        text = text.string;
      }

      term = Ember.Handlebars.Utils.escapeExpression(term);

      return Ember.String.htmlSafe(Ember.String.fmt(text, term));
    };

    /*
      Format the error message, substituting the %@ placeholder with the promise
      rejection reason
     */
    options.formatAjaxError = function(jqXHR, textStatus, errorThrown) {
      var text = self.get('typeaheadErrorText');

      return Ember.String.htmlSafe(Ember.String.fmt(text, errorThrown));
    };

    /*
      Maps "value" -> "object" when using select2 with "optionValuePath" set,
      and one time directly when setting up the select2 plugin even without "oVP".
      (but with empty value, which will just skip the method)

      Provides an object or an array of objects (depending on "multiple") that
      are referenced by the current select2 "val".

      When there are keys that can not be matched to objects, the select2 input
      will be disabled and a warning will be printed on the console.
      This is important in case the "content" has yet to be loaded but the
      "value" is already set and must not be accidentally changed because the
      inout cannot yet display all the options that are required.

      To disable this behaviour, remove those keys from "value" that can't be
      matched by objects from "content".
     */
    options.initSelection = function(element, callback) {
      var value = element.val(),
          content = self.get("content"),
          contentIsArrayProxy = Ember.ArrayProxy.detectInstance(content),
          multiple = self.get("multiple"),
          optionValuePath = self.get("optionValuePath");

      if (!value || !value.length) {
        return callback([]);
      }

      // this method should not be needed without the optionValuePath option
      // but make sure there is an appropriate error just in case.
      Ember.assert("select2#initSelection has been called without an \"" +
        "optionValuePath\" set.", optionValuePath);

      Ember.assert("select2#initSelection can not map string values to full objects " +
        "in typeahead mode. Please open a github issue if you have questions to this.",
        !self.get('_typeaheadMode'));


      var values = value.split(","),
          filteredContent = [];

      // for every object, check if its optionValuePath is in the selected
      // values array and save it to the right position in filteredContent
      var contentLength = get(content, 'length'),
          unmatchedValues = values.length,
          matchIndex;

      // START loop over content
      for (var i = 0; i < contentLength; i++) {
        var item = contentIsArrayProxy ? content.objectAt(i) : content[i];
        matchIndex = -1;

        if (item.children && item.children.length) {
          // take care of either nested data...
          for (var c = 0; c < item.children.length; c++) {
            var child = item.children[c];
            matchIndex = values.indexOf("" + get(child, optionValuePath));
            if (matchIndex !== -1) {
              filteredContent[matchIndex] = child;
              unmatchedValues--;
            }
            // break loop if all values are found
            if (unmatchedValues === 0) {
              break;
            }
          }
        } else {
          // ...or flat data structure: try to match simple item
          matchIndex = values.indexOf("" + get(item, optionValuePath));
          if (matchIndex !== -1) {
            filteredContent[matchIndex] = item;
            unmatchedValues--;
          }
          // break loop if all values are found
          if (unmatchedValues === 0) {
            break;
          }
        }
      }
      // END loop over content

      if (unmatchedValues === 0) {
        self.set('_hasSelectedMissingItems', false);
      } else {
        // disable the select2 element if there are keys left in the values
        // array that were not matched to an object
        self.set('_hasSelectedMissingItems', true);

        Ember.warn("select2#initSelection was not able to map each \"" +
          optionValuePath +"\" to an object from \"content\". The remaining " +
          "keys are: " + values + ". The input will be disabled until a) the " +
          "desired objects is added to the \"content\" array or b) the " +
          "\"value\" is changed.", !values.length);
      }

      if (multiple) {
        // return all matched objects
        return callback(filteredContent);
      } else {
        // only care about the first match in single selection mode
        return callback(filteredContent.get('firstObject'));
      }
    };

    /*
      Forward a custom css class to the components container and dropdown.
      The value will be read from the `cssClass` binding
     */
    options.containerCssClass = options.dropdownCssClass = function() {
      return self.get('cssClass') || '';
    };

    this._select = this.$().select2(options);

    this._select.on("change", function() {
      // grab currently selected data from select plugin
      var data = self._select.select2("data");
      // call our callback for further processing
      self.selectionChanged(data);
    });

    this.addObserver('content.[]', this.valueChanged);
    this.addObserver('content.@each.' + optionLabelPath, this.valueChanged);
    this.addObserver('content.@each.' + optionDescriptionPath, this.valueChanged);
    this.addObserver('value', this.valueChanged);

    // trigger initial data sync to set select2 to the external "value"
    this.valueChanged();

    // eventually disable input when content is PromiseProxy
    if (Ember.PromiseProxyMixin.detect(content)) {
      // enabling/siabling is done via binding to _hasPendingContentPromise
      // provide error for rejected promise, though.
      content.then(null, function (reason) {
        Ember.warn("select2: content promise was reject with reason " + reason +
          ". Recovering from this is not (yet) implemented.");
      });
    }
    
    this.watchDisabled();
  },

  /**
   * Teardown to prevent memory leaks
   */
  willDestroyElement: function() {
    // If an assertion caused the component not to render, we can't remove it from the dom.
    if(this._select) {
      this._select.off("change");
      this._select.select2("destroy");
    }

    this.removeObserver('content.[]', this.valueChanged);
    this.removeObserver(
      'content.@each.' + this.get('optionLabelPath'),
      this.valueChanged
    );
    this.removeObserver(
      'content.@each.' + this.get('optionDescriptionPath'),
      this.valueChanged
    );
    this.removeObserver('value', this.valueChanged);
  },

  /**
   * Respond to selection changes originating from the select2 element. If
   * select2 is working with full objects just use them to set the value,
   * use the optionValuePath otherwise.
   *
   * @param  {String|Object} data   Currently selected value
   */
  selectionChanged: function(data) {
    var value,
        multiple = this.get("multiple"),
        optionValuePath = this.get("optionValuePath");

    // if there is a optionValuePath, don't set value to the complete object,
    // but only the property referred to by optionValuePath
    if (optionValuePath) {
      if (multiple) {
        // data is an array, so use getEach
        value = data.getEach(optionValuePath);
      } else {
        // treat data as a single object
        value = get(data, optionValuePath);
      }
    } else {
      value = data;
    }

    this.set("value", value);
  },

  /**
   * Respond to external value changes. If select2 is working with full objects,
   * use the "data" API, otherwise just set the "val" property and let the
   * "initSelection" figure out which object was meant by that.
   */
  valueChanged: function() {
    var value = this.get("value"),
        optionValuePath = this.get("optionValuePath");

    if (optionValuePath) {
      // when there is a optionValuePath, the external value is a primitive value
      // so use the "val" method
      this._select.select2("val", value);
    } else {
      // otherwise set the full object via "data"
      this._select.select2("data", value);
    }
  },

  /**
   * Watch properties that determine the disabled state of the input.
   */
  watchDisabled: Ember.observer('_hasSelectedMissingItems', '_hasPendingContentPromise', '_hasFailedContentPromise', 'enabled', function() {
    var select = this._select,
        disabled = this.get('_hasSelectedMissingItems') ||
          this.get('_hasPendingContentPromise') ||
          this.get('_hasFailedContentPromise') ||
          !this.get('enabled');

    if (select) {
      Ember.run(function() {
        select.select2("readonly", disabled);
      });
    }
  })
});

export default Select2Component;
