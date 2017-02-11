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
    Ember.run(App, 'destroy');
    Ember.run(component, 'destroy');
  }
});

test("it can have ember data record array as value and content", function(assert) {
  assert.expect(2);

  component.set("tags", true);
  component.set("optionLabelPath", "name");
  component.set("optionIdPath", "name");

  this.render();

  var store = App.__container__.lookup('store:main'),
      post, tags = Ember.A([]);

  Ember.run(function() {
    post = store.createRecord('post', {
      title: "My post",
      body: "Testing stuff"
    });

    var tag = store.createRecord('tag', {
      name: "Ember.js"
    });
    post.get('tags').pushObject(tag);

    component.set("value", post.get('tags'));

    tags.pushObject(store.createRecord('tag', {
      name: "Tan"
    }));

    component.set("content", tags);
  });

  andThen(function() {
    click('.select2-choices');
    component._select.select2("search", "tag 2");
    click('.select2-results li:first-child', 'body');
  });

  andThen(function() {
    assert.equal(component.get('value.lastObject.name'), 'tag 2', 'new tag added correctly');
  });

  andThen(function() {
    click('.select2-choices');
    component._select.select2("search", "TAG 2");
    click('.select2-results li:first-child', 'body');
  });

  andThen(function() {
    assert.equal(component.get('value.lastObject.name'), 'tag 2', 'tagging is case-sensitive');
  });
});

test("it can have plain objects as value and content", function(assert) {
  assert.expect(2);

  component.set("tags", true);
  component.set("optionLabelPath", "name");
  component.set("optionIdPath", "name");

  this.render();

  var tags = Ember.A([
    Ember.Object.create({ name: "tag 1" }),
    Ember.Object.create({ name: "tag 2" }),
    Ember.Object.create({ name: "tag 3" }),
    Ember.Object.create({ name: "tag 4" })
  ]);

  var value = Ember.A([
    Ember.Object.create({ name: "tag 6" })
  ]);

  component.set("content", tags);
  component.set("value", value);

  andThen(function() {
    click('.select2-choices');
    component._select.select2("search", "New tag");
    click('.select2-results li:first-child', 'body');
  });

  andThen(function() {
    assert.equal(component.get('value.lastObject.name'), 'New tag', 'new tag added correctly');
  });

  andThen(function() {
    click('.select2-choices');
    component._select.select2("search", "new TAG");
    click('.select2-results li:first-child', 'body');
  });

  andThen(function() {
    assert.equal(component.get('value.lastObject.name'), 'New tag', 'tagging is case-sensitive');
  });
});
