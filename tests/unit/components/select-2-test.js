/* globals andThen */
import Ember from "ember";
import DS from "ember-data";
import { test, moduleFor, moduleForComponent } from 'ember-qunit';
import startApp from "../../helpers/start-app";

/*
  Test Fixtures
 */
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
var additionalContent = [
  {
    id: "cal",
    text: "Calzone"
  }, {
    id: "bbq",
    text: "Barbecue"
  }
];
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


test("it renders", function() {
  expect(2);

  equal(component.state, 'preRender');

  // appends the component to the page
  this.append();
  equal(component.state, 'inDOM');
});


test("it initializes select2 plugin", function() {
  expect(2);

  // append the component to the DOM
  this.append();

  ok(component.$().data('select2'), "has select2 data attribute");

  ok($(".select2-container").length, "inserts container into dom");
});


test("it supports placeholder text", function() {
  var placeholder = "unit testing rocks";

  component.set('placeholder', placeholder);

  this.append();

  equal($('.select2-chosen').text(), placeholder, "has placeholder text");
});


test("it shows options when opened", function() {
  expect(2);

  this.append();

  component.set('content', simpleContent);

  // open options by clicking on the element
  click('.select2-choice');

  andThen(function() {
    equal($('.select2-results li').length, simpleContent.length, "has correct options length");
    equal($('.select2-results li').text(), simpleContent.getEach('text').join(''), "display correct text");
  });
});


test("it sets value to selected object in single selection mode", function() {
  expect(4);

  this.append();

  component.set('content', simpleContent);

  // open options by clicking on the element
  click('.select2-choice');
  // then select an option
  click('.select2-results li:nth-child(3)', 'body');

  andThen(function() {
    strictEqual(component.get('value'), simpleContent[2], "selects correct item");
    equal($('.select2-chosen').text(), simpleContent[2].text, "has correct text");

    // select another option just to make sure
    click('.select2-choice');
    click('.select2-results li:nth-child(1)', 'body');

    andThen(function() {
      strictEqual(component.get('value'), simpleContent[0], "selects correct item");
      equal($('.select2-chosen').text(), simpleContent[0].text, "has correct text");
    });
  });
});

test("it supports the allowClear option", function() {
  expect(3);

  component.set('placeholder', 'Select a value'); // placeholder is required for allowClear
  component.set('allowClear', true);

  this.append();

  component.set('content', simpleContent);

  // open options by clicking on the element
  click('.select2-choice');
  // then select an option
  click('.select2-results li:nth-child(3)', 'body');

  andThen(function() {
    strictEqual(component.get('value'), simpleContent[2], "selects correct item");
    equal($('.select2-chosen').text(), simpleContent[2].text, "has correct text");

    // Click the remove option x
    click('.select2-search-choice-close:visible');

    andThen(function() {
      strictEqual(component.get('value'), null, "unselects the selected item");
    });
  });
});

test("it alerts if allowClear is set without a placeholder", function() {
  expect(1);

  component.set('placeholder', undefined);
  component.set('allowClear', true);

  try {
    this.append();
  } catch (e) {
    equal(e.message, 'Assertion Failed: To use allowClear, you have to specify a placeholder', 'throws and error');
  }
});

