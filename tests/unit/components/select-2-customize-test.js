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

var ingredients = [
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
];

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


test("it uses optionLabelPath", function() {
  expect(2);
  var component = this.subject({});

  component.set('optionLabelPath', 'name');
  component.set('content', ingredients);

  this.append();

  click('.select2-choice');
  click('.select2-results li:nth-child(2)', 'body');

  andThen(function() {
    strictEqual(component.get('value'), ingredients[1], "selects correct item");
    equal($('.select2-chosen').text(), ingredients[1].name, "has correct text");
  });
});


test("it uses optionHeadlinePath", function() {
  expect(1);
  var component = this.subject({});

  component.set('optionHeadlinePath', 'group');
  component.set('content', ingredients);

  this.append();

  click('.select2-choice');

  andThen(function() {
	var headline = $('.select2-results > li:last-child').find('.select2-result-label').first().text();
	var expected = ingredients[4].group;
    equal(headline, expected, "has correct headline");
  });
});


test("it uses optionDescriptionPath", function() {
  expect(1);

  var component = this.subject({});

  component.set('optionLabelPath', 'name');
  component.set('optionDescriptionPath', 'subtext');
  component.set('content', ingredients);

  this.append();

  // open options by clicking on the element
  click('.select2-choice');

  andThen(function() {
    var expected = ingredients.map(function(ingredient) {
      // jQuery .text() will have space between name and subtext, but thats ok
      return ('undefined' !== typeof ingredient.children) ? '' : ingredient.name + ' ' + ingredient.subtext;
    }).join('');
    equal($('.select2-results > li:not(:last)').text(), expected, "display correct text");
  });
});


test("it uses custom `cssClass` for container", function() {
  expect(1);

  var component = this.subject();

  component.set('cssClass', 'customClass');

  this.append();

  ok($('.select2-container').hasClass('customClass'), "has class");
});


test("it uses custom `cssClass` for dropdown", function() {
  expect(1);

  var component = this.subject();

  component.set('cssClass', 'customClass');
  component.set('content', ingredients);

  this.append();

  click('.select2-choice');

  andThen(function() {
    ok($('.select2-drop').hasClass('customClass'), "has class");
  });
});


test("disable search hides search field in single slection mode", function() {
  expect(1);

  var component = this.subject();

  component.setProperties({
    searchEnabled: false,
    content: ingredients
  });

  this.append();

  // open options by clicking on the element
  click('.select2-choice');

  andThen(function() {
    equal($('select2-search input').length, 0, "no input field");
  });
});


test("disable search throws exception in multiple selection mode", function() {
  expect(1);

  var component = this.subject();

  component.setProperties({
    searchEnabled: false,
    multiple: true
  });

  try {
    this.append();
  } catch (e) {
    ok(e, "threw exception");
  }
});
