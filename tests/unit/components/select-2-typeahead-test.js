/*
  Test the typeahead feature enabled by setting the `query` binding

  Also tests the customization options
   * `typeaheadSearchingText`
   * `typeaheadNoMatchesText` and escaping of the search term
   * `typeaheadErrorText`
 */

import Ember from "ember";
import { test, moduleFor, moduleForComponent } from 'ember-qunit';
import startApp from "../../helpers/start-app";


var simpleContent = Ember.A([
  {
    id: true,
    text: "Margherita"
  }, {
    id: "pep",
    text: "Peperoni"
  }, {
    id: 42,
    text: "Ham"
  }, {
    id: "haw",
    text: "Hawaii"
  }
]);

var firstContent = Ember.A([
  {
    id: true,
    text: "Margherita"
  }, {
    id: "pep",
    text: "Peperoni"
  }, {
    id: 42,
    text: "Ham"
  }, {
    id: "haw",
    text: "Hawaii"
  }, {
    id: "choco",
    text: "Chocolate"
  }, {
    id: "tomato",
    text: "Tomato"
  }, {
    id: 36,
    text: "Crust"
  }, {
    id: 37,
    text: "Dominos"
  }
]);

var moreContent = Ember.A([
  {
    id: "pine",
    text: "Pineapple"
  }, {
    id: "cheese",
    text: "Cheese"
  }, {
    id: 45,
    text: "Sausage"
  }, {
    id: 46,
    text: "Mushroom"
  }
]);

var App, component;
moduleForComponent('select-2', 'Select2Component (typeahead)', {
  setup: function() {
    App = startApp();
    // setup and append component to dom
    component = this.subject();
  },
  teardown: function() {
    Ember.run(App, 'destroy');
    Ember.run(component, 'destroy');
  }
});


test("it send `query` action with query and deferred arguments", function(assert) {
  assert.expect(1);

  var controller = {
    queryOptions: function(query, deferred) {
      deferred.resolve(simpleContent);
    }
  };

  var spy = sinon.spy(controller, 'queryOptions');

  component.setProperties({
    targetObject: controller,
    query: 'queryOptions'
  });

  this.render();

  // open options by clicking on the element
  click('.select2-choice');

  andThen(function() {
    assert.ok(spy.calledWithMatch(
        sinon.match.has('term', sinon.match.string),
        sinon.match.has('resolve', sinon.match.func)
      ), "callback with query object with search string and deferred object that can be resolved");
  });
});


test("it displays options from array", function(assert) {
  assert.expect(2);

  var controller = {
    queryOptions: function(query, deferred) {
      deferred.resolve(simpleContent);
    }
  };

  component.setProperties({
    targetObject: controller,
    query: 'queryOptions'
  });

  this.render();

  // open options by clicking on the element
  click('.select2-choice');

  andThen(function() {
    assert.equal($('.select2-results li').length, simpleContent.length, "has correct options length");
    assert.equal($('.select2-results li').text(), simpleContent.getEach('text').join(''), "display correct text");
  });
});


test("it displays options from ArrayProxy", function(assert) {
  assert.expect(2);

  var controller = {
    queryOptions: function(query, deferred) {
      deferred.resolve(Ember.ArrayProxy.create({ content: simpleContent }));
    }
  };

  component.setProperties({
    targetObject: controller,
    query: 'queryOptions'
  });

  this.render();

  // open options by clicking on the element
  click('.select2-choice');

  andThen(function() {
    assert.equal($('.select2-results li').length, simpleContent.length, "has correct options length");
    assert.equal($('.select2-results li').text(), simpleContent.getEach('text').join(''), "display correct text");
  });
});

test("it displays options from array with loading more", function(assert) {
  assert.expect(4);

  var alreadyLoadedOnce = false;
  var loadingMoreText = 'Loading more results…';

  var controller = {
    queryOptions: function(query, deferred) {
      if (alreadyLoadedOnce) {
        deferred.resolve({data: moreContent, more: false});
      } else {
        alreadyLoadedOnce = true;
        deferred.resolve({data: firstContent, more: true});
      }
    }
  };

  component.setProperties({
    targetObject: controller,
    query: 'queryOptions'
  });

  this.render();

  // open options by clicking on the element
  click('.select2-choice');

  andThen(function() {
    assert.equal($('.select2-results li').length, firstContent.length + 1, "has correct options length");
    assert.equal($('.select2-results li').text(), Ember.A(firstContent).getEach('text').join('') + loadingMoreText, "display correct text");

    //scroll to bottom, wait for scroll event to be regsitered, and expect a load more
    $('.select2-results').scrollTop($('.select2-results')[0].scrollHeight);

    Ember.run.later(this, function() {
        assert.equal($('.select2-results li').length, firstContent.length + moreContent.length, "has correct options length after scroll");
        assert.equal($('.select2-results li').text(), Ember.A(firstContent.concat(moreContent)).getEach('text').join(''), "display correct text after scroll");
    }, 150);
  });
});

