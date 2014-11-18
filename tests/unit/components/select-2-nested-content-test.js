/*
  Test basic functionality with nested input for `content`
 */

import Ember from "ember";
import { test, moduleFor, moduleForComponent } from 'ember-qunit';
import startApp from "../../helpers/start-app";

var categorizedIngredients = [
  {
    text: "Vegetables",
    children: [
      {
        id: "tom",
        text: "Tomatoes"
      }, {
        id: "pin",
        text: "Pineapples"
      }
    ]
  }, {
    text: "Meat",
    children: [
      {
        id: "sal",
        text: "Salami"
      }, {
        id: "ham",
        text: "Ham"
      }, {
        id: "bac",
        text: "Bacon"
      }
    ]
  }
];

var App, component;
moduleForComponent('select-2', 'Select2Component (nested-content)', {
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

test("it sets value to selected object in single selection mode", function() {
  expect(4);

  this.append();

  component.set('content', categorizedIngredients);

  // open options by clicking on the element
  click('.select2-choice');
  // then select a nested option
  click('.select2-results li:nth-child(2) ul li:nth-child(3)', 'body');

  andThen(function() {
    strictEqual(component.get('value'), categorizedIngredients[1].children[2], "selects correct item");
    equal($('.select2-chosen').text(), categorizedIngredients[1].children[2].text, "has correct text");

    // select another option just to make sure
    click('.select2-choice');
    click('.select2-results li:nth-child(1) ul li:nth-child(1)', 'body');

    andThen(function() {
      strictEqual(component.get('value'), categorizedIngredients[0].children[0], "selects correct item");
      equal($('.select2-chosen').text(), categorizedIngredients[0].children[0].text, "has correct text");
    });
  });
});


test("it sets value to selected object's optionValuePath in single selection mode", function() {
  expect(4);

  this.append();

  component.set('content', categorizedIngredients);
  component.set('optionValuePath', 'id');

  // open options by clicking on the element
  click('.select2-choice');
  // then select a nested option
  click('.select2-results li:nth-child(2) ul li:nth-child(3)', 'body');

  andThen(function() {
    strictEqual(component.get('value'), categorizedIngredients[1].children[2].id, "selects correct item");
    equal($('.select2-chosen').text(), categorizedIngredients[1].children[2].text, "has correct text");

    // select another option just to make sure
    click('.select2-choice');
    click('.select2-results li:nth-child(1) ul li:nth-child(1)', 'body');

    andThen(function() {
      strictEqual(component.get('value'), categorizedIngredients[0].children[0].id, "selects correct item");
      equal($('.select2-chosen').text(), categorizedIngredients[0].children[0].text, "has correct text");
    });
  });
});


test("it sets value to array of selected objects in multiple selection mode", function() {
  expect(7);

  component.set('multiple', true);

  this.append();

  component.set('content', categorizedIngredients);

  equal($('.select2-choices').text().trim(), '', "has empty selection text on start");

  // select an option after opening the dropdown
  click('.select2-choices');
  click('.select2-results li:nth-child(2) ul li:nth-child(3)', 'body');

  andThen(function() {
    deepEqual(component.get('value'), [categorizedIngredients[1].children[2]], "has correct value");
    equal($('.select2-choices').text().replace(/ /g, ''), categorizedIngredients[1].children[2].text, "displays correct text");

    // select another item
    click('.select2-choices');
    click('.select2-results li:nth-child(1) ul li:nth-child(1)', 'body');

    andThen(function() {
      deepEqual(component.get('value'), [categorizedIngredients[1].children[2], categorizedIngredients[0].children[0]], "has correct value");
      equal($('.select2-choices').text().replace(/ /g, ''), categorizedIngredients[1].children[2].text + categorizedIngredients[0].children[0].text, "displays correct text");

      // remove the first item again
      click('.select2-search-choice:nth-child(1) .select2-search-choice-close');

      andThen(function() {
        deepEqual(component.get('value'), [categorizedIngredients[0].children[0]], "has correct value");
        equal($('.select2-choices').text().replace(/ /g, ''), categorizedIngredients[0].children[0].text, "displays correct text");
      });
    });
  });
});


test("it sets value to array of selected objects' optionValuePaths in multiple selection mode", function() {
  expect(7);

  component.set('multiple', true);

  this.append();

  component.set('content', categorizedIngredients);
  component.set('optionValuePath', 'id');

  equal($('.select2-choices').text().trim(), '', "has empty selection text on start");

  // select an option after opening the dropdown
  click('.select2-choices');
  click('.select2-results li:nth-child(2) ul li:nth-child(3)', 'body');

  andThen(function() {
    deepEqual(component.get('value'), [categorizedIngredients[1].children[2].id], "has correct value");
    equal($('.select2-choices').text().replace(/ /g, ''), categorizedIngredients[1].children[2].text, "displays correct text");

    // select another item
    click('.select2-choices');
    click('.select2-results li:nth-child(1) ul li:nth-child(1)', 'body');

    andThen(function() {
      deepEqual(component.get('value'), [categorizedIngredients[1].children[2].id, categorizedIngredients[0].children[0].id], "has correct value");
      equal($('.select2-choices').text().replace(/ /g, ''), categorizedIngredients[1].children[2].text + categorizedIngredients[0].children[0].text, "displays correct text");

      // remove the first item again
      click('.select2-search-choice:nth-child(1) .select2-search-choice-close');

      andThen(function() {
        deepEqual(component.get('value'), [categorizedIngredients[0].children[0].id], "has correct value");
        equal($('.select2-choices').text().replace(/ /g, ''), categorizedIngredients[0].children[0].text, "displays correct text");
      });
    });
  });
});