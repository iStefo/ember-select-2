import { test, moduleFor, moduleForComponent } from 'ember-qunit';

moduleForComponent('highlight-code', 'HighlightCodeComponent', {
  setup: function() {
    Ember.Handlebars.helper('highlight-code', this.factory());
  }
});

test("it renders", function() {
  expect(2);

  // creates the component instance
  var component = this.subject();
  equal(component.state, 'preRender');

  // appends the component to the page
  this.append();
  equal(component.state, 'inDOM');
});


test("it yields the right content", function() {
  expect(1);

  var component = Ember.View.extend({
    component: this.subject(),
    template: Ember.Handlebars.compile('{{#highlight-code}}hello!{{/highlight-code}}')
  }).create();

  Ember.run(function() {
    component.appendTo('#ember-testing');
  });

  equal(component.$().text(), "hello!");
});


test("it wraps the content in <pre><code>", function() {
  expect(2);

  var component = Ember.View.extend({
    component: this.subject(),
    template: Ember.Handlebars.compile('{{#highlight-code}}hello!{{/highlight-code}}')
  }).create();

  Ember.run(function() {
    component.appendTo('#ember-testing');
  });

  ok(component.$("pre").length, "pre exists");

  ok(component.$("pre > code").length, "pre > code exists");
});


test("it initializes highlight.js plugin", function() {
  expect(1);

  var component = Ember.View.extend({
    component: this.subject(),
    template: Ember.Handlebars.compile('{{#highlight-code}}hello!{{/highlight-code}}')
  }).create();

  Ember.run(function() {
    component.appendTo('#ember-testing');
  });

  ok(component.$("pre").hasClass('hljs'), "pre has class 'hljs'");
});
