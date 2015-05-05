/*
  Test usage with Ember Data ArrayProxy and PromiseArray
 */

import Ember from "ember";
import DS from "ember-data";
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


var App, component;
moduleForComponent('select-2', 'Select2Component (ember-data)', {
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

test("it displays items from DS.RecordArray", function(assert) {
  assert.expect(4);

  this.render();

  // warp content in DS.RecordArray
  var simpleContentRecordArray = DS.RecordArray.create({
    content: simpleContent
  });

  component.set('content', simpleContentRecordArray);
  component.set('optionValuePath', 'id');

  // open options by clicking on the element
  click('.select2-choice');
  // then select an option
  click('.select2-results li:nth-child(3)', 'body');

  andThen(function() {
    assert.strictEqual(component.get('value'), simpleContent[2].id, "selects correct item");
    assert.equal($('.select2-chosen').text(), simpleContent[2].text, "has correct text");

    // select another option just to make sure
    click('.select2-choice');
    click('.select2-results li:nth-child(1)', 'body');

    andThen(function() {
      assert.strictEqual(component.get('value'), simpleContent[0].id, "selects correct item");
      assert.equal($('.select2-chosen').text(), simpleContent[0].text, "has correct text");
    });
  });
});

test("it displays items from DS.PromiseArray", function(assert) {
  assert.expect(2);

  this.render();

  // warp content in DS.RecordArray
  var simpleContentPromiseArray = DS.PromiseArray.create({
    promise: Ember.RSVP.resolve(simpleContent)
  });

  component.set('content', simpleContentPromiseArray);

  // wait until Promise is resolved
  simpleContentPromiseArray.then(function() {
    // open options by clicking on the element
    click('.select2-choice');

    andThen(function() {
      assert.equal($('.select2-results li').length, simpleContent.length, "has correct options length");
      assert.equal($('.select2-results li').text(), simpleContent.getEach('text').join(''), "display correct text");
    });
  });
});

test("it is disabled until content promise is resolved", function(assert) {
  assert.expect(2);

  var deferred = Ember.RSVP.defer();

  // warp content in DS.RecordArray
  var simpleContentPromiseArray = DS.PromiseArray.create({
    promise: deferred.promise
  });

  component.set('content', simpleContentPromiseArray);
  
  this.render();
  
  assert.ok($('.select2-container').hasClass('select2-container-disabled'), "is disabled");

  deferred.resolve(simpleContent);

  // wait until Promise is resolved
  simpleContentPromiseArray.then(function() {
    assert.ok(!$('.select2-container').hasClass('select2-container-disabled'), "is enabled");
  });
});

test("it stays disabled after content promise is rejected", function(assert) {
  assert.expect(2);

  var deferred = Ember.RSVP.defer(),
      errorText = "some error description";

  // warp content in DS.RecordArray
  var simpleContentPromiseArray = DS.PromiseArray.create({
    promise: deferred.promise
  });

  component.set('content', simpleContentPromiseArray);
  
  this.render();
  
  assert.ok($('.select2-container').hasClass('select2-container-disabled'), "is disabled");

  deferred.reject(new Error(errorText));

  // wait until Promise is rejected
  simpleContentPromiseArray.then(null, function() {
    assert.ok($('.select2-container').hasClass('select2-container-disabled'), "is disabled");
  });
});

test("it is disabled until value promise is resolved", function(assert) {
  assert.expect(2);

  var deferred = Ember.RSVP.defer();

  var simpleValuePromiseProxy = DS.PromiseObject.create({
    promise: deferred.promise
  });

  component.set('value', simpleValuePromiseProxy);

  this.render();

  assert.ok($('.select2-container').hasClass('select2-container-disabled'), "is disabled");

  deferred.resolve(simpleContent[0]);

  // wait until Promise is resolved
  simpleValuePromiseProxy.then(function() {
    assert.ok(!$('.select2-container').hasClass('select2-container-disabled'), "is enabled");
  });
});

test("it stays disabled after value promise is rejected", function(assert) {
  assert.expect(2);

  var deferred = Ember.RSVP.defer(),
      errorText = "some error description";

  var simpleValuePromiseProxy = DS.PromiseObject.create({
    promise: deferred.promise
  });

  component.set('value', simpleValuePromiseProxy);
  
  this.render();
  
  assert.ok($('.select2-container').hasClass('select2-container-disabled'), "is disabled");

  deferred.reject(new Error(errorText));

  // wait until Promise is rejected
  simpleValuePromiseProxy.then(null, function() {
    assert.ok($('.select2-container').hasClass('select2-container-disabled'), "is disabled");
  });
});

test("it clears selection when value promise resolves to null", function(assert) {
  assert.expect(2);

  var deferred = Ember.RSVP.defer(),
      placeholder = 'placeholder';

  var simpleValuePromiseProxy = DS.PromiseObject.create({
    promise: deferred.promise
  });

  component.setProperties({
    value: simpleValuePromiseProxy,
    placeholder: placeholder,
    allowClear: true
  });

  this.render();

  assert.ok($('.select2-container').hasClass('select2-container-disabled'), "is disabled");

  deferred.resolve(null);

  // wait until Promise is resolved
  simpleValuePromiseProxy.then(function() {
    assert.equal($('.select2-chosen').text(), placeholder, "has placeholder text");
  });
});