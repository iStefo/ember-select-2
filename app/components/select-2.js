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
 *    expected to have an "id" and a "text" property, which can be computed
 *    properties or just plain JavaScript Objects.
 */
var Select2Component = Ember.Component.extend({
  tagName: "input",
  classNames: ["form-control"],
  attributeBindings: ["style"],
  style: "display: hidden;",

  // Bindings that may be overwritten in the template
  optionValuePath: null,
  placeholder: null,
  multiple: false,

  didInsertElement: function() {
    var self = this,
        options = {};

    // ensure select2 is loaded
    Ember.assert("select2 has to exist on Ember.$.fn.select2", Ember.$.fn.select2);

    // setup
    options.placeholder = this.get('placeholder');
    options.multiple = this.get('multiple');

    /*
      Formatting functions that ensure that the passed content is escaped in
      order to prevent XSS vulnerabilities. Escaping can be avoided by passing
      Handlebars.SafeString as "text" or "description" values.

      Generates the html used in the dropdown list (and is implemented to
      include the description html if available).
     */
    options.formatResult = function(item) {
      if (!item) return;

      var id = get(item, "id"),
          text = get(item, "text"),
          description = get(item, "description"),
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
      if (!item) return;

      var text = get(item, "text");

      // escape text unless it's passed as a Handlebars.SafeString
      return Ember.Handlebars.Utils.escapeExpression(text);
    };

    /*
      Provides a list of items that should be displayed for the current query
      term. Uses the default select2 matcher (which handles diacritics) with the
      Ember compatible getter method for "text".
     */
    options.query = function(query) {
      var select2 = this;

      var filteredContent = self.get("content").reduce(function(results, item) {
        if (select2.matcher(query.term, get(item, "text"))) {
          results.push(item);
        }
        return results;
      }, []);

      query.callback({
        results: filteredContent
      });
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
          multiple = self.get("multiple"),
          optionValuePath = self.get("optionValuePath");

      if (!value || !value.length) {
        //self._select.select2("readonly", false);
        return callback([]);
      }

      // this method should not be needed without the optionValuePath option
      // but make sure there is an appropriate error just in case.
      Ember.assert("select2#initSelection has been called without an \"" +
        "optionValuePath\" set.", optionValuePath);

      if (multiple) {
        var values = value.split(",");

        var filteredContent = [];

        // for every object, check if its optionValuePath is in the selected
        // values array and save it to the right position in filteredContent
        var contentLength = content.length,
            unmatchedValues = values.length;
        for (var i = 0; i < contentLength; i++) {
          var item = content[i];
          var matchIndex = values.indexOf("" + get(item, optionValuePath));
          if (matchIndex !== -1) {
            filteredContent[matchIndex] = item;
            // remove the found key from values array
            values.removeAt(matchIndex);
            unmatchedValues--;
          }
          // break loop if all values are found
          if (unmatchedValues === 0) {
            break;
          }
        }

        if (unmatchedValues === 0) {
          self._select.select2('readonly', false);

        } else {
          // disable the select2 element if there are keys left in the values
          // array that were not matched to an object
          self._select.select2("readonly", true);

          // also, remove the holes that exist because there were values that
          // could not have been matched
          filteredContent.filter(function(item) { return item === undefined; });

          Ember.warn("select2#initSelection was not able to map each \"" +
            optionValuePath +"\" to an object from \"content\". The remaining " +
            "keys are: " + values + ". The input will be disabled until a) the " +
            "desired objects is added to the \"content\" array or b) the " +
            "\"value\" is changed.", !values.length);
        }        

        return callback(filteredContent);
      } else {
        var selectedObject = content.find(function(item) {
              // use getter and convert value to String because the object's
              // value may be an Integer etc but the select2 value is a String
              return ("" + get(item, optionValuePath) === value);
            });

        // disable the select2 element until it is possible to find an object for
        // the requested optionValuePath value.
        self._select.select2("readonly", !selectedObject);

        Ember.warn("select2#initSelection has to find an object with value \"" +
          value + "\" at path \"" + optionValuePath + "\", but did not! " +
          "The input will be disabled until a) the desired objects is added to " +
          "the \"content\" array or b) the \"value\" is changed.", selectedObject);

        return callback(selectedObject);
      }
    };

    this._select = this.$().select2(options);

    this._select.on("change", function() {
      // grab currently selected data from select plugin
      var data = self._select.select2("data");
      // call our callback for further processing
      self.selectionChanged(data);
    });

    // trigger initial data sync to set select2 to the external "value"
    this.valueChanged();
  },

  /**
   * Teardown to prevent memory leaks
   */
  willDestroyElement: function() {
    this._select.off("change");
    this._select.select2("destroy");
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
  valueChanged: Ember.observer(function() {
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
  }, "value"),

  /**
   * Respond to changes on the content array and trigger data sync from external
   * value to select2 value. This is needed when the external value points to an
   * object which was not present in the content array until now (because of
   * lazy loading), but which might be there now.
   *
   * Don't worry about triggering an update on the external value property, the
   * valueChanged method prevents feedback loops by not triggering the select2
   * "change" event.
   */
  contentChanged: Ember.observer(function() {
    this.valueChanged();
  }, "content.@each")
});

export default Select2Component;