test("it sets value to selected object's optionValuePath in single selection mode", function() {
  expect(4);

  this.append();

  component.set('content', simpleContent);
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


test("it reacts to external value change", function() {
  expect(2);

  this.append();

  component.set('content', simpleContent);

  equal($('.select2-chosen').text(), '', "has empty selection text on start");

  component.set('value', simpleContent[1]);

  equal($('.select2-chosen').text(), simpleContent[1].text, "has correct selection text after value change");
});


test("it reacts to external value change with optionValuePath", function() {
  expect(2);

  this.append();

  component.set('content', simpleContent);
  component.set('optionValuePath', 'id');

  equal($('.select2-chosen').text(), '', "has empty selection text on start");

  component.set('value', simpleContent[1].id);

  equal($('.select2-chosen').text(), simpleContent[1].text, "has correct selection text after value change");
});


test("it sets value to array of selected objects in multiple selection mode", function() {
  expect(7);

  component.set('multiple', true);

  this.append();

  component.set('content', simpleContent);

  equal($('.select2-choices').text().trim(), '', "has empty selection text on start");

  // select an option after opening the dropdown
  click('.select2-choices');
  click('.select2-results li:nth-child(3)', 'body');

  andThen(function() {
    deepEqual(component.get('value'), [simpleContent[2]], "has correct value");
    equal($('.select2-choices').text().replace(/ /g, ''), simpleContent[2].text, "displays correct text");

    // select another item
    click('.select2-choices');
    click('.select2-results li:nth-child(1)', 'body');

    andThen(function() {
      deepEqual(component.get('value'), [simpleContent[2], simpleContent[0]], "has correct value");
      equal($('.select2-choices').text().replace(/ /g, ''), simpleContent[2].text + simpleContent[0].text, "displays correct text");

      // remove the first item again
      click('.select2-search-choice:nth-child(1) .select2-search-choice-close');

      andThen(function() {
        deepEqual(component.get('value'), [simpleContent[0]], "has correct value");
        equal($('.select2-choices').text().replace(/ /g, ''), simpleContent[0].text, "displays correct text");
      });
    });
  });
});


test("it sets value to array of selected objects' optionValuePaths in multiple selection mode", function() {
  expect(7);

  component.set('multiple', true);

  this.append();

  component.set('content', simpleContent);
  component.set('optionValuePath', 'id');

  equal($('.select2-choices').text().trim(), '', "has empty selection text on start");

  // select an option after opening the dropdown
  click('.select2-choices');
  click('.select2-results li:nth-child(3)', 'body');

  andThen(function() {
    deepEqual(component.get('value'), [simpleContent[2].id], "has correct value");
    equal($('.select2-choices').text().replace(/ /g, ''), simpleContent[2].text, "displays correct text");

    // select another item
    click('.select2-choices');
    click('.select2-results li:nth-child(1)', 'body');

    andThen(function() {
      deepEqual(component.get('value'), [simpleContent[2].id, simpleContent[0].id], "has correct value");
      equal($('.select2-choices').text().replace(/ /g, ''), simpleContent[2].text + simpleContent[0].text, "displays correct text");

      // remove the first item again
      click('.select2-search-choice:nth-child(1) .select2-search-choice-close');

      andThen(function() {
        deepEqual(component.get('value'), [simpleContent[0].id], "has correct value");
        equal($('.select2-choices').text().replace(/ /g, ''), simpleContent[0].text, "displays correct text");
      });
    });
  });
});


test("it reacts to changing the content array", function() {
  expect(4);

  this.append();

  var content = [];
  content.pushObjects(simpleContent);

  component.set('content', content);

  // select an option after opening the dropdown
  click('.select2-choice');

  andThen(function() {
    equal($('.select2-results li').length, simpleContent.length, "has correct options length");
    equal($('.select2-results li').text(), simpleContent.getEach('text').join(''), "display correct text");

    click('.select2-choice');

    content.pushObjects(additionalContent);

    click('.select2-choice');

    andThen(function() {
      equal($('.select2-results li').length, simpleContent.length + additionalContent.length, "has correct options length");
      equal($('.select2-results li').text(), simpleContent.getEach('text').join('') + additionalContent.getEach('text').join(''), "display correct text");
    });
  });
});


test("it is disabled when its selection contains values not in the content array", function() {
  expect(2);

  this.append();

  var content = [];
  content.pushObjects(simpleContent);

  component.set('content', content);
  component.set('multiple', true);
  component.set('optionValuePath', 'id');
  component.set('value', ['bbq']);

  ok($('.select2-container').hasClass('select2-container-disabled'), "is disabled");

  content.pushObjects(additionalContent);

  ok(!$('.select2-container').hasClass('select2-container-disabled'), "is enabled");
});

test("it is disabled when enabled = false is passed", function() {
  expect(1);

  this.append();

  var content = [];

  component.set('content', content);
  component.set('enabled', false);
  component.set('multiple', true);
  component.set('optionValuePath', 'id');
  component.set('value', ['bbq']);

  ok($('.select2-container').hasClass('select2-container-disabled'), "is disabled");
});


test("changing enabled state is observed", function() {
  expect(3);

  this.append();

  var content = [];
  content.pushObjects(additionalContent);

  component.set('content', content);
  component.set('enabled', false);
  component.set('multiple', true);
  component.set('optionValuePath', 'id');
  component.set('value', ['bbq']);

  ok($('.select2-container').hasClass('select2-container-disabled'), "is disabled");

  component.set('enabled', true);
  ok(!$('.select2-container').hasClass('select2-container-disabled'), "is enabled");

  component.set('enabled', false);
  ok($('.select2-container').hasClass('select2-container-disabled'), "is disabled");
});


/*
 * Nested Content
 */
test("(nested content) - it sets value to selected object in single selection mode", function() {
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


test("(nested content) - it sets value to selected object's optionValuePath in single selection mode", function() {
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


test("(nested content) - it sets value to array of selected objects in multiple selection mode", function() {
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


test("(nested content) - it sets value to array of selected objects' optionValuePaths in multiple selection mode", function() {
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

test("it is disabled when `enabled=false`", function() {
  expect(3);

  this.append();

  component.set('content', simpleContent);

  ok(!$('.select2-container').hasClass('select2-container-disabled'), "is enabled");

  component.set('enabled', false);

  ok($('.select2-container').hasClass('select2-container-disabled'), "is disabled");

  component.set('enabled', true);

  ok(!$('.select2-container').hasClass('select2-container-disabled'), "is enabled");
});


test("(ember-data) - displays items from DS.RecordArray", function() {
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

test("(ember-data) - displays items from DS.PromiseArray", function() {
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

test("(ember-data) - is disabled until DS.PromiseArray's promise is resolved", function() {
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

test("(ember-data) - stays disabled after DS.PromiseArray's promise is rejected", function() {
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
