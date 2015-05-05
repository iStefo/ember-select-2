/*
  Test the `enabled=true/false` binding
 */

import Ember from "ember";
import { test, moduleFor, moduleForComponent } from 'ember-qunit';
import startApp from "../../helpers/start-app";

var App, component;
moduleForComponent('select-2', 'Select2Component (enabled-option)', {
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

test("it is disabled when `enabled=false` on creation", function(assert) {
  assert.expect(1);

  component.set('enabled', false);

  this.render();
  
  assert.ok($('.select2-container').hasClass('select2-container-disabled'), "is disabled");
});

test("it is disabled when `enabled=false`", function(assert) {
  assert.expect(3);

  this.render();

  assert.ok(!$('.select2-container').hasClass('select2-container-disabled'), "is enabled");

  component.set('enabled', false);

  assert.ok($('.select2-container').hasClass('select2-container-disabled'), "is disabled");

  component.set('enabled', true);

  assert.ok(!$('.select2-container').hasClass('select2-container-disabled'), "is enabled");
});

test("it stays disabled when `enabled=true` but has selected missing values", function(assert) {
  assert.expect(2);

  this.render();

  assert.ok(!$('.select2-container').hasClass('select2-container-disabled'), "is enabled");

  component.setProperties({
    optionValuePath: 'id',
    content: [],
    value: ['missingObject']
  });

  assert.ok($('.select2-container').hasClass('select2-container-disabled'), "is disabled");
});