test("it displays options from ArrayProxy with loading more", function(assert) {
  assert.expect(4);

  var alreadyLoadedOnce = false;
  var loadingMoreText = 'Loading more results…';

  var controller = {
    queryOptions: function(query, deferred) {
      if (alreadyLoadedOnce) {
        deferred.resolve({data: Ember.ArrayProxy.create({ content: moreContent }), more: false});
      } else {
        alreadyLoadedOnce = true;
        deferred.resolve({data: Ember.ArrayProxy.create({ content: firstContent }), more: true});
      }
    }
  };

  component.setProperties({
    targetObject: controller,
    query: 'queryOptions'
  });

  this.render();

  // open options by clicking on the element
  click('.select2-choice');

  andThen(function() {
    assert.equal($('.select2-results li').length, firstContent.length + 1, "has correct options length");
    assert.equal($('.select2-results li').text(), Ember.A(firstContent).getEach('text').join('') + loadingMoreText, "display correct text");

    //scroll to bottom, wait for scroll event to be regsitered, and expect a load more
    $('.select2-results').scrollTop($('.select2-results')[0].scrollHeight);

    Ember.run.later(this, function() {
        assert.equal($('.select2-results li').length, firstContent.length + moreContent.length, "has correct options length after scroll");
        assert.equal($('.select2-results li').text(), Ember.A(firstContent.concat(moreContent)).getEach('text').join(''), "display correct text after scroll");
    }, 150);
  });
});

test("it displays default minimumInputLength text", function(assert) {
  assert.expect(1);

  component.set("minimumInputLength", 3);

  this.render();

  // open options by clicking on the element
  click('.select2-choice');

  andThen(function() {
    assert.equal($('li.select2-no-results').text(), "Please enter 3 or more characters", "displays minimumInputLength text info");
  });
});

test("it allows no inputs longer than maximumInputLength", function(assert) {
  assert.expect(1);

  component.setProperties({
    maximumInputLength: 10,
    content: simpleContent
  });

  this.render();

  // open options by clicking on the element
  click('.select2-choice');

  andThen(function() {
    assert.equal(find('.select2-input', 'body')[0].maxLength, 10, "has 10 character limit");
  });

});

test("it displays default searching text when waiting for results for first time", function(assert) {
  assert.expect(1);

  var controller = {
    queryOptions: function(query, deferred) {}
  };

  component.setProperties({
    targetObject: controller,
    query: 'queryOptions'
  });

  this.render();

  // open options by clicking on the element
  click('.select2-choice');

  andThen(function() {
    assert.equal($('li.select2-searching').text(), "Searching…", "displays searching text");
  });
});


test("it displays custom `typeaheadSearchingText` when waiting for results for first time", function(assert) {
  assert.expect(1);

  var controller = {
    queryOptions: function(query, deferred) {}
  };

  component.setProperties({
    targetObject: controller,
    typeaheadSearchingText: "customSearch",
    query: 'queryOptions'
  });

  this.render();

  // open options by clicking on the element
  click('.select2-choice');

  andThen(function() {
    assert.equal($('li.select2-searching').text(), "customSearch", "displays custom searching text");
  });
});


test("it displays default no-matches message for empty response", function(assert) {
  assert.expect(1);

  var controller = {
    queryOptions: function(query, deferred) {
      deferred.resolve([]);
    }
  };

  component.setProperties({
    targetObject: controller,
    query: 'queryOptions'
  });

  this.render();

  // open options by clicking on the element
  click('.select2-choice');

  andThen(function() {
    assert.equal($('li.select2-no-results').text(), "No matches found", "display no results text");
  });
});


test("it displays custom `typeaheadNoMatchesText` text", function(assert) {
  assert.expect(1);

  var controller = {
    queryOptions: function(query, deferred) {
      deferred.resolve([]);
    }
  };

  component.setProperties({
    targetObject: controller,
    typeaheadNoMatchesText: "No results for %@",
    query: 'queryOptions'
  });

  this.render();


  // open options by clicking on the element
  click('.select2-choice');

  fillIn('.select2-input', 'body', 'bla');

  andThen(function() {    
    assert.equal($('li.select2-no-results').text(), "No results for ", "display custom no results text");
  });
});


test("it displays default error message for rejected promise", function(assert) {
  assert.expect(1);

  var controller = {
    queryOptions: function(query, deferred) {
      deferred.reject("Some message");
    }
  };

  component.setProperties({
    targetObject: controller,
    query: 'queryOptions'
  });

  this.render();

  // open options by clicking on the element
  click('.select2-choice');

  andThen(function() {
    assert.equal($('li.select2-ajax-error').text(), "Loading failed", "displays error text");
  });
});


test("it displays `typeaheadErrorText` for rejected promise", function(assert) {
  assert.expect(1);

  var controller = {
    queryOptions: function(query, deferred) {
      deferred.reject("Some message");
    }
  };

  component.setProperties({
    targetObject: controller,
    typeaheadErrorText: "Loading Error: %@",
    query: 'queryOptions'
  });

  this.render();

  // open options by clicking on the element
  click('.select2-choice');

  andThen(function() {
    assert.equal($('li.select2-ajax-error').text(), "Loading Error: Some message", "displays custom error text");
  });
});
