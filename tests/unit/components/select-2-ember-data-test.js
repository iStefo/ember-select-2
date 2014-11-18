/*
  Test usage with Ember Data ArrayProxy and PromiseArray
 */

import Ember from "ember";
import DS from "ember-data";
import { test, moduleFor, moduleForComponent } from 'ember-qunit';
import startApp from "../../helpers/start-app";


var simpleContent = [
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
];


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

test("it displays items from DS.RecordArray", function() {
  expect(4);

  this.append();

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
    strictEqual(component.get('value'), simpleContent[2].id, "selects correct item");
    equal($('.select2-chosen').text(), simpleContent[2].text, "has correct text");

    // select another option just to make sure
    click('.select2-choice');
    click('.select2-results li:nth-child(1)', 'body');

    andThen(function() {
      strictEqual(component.get('value'), simpleContent[0].id, "selects correct item");
      equal($('.select2-chosen').text(), simpleContent[0].text, "has correct text");
    });
  });
});

test("it displays items from DS.PromiseArray", function() {
  expect(2);

  this.append();

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
      equal($('.select2-results li').length, simpleContent.length, "has correct options length");
      equal($('.select2-results li').text(), simpleContent.getEach('text').join(''), "display correct text");
    });
  });
});

test("it is disabled until DS.PromiseArray's promise is resolved", function() {
  expect(2);

  var deferred = Ember.Deferred.create();

  // warp content in DS.RecordArray
  var simpleContentPromiseArray = DS.PromiseArray.create({
    promise: deferred
  });

  component.set('content', simpleContentPromiseArray);
  
  this.append();
  
  ok($('.select2-container').hasClass('select2-container-disabled'), "is disabled");

  deferred.resolve(simpleContent);

  // wait until Promise is resolved
  simpleContentPromiseArray.then(function() {
    ok(!$('.select2-container').hasClass('select2-container-disabled'), "is enabled");
  });
});

test("it stays disabled after DS.PromiseArray's promise is rejected", function() {
  expect(2);

  var deferred = Ember.Deferred.create(),
      errorText = "some error description";

  // warp content in DS.RecordArray
  var simpleContentPromiseArray = DS.PromiseArray.create({
    promise: deferred
  });

  component.set('content', simpleContentPromiseArray);
  
  this.append();
  
  ok($('.select2-container').hasClass('select2-container-disabled'), "is disabled");

  deferred.reject(new Error(errorText));

  // wait until Promise is rejected
  simpleContentPromiseArray.then(null, function() {
    ok($('.select2-container').hasClass('select2-container-disabled'), "is disabled");
  });
});