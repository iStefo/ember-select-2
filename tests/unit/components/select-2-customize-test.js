/*
	Test "customization" options like:
	 * `optionLabelPath`
	 * `optionDescriptionPath`
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
      return ingredient.name + ' ' + ingredient.subtext;
    }).join('');
    equal($('.select2-results li').text(), expected, "display correct text");
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
