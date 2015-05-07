/*
 Test tags including ember data support
 */

import Ember from "ember";
import { test, moduleFor, moduleForComponent } from 'ember-qunit';
import startApp from "../../helpers/start-app";

var App, component;
moduleForComponent('select-2', 'Select2Component (tags)', {
  setup: function() {
    App = startApp();
    // setup and append component to dom
    component = this.subject();
  },
  teardown: function() {
    //Ember.run(App, 'destroy');
    //Ember.run(component, 'destroy');
  }
});

test("it can have ember data record array as content", function(assert) {
  var store = App.__container__.lookup('store:main');

  var post;

  Ember.run(function() {
    post = store.createRecord('post', {
      title: "My post",
      body: "Testing stuff"
    });

    var tag = store.createRecord('tag', {
      name: "Ember.js"
    });
    post.get('tags').pushObject(tag);
  });

  component.setProperties({
    tags: true,
    value: post.get('tags'),
    optionLabelPath: 'name'
  });

  this.render();

  click('.select2-search-field');
  fillIn('.select2-input', 'tag 2');

  Ember.run.later(function() {

  }, 2000);

  andThen(function() {
    alert(find('.select2-results li:first-child').text());
    assert.equal(component.get('value.lastObject.name'), 'tag 2');
  });

  Ember.run.later(function() {

  }, 1000);

  andThen(function() {
    assert.equal(1, 1);
  });
});
