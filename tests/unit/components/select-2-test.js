/*
  Test basic functionality like selection in various modes
 */

import Ember from "ember";
import { test, moduleFor, moduleForComponent } from 'ember-qunit';
import startApp from "../../helpers/start-app";

/*
  Test Fixtures
 */
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
  }, {
    id: "lame",
    disabled: true,
    text: "Plain Cheese"
  }
]);
var additionalContent = Ember.A([
  {
    id: "cal",
    text: "Calzone"
  }, {
    id: "bbq",
    text: "Barbecue"
  }
]);


var App, component;
moduleForComponent('select-2', 'Select2Component', {
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


test("it renders", function(assert) {
  assert.expect(2);

  assert.equal(component._state, 'preRender');

  // appends the component to the page
  this.render();
  assert.equal(component._state, 'inDOM');
});


test("it initializes select2 plugin", function(assert) {
  assert.expect(2);

  // append the component to the DOM
  this.render();

  assert.ok(component.$().data('select2'), "has select2 data attribute");

  assert.ok($(".select2-container").length, "inserts container into dom");
});


test("it supports placeholder text", function(assert) {
  var placeholder = "unit testing rocks";

  component.set('placeholder', placeholder);

  this.render();

  assert.equal($('.select2-chosen').text(), placeholder, "has placeholder text");
});


test("it shows options when opened", function(assert) {
  assert.expect(2);

  this.render();

  component.set('content', simpleContent);

  // open options by clicking on the element
  click('.select2-choice');

  andThen(function() {
    assert.equal($('.select2-results li').length, simpleContent.length, "has correct options length");
    assert.equal($('.select2-results li').text(), simpleContent.getEach('text').join(''), "display correct text");
  });
});


test("it sets value to selected object in single selection mode", function(assert) {
  assert.expect(4);

  this.render();

  component.set('content', simpleContent);

  // open options by clicking on the element
  click('.select2-choice');
  // then select an option
  click('.select2-results li:nth-child(3)', 'body');

  andThen(function() {
    assert.strictEqual(component.get('value'), simpleContent[2], "selects correct item");
    assert.equal($('.select2-chosen').text(), simpleContent[2].text, "has correct text");

    // select another option just to make sure
    click('.select2-choice');
    click('.select2-results li:nth-child(1)', 'body');

    andThen(function() {
      assert.strictEqual(component.get('value'), simpleContent[0], "selects correct item");
      assert.equal($('.select2-chosen').text(), simpleContent[0].text, "has correct text");
    });
  });
});

test("it sends `didSelect` action once when selection has been changed", function(assert) {
  assert.expect(1);

  var controller = {
    selectionChanged: function() {}
  };
  var spy = sinon.spy(controller, 'selectionChanged');

  component.setProperties({
    targetObject: controller,
    content: simpleContent,
    didSelect: 'selectionChanged'
  });

  this.render();

  // open options by clicking on the element
  click('.select2-choice');
  // then select an option
  click('.select2-results li:nth-child(3)', 'body');

  andThen(function() {
    assert.ok(spy.calledOnce, "callback after selection changed has been executed");
  });
});

/*
  This test assures, that when sending the `didSelect` action, bindings have
  already been synced. Test for PR #75
 */
test("component has correct value before `didSelect` fires", function(assert) {
  assert.expect(1);

  var controller = Ember.Object.create({
    component: component,
    valueBinding: 'component.value',
    selectionChanged: function() {
      assert.strictEqual(this.get('value'), simpleContent[2], "selects correct item");
    }
  });

  component.setProperties({
    targetObject: controller,
    content: simpleContent,
    didSelect: 'selectionChanged'
  });

  this.render();

  // open options by clicking on the element
  click('.select2-choice');
  // then select an option
  click('.select2-results li:nth-child(3)', 'body');
});


test("it sends `didSelect` action having the new value as the first argument", function(assert) {
  assert.expect(2);

  var controller = {
    selectionChanged: function() {}
  };
  var spy = sinon.spy(controller, 'selectionChanged');

  component.setProperties({
    targetObject: controller,
    content: simpleContent,
    didSelect: 'selectionChanged'
  });

  this.render();

  // open options by clicking on the element
  click('.select2-choice');
  // then select an option
  click('.select2-results li:nth-child(3)', 'body');

  andThen(function() {
    assert.ok(spy.calledOnce, "callback after selection changed has been executed");
    assert.ok(spy.calledWith(simpleContent[2]), "has new value as argument");
  });
});


test("it sends `didSelect` action having a reference to itself as the second argument", function(assert) {
  assert.expect(2);

  var controller = {
    selectionChanged: function() {}
  };
  var spy = sinon.spy(controller, 'selectionChanged');

  component.setProperties({
    targetObject: controller,
    content: simpleContent,
    didSelect: 'selectionChanged'
  });

  this.render();

  // open options by clicking on the element
  click('.select2-choice');
  // then select an option
  click('.select2-results li:nth-child(3)', 'body');

  andThen(function() {
    assert.ok(spy.calledOnce, "callback after selection changed has been executed");
    assert.ok(spy.calledWith(simpleContent[2], component), "has reference to self as argument");
  });
});


test("it supports the allowClear option", function(assert) {
  assert.expect(3);

  component.set('placeholder', 'Select a value'); // placeholder is required for allowClear
  component.set('allowClear', true);

  this.render();

  component.set('content', simpleContent);

  // open options by clicking on the element
  click('.select2-choice');
  // then select an option
  click('.select2-results li:nth-child(3)', 'body');

  andThen(function() {
    assert.strictEqual(component.get('value'), simpleContent[2], "selects correct item");
    assert.equal($('.select2-chosen').text(), simpleContent[2].text, "has correct text");

    // Click the remove option x
    click('.select2-search-choice-close:visible');

    andThen(function() {
      assert.strictEqual(component.get('value'), null, "unselects the selected item");
    });
  });
});

test("it alerts if allowClear is set without a placeholder", function(assert) {
  assert.expect(1);

  component.set('placeholder', undefined);
  component.set('allowClear', true);

  try {
    this.render();
  } catch (e) {
    assert.equal(e.message, 'Assertion Failed: To use allowClear, you have to specify a placeholder', 'throws and error');
  }
});

test("it sets value to selected object's optionValuePath in single selection mode", function(assert) {
  assert.expect(4);

  this.render();

  component.set('content', simpleContent);
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


test("it allows individual options to be disabled", function(assert) {
  assert.expect(3);

  this.render();

  component.set('content', simpleContent);
  component.set('optionValuePath', 'id');

  //select an enabled option
  click('.select2-choice');
  click('.select2-results li:nth-child(2)', 'body');

  //click disabled option
  click('.select2-choice');
  click('.select2-results li:nth-child(5)', 'body');

  andThen(function() {
    //selection should remain unchanged
    assert.strictEqual(component.get('value'), simpleContent[1].id, "selection remains unchanged");
    assert.equal($('.select2-chosen').text(), simpleContent[1].text, "remains unchanged");

    //should have disabled styling
    assert.equal($('.select2-results li:nth-child(5)').hasClass('select2-disabled'), true, "has disabled class");
  });

});

test("it reacts to external value change", function(assert) {
  assert.expect(2);

  this.render();

  component.set('content', simpleContent);

  assert.equal($('.select2-chosen').text(), '', "has empty selection text on start");

  component.set('value', simpleContent[1]);

  assert.equal($('.select2-chosen').text(), simpleContent[1].text, "has correct selection text after value change");
});


test("it reacts to external value change with optionValuePath", function(assert) {
  assert.expect(2);

  this.render();

  component.set('content', simpleContent);
  component.set('optionValuePath', 'id');

  assert.equal($('.select2-chosen').text(), '', "has empty selection text on start");

  component.set('value', simpleContent[1].id);

  assert.equal($('.select2-chosen').text(), simpleContent[1].text, "has correct selection text after value change");
});


test("it sets value to array of selected objects in multiple selection mode", function(assert) {
  assert.expect(7);

  component.set('multiple', true);

  this.render();

  component.set('content', simpleContent);

  assert.equal($('.select2-choices').text().trim(), '', "has empty selection text on start");

  // select an option after opening the dropdown
  click('.select2-choices');
  click('.select2-results li:nth-child(3)', 'body');

  andThen(function() {
    assert.deepEqual(component.get('value'), [simpleContent[2]], "has correct value");
    assert.equal($('.select2-choices').text().replace(/ /g, ''), simpleContent[2].text, "displays correct text");

    // select another item
    click('.select2-choices');
    click('.select2-results li:nth-child(1)', 'body');

    andThen(function() {
      assert.deepEqual(component.get('value'), [simpleContent[2], simpleContent[0]], "has correct value");
      assert.equal($('.select2-choices').text().replace(/ /g, ''), simpleContent[2].text + simpleContent[0].text, "displays correct text");

      // remove the first item again
      click('.select2-search-choice:nth-child(1) .select2-search-choice-close');

      andThen(function() {
        assert.deepEqual(component.get('value'), [simpleContent[0]], "has correct value");
        assert.equal($('.select2-choices').text().replace(/ /g, ''), simpleContent[0].text, "displays correct text");
      });
    });
  });
});


test("it sets value to array of selected objects' optionValuePaths in multiple selection mode", function(assert) {
  assert.expect(7);

  component.set('multiple', true);

  this.render();

  component.set('content', simpleContent);
  component.set('optionValuePath', 'id');

  assert.equal($('.select2-choices').text().trim(), '', "has empty selection text on start");

  // select an option after opening the dropdown
  click('.select2-choices');
  click('.select2-results li:nth-child(3)', 'body');

  andThen(function() {
    assert.deepEqual(component.get('value'), [simpleContent[2].id], "has correct value");
    assert.equal($('.select2-choices').text().replace(/ /g, ''), simpleContent[2].text, "displays correct text");

    // select another item
    click('.select2-choices');
    click('.select2-results li:nth-child(1)', 'body');

    andThen(function() {
      assert.deepEqual(component.get('value'), [simpleContent[2].id, simpleContent[0].id], "has correct value");
      assert.equal($('.select2-choices').text().replace(/ /g, ''), simpleContent[2].text + simpleContent[0].text, "displays correct text");

      // remove the first item again
      click('.select2-search-choice:nth-child(1) .select2-search-choice-close');

      andThen(function() {
        assert.deepEqual(component.get('value'), [simpleContent[0].id], "has correct value");
        assert.equal($('.select2-choices').text().replace(/ /g, ''), simpleContent[0].text, "displays correct text");
      });
    });
  });
});


test("it reacts to changing the content array", function(assert) {
  assert.expect(4);

  this.render();

  var content = Ember.A();
  content.pushObjects(simpleContent);

  component.set('content', content);

  // select an option after opening the dropdown
  click('.select2-choice');

  andThen(function() {
    assert.equal($('.select2-results li').length, simpleContent.length, "has correct options length");
    assert.equal($('.select2-results li').text(), simpleContent.getEach('text').join(''), "display correct text");

    click('.select2-choice');

    content.pushObjects(additionalContent);

    click('.select2-choice');

    andThen(function() {
      assert.equal($('.select2-results li').length, simpleContent.length + additionalContent.length, "has correct options length");
      assert.equal($('.select2-results li').text(), simpleContent.getEach('text').join('') + additionalContent.getEach('text').join(''), "display correct text");
    });
  });
});


test("it is disabled when its selection contains values not in the content array", function(assert) {
  assert.expect(2);

  this.render();

  var content = Ember.A();
  content.pushObjects(simpleContent);

  component.set('content', content);
  component.set('multiple', true);
  component.set('optionValuePath', 'id');
  component.set('value', ['bbq']);

  assert.ok($('.select2-container').hasClass('select2-container-disabled'), "is disabled");

  content.pushObjects(additionalContent);

  assert.ok(!$('.select2-container').hasClass('select2-container-disabled'), "is enabled");
});


test("Change event does not trigger an autorun", function(assert) {
  assert.expect(1);

  this.render();
  var content = Ember.A();
  content.pushObjects(simpleContent);
  component.set('content', content);
  component.set('optionValuePath', 'id');

  Ember.addObserver(component, 'value', function() {
    Ember.run.schedule('afterRender', function() {
      assert.ok(true);
    });
  });

  component._select.val(42).trigger('change');
});
