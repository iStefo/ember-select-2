/*
  Test "customization" options like:
   * `optionLabelPath`
   * `optionHeadlinePath`   
   * `optionDescriptionPath`
   * `searchEnabled` 
   * custom styles (future...)
 */

import Ember from "ember";
import { test, moduleFor, moduleForComponent } from 'ember-qunit';
import startApp from "../../helpers/start-app";

var ingredients = Ember.A([
  {
    id: 1,
    name: 'Tomato',
    subtext: 'first'
  }, {
    id: 2,
    name: 'Peperoni',
    subtext: 'second'
  }, {
    id: 3,
    name: 'Ham',
    subtext: 'third'
  }, {
    id: 4,
    name: 'Chorizo',
    subtext: 'fourth'
  },
  {
    id: 5,
    group: 'Seefruits',
    subtext: 'fifth',
    children: [
      {    
        id: 6,
        name: 'Salmon'    
      },
      {    
        id: 7,
        name: 'Shrimps'    
      }
    ]
  }
]);

var modifiedIdIngredients = Ember.A([
  {
    code: 1,
    name: 'Tomato',
    description: 'first'
  }, {
    code: 2,
    name: 'Peperoni',
    description: 'second'
  }, {
    code: 3,
    name: 'Ham',
    description: 'third'
  }, {
    code: 4,
    name: 'Chorizo',
    description: 'fourth'
  }
]);

var App, component;
moduleForComponent('select-2', 'Select2Component (customize)', {
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



test("it uses optionLabelPath", function(assert) {
  assert.expect(2);

  component.set('optionLabelPath', 'name');
  component.set('content', ingredients);

  this.render();

  click('.select2-choice');
  click('.select2-results li:nth-child(2)', 'body');

  andThen(function() {
    assert.strictEqual(component.get('value'), ingredients[1], "selects correct item");
    assert.equal($('.select2-chosen').text(), ingredients[1].name, "has correct text");
  });
});


test("it uses optionHeadlinePath", function(assert) {
  assert.expect(1);

  component.set('optionHeadlinePath', 'group');
  component.set('content', ingredients);

  this.render();

  click('.select2-choice');

  andThen(function() {
    var headline = $('.select2-results > li:last-child').find('.select2-result-label').first().text();
    var expected = ingredients[4].group;
    assert.equal(headline, expected, "has correct headline");
  });
});


test("it uses optionDescriptionPath", function(assert) {
  assert.expect(1);

  component.set('optionLabelPath', 'name');
  component.set('optionDescriptionPath', 'subtext');
  component.set('content', ingredients);

  this.render();

  // open options by clicking on the element
  click('.select2-choice');

  andThen(function() {
    var expected = ingredients.map(function(ingredient) {
      // jQuery .text() will have space between name and subtext, but thats ok
      return (ingredient.children) ? '' : ingredient.name + ' ' + ingredient.subtext;
    }).join('');
    assert.equal($('.select2-results > li:not(:last)').text(), expected, "display correct text");
  });
});


test("it uses optionIdPath", function(assert) {
  assert.expect(1);

  component.setProperties({
    optionIdPath: 'code',
    content: modifiedIdIngredients
  });

  this.render();

  // open options by clicking on the element
  click('.select2-choice');
  // then select an option
  click('.select2-results li:nth-child(1)', 'body');

  andThen(function() {
    assert.strictEqual(component.get('value'), modifiedIdIngredients[0], 'selects correct item');
  });
});


test("it uses custom `cssClass` for container", function(assert) {
  assert.expect(1);

  component.set('cssClass', 'customClass');

  this.render();

  assert.ok($('.select2-container').hasClass('customClass'), "has class");
});


test("it uses custom `cssClass` for dropdown", function(assert) {
  assert.expect(1);

  component.set('cssClass', 'customClass');
  component.set('content', ingredients);

  this.render();

  click('.select2-choice');

  andThen(function() {
    assert.ok($('.select2-drop').hasClass('customClass'), "has class");
  });
});


test("disable search hides search field in single slection mode", function(assert) {
  assert.expect(1);

  component.setProperties({
    searchEnabled: false,
    content: ingredients
  });

  this.render();

  // open options by clicking on the element
  click('.select2-choice');

  andThen(function() {
    assert.equal($('select2-search input').length, 0, "no input field");
  });
});


test("disable search throws exception in multiple selection mode", function(assert) {
  assert.expect(1);

  component.setProperties({
    searchEnabled: false,
    multiple: true
  });

  try {
    this.render();
  } catch (e) {
    assert.ok(e, "threw exception");
  }
});


test("uses tabindex", function(assert) {
  assert.expect(1);

  component.setProperties({
    tabindex: -1,
    content: ingredients
  });

  this.render();

  assert.equal(find(".select2-focusser").attr("tabindex"), "-1", "tabindex matches");
});


test("uses `valueSeparator`", function(assert) {
  assert.expect(2);

  component.setProperties({
    content: [
      {
        id: "first",
        text: "First",
      }, {
        id: "second",
        text: "Second",
      }, {
        id: "thi,rd",
        text: "Third"
      }
    ],
    multiple: true,
    optionValuePath: 'id',
    valueSeparator: '|'
  });

  this.render();

  // open options by clicking on the element
  click('.select2-choices');
  // then select an option
  click('.select2-results li:nth-child(1)', 'body');

  // open options by clicking on the element
  click('.select2-choices');
  // and select another option
  click('.select2-results li:nth-child(2)', 'body');

  andThen(function() {
    assert.equal(component._select.val(), "first|second", "outputs correct raw value string");

    component.set("value", "second|thi,rd");

    assert.equal(component.get('_hasSelectedMissingItems'), false, "accepts value string with custom separator");
  });
});

test("it uses maximumSelectionValue", function(assert){

  assert.expect(2);

  component.setProperties({
    content: [
      {
        id: "first",
        text: "First",
      }, {
        id: "second",
        text: "Second",
      }, {
        id: "third",
        text: "Third"
      }
    ],
    multiple: true,
    optionValuePath: 'id',
    maximumSelectionSize: '2'
  });
 
  this.render();

   // open options by clicking on the element
  click('.select2-choices');
  // then select an option
  click('.select2-results li:nth-child(1)', 'body');

  // open options by clicking on the element
  click('.select2-choices');

  andThen(function(){
    assert.strictEqual($('.select2-selection-limit').length, 0, "allows adding more before limit is reached");
  });

  // and select another option
  click('.select2-results li:nth-child(2)', 'body');

  click('.select2-choices');
  
  andThen(function(){
    assert.strictEqual($('.select2-selection-limit').length, 1, "prevents adding more when limit is reached");
  });
});

test("uses `optionLabelSelectedPath`", function(assert) {
  assert.expect(1);

  component.setProperties({
    content: [
      {
        id: "first",
        text: "First",
        selectedText: "selectedFirst"
      }, {
        id: "second",
        text: "Second",
        selectedText: "selectedSecond"
      }
    ],
    optionValuePath: 'id',
    optionLabelSelectedPath: 'selectedText'
  });

  this.render();

  component.set("value", "first");

  assert.equal(find(".select2-choice").text().trim(), "selectedFirst", "has correct selected text");
});
