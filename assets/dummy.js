/* jshint ignore:start */

/* jshint ignore:end */

define('dummy/app', ['exports', 'ember', 'ember/resolver', 'ember/load-initializers', 'dummy/config/environment'], function (exports, Ember, Resolver, loadInitializers, config) {

  'use strict';

  var App;

  Ember['default'].MODEL_FACTORY_INJECTIONS = true;

  App = Ember['default'].Application.extend({
    modulePrefix: config['default'].modulePrefix,
    podModulePrefix: config['default'].podModulePrefix,
    Resolver: Resolver['default']
  });

  loadInitializers['default'](App, config['default'].modulePrefix);

  exports['default'] = App;

});
define('dummy/components/highlight-code', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  var HighlightCodeComponent = Ember['default'].Component.extend({
    tagName: "pre",

    languageClass: Ember['default'].computed("lang", function () {
      return "language-" + this.get("lang");
    }),

    didInsertElement: function didInsertElement() {
      window.hljs.highlightBlock(this.$().get(0));
    }
  });

  exports['default'] = HighlightCodeComponent;

});
define('dummy/components/link-li', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  var LinkLiComponent = Ember['default'].Component.extend({
    tagName: 'li',
    classNameBindings: ['active'],

    active: Ember['default'].computed('childViews.@each.active', function () {
      return this.get('childViews').anyBy('active');
    })
  });

  exports['default'] = LinkLiComponent;

});
define('dummy/components/select-2', ['exports', 'ember-select-2/components/select-2'], function (exports, Select2Component) {

	'use strict';

	/*
		This is just a proxy file requiring the component from the /addon folder and
		making it available to the dummy application!
	 */
	exports['default'] = Select2Component['default'];

});
define('dummy/controllers/application', ['exports', 'ember', 'dummy/config/environment'], function (exports, Ember, config) {

	'use strict';

	var ApplicationController = Ember['default'].Controller.extend({
		version: config['default'].version
	});

	exports['default'] = ApplicationController;

});
define('dummy/controllers/examples', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  var ExamplesController = Ember['default'].Controller.extend({
    favouritePizza: null,
    favouritePizzaId: Ember['default'].computed.oneWay("ham"),
    favouritePizzas: null,
    favouritePizzaIds: null,
    preselectedPizzaIds: ["ham", "pep", "tex"],
    chosenIngredients: null,
    chosenTypeaheadPizza: null,
    enabled: true,

    pizzas: Ember['default'].A([{
      id: "mar",
      text: "Margherita",
      description: "The original italian one"
    }, {
      id: "pep",
      text: "Peperoni",
      description: "For the Peperoni lovers"
    }, {
      id: "ham",
      text: "Ham",
      description: "Another well known classic"
    }, {
      id: "haw",
      text: "Hawaii",
      description: "For the exotic ones"
    }]),

    morePizzas: [{
      id: "cal",
      text: "Calzone",
      description: "Anyone know what that is?"
    }, {
      id: "bbq",
      text: "Barbecue",
      description: "Just lovely!"
    }],

    evenMorePizzas: [{
      id: "tex",
      text: "Texas",
      description: "Like Barbecue but with bullets"
    }, {
      id: "for",
      text: "Quattro Formaggi",
      description: "Cheese overload"
    }],

    disabledPizzas: Ember['default'].A([{
      id: "1",
      text: "Margherita",
      description: "The original italian one"
    }, {
      id: "2",
      text: "Cheese",
      disabled: true,
      description: "Can you say Laaame?"
    }]),

    ingredients: [{
      text: "Vegetables",
      children: [{
        id: "tom",
        text: "Tomatoes"
      }, {
        id: "pin",
        text: "Pineapples"
      }]
    }, {
      text: "Meat",
      children: [{
        id: "sal",
        text: "Salami"
      }, {
        id: "ham",
        text: "Ham"
      }, {
        id: "bac",
        text: "Bacon"
      }]
    }],

    actions: {
      selectPizza: function selectPizza(item) {
        this.set("favouritePizza", item);
      },

      loadPizzas: function loadPizzas() {
        this.pizzas.pushObjects(this.morePizzas);
        this.morePizzas = [];
      },

      loadMorePizzas: function loadMorePizzas() {
        this.pizzas.pushObjects(this.evenMorePizzas);
        this.evenMorePizzas = [];
      },

      toggleEnabled: function toggleEnabled() {
        this.toggleProperty("enabled");
      },

      queryPizzas: function queryPizzas(query, deferred, isInfiniteScroll) {
        setTimeout(function () {
          var data = [];
          switch (query.term) {
            case "error":
              deferred.reject("sample error");
              break;
            case "empty":
              deferred.resolve(data);
              break;
            default:
              for (var i = 0; i < 10; i++) {
                data.push({
                  id: query.term + "_" + i,
                  text: "Pizza " + query.term + " " + i
                });
              }
              if (isInfiniteScroll) {
                deferred.resolve({ data: data, more: true });
              } else {
                deferred.resolve(data);
              }
              break;
          }
        }, 300);
      },

      queryInfiniteScrollPizzas: function queryInfiniteScrollPizzas(query, deferred) {
        this.send("queryPizzas", query, deferred, true);
      }
    } });

  exports['default'] = ExamplesController;

});
define('dummy/ember-select-2/tests/modules/ember-select-2/components/select-2.jshint', function () {

  'use strict';

  module('JSHint - modules/ember-select-2/components');
  test('modules/ember-select-2/components/select-2.js should pass jshint', function () {
    ok(true, 'modules/ember-select-2/components/select-2.js should pass jshint.');
  });

});
define('dummy/initializers/app-version', ['exports', 'dummy/config/environment', 'ember'], function (exports, config, Ember) {

  'use strict';

  var classify = Ember['default'].String.classify;
  var registered = false;

  exports['default'] = {
    name: 'App Version',
    initialize: function initialize(container, application) {
      if (!registered) {
        var appName = classify(application.toString());
        Ember['default'].libraries.register(appName, config['default'].APP.version);
        registered = true;
      }
    }
  };

});
define('dummy/initializers/export-application-global', ['exports', 'ember', 'dummy/config/environment'], function (exports, Ember, config) {

  'use strict';

  exports.initialize = initialize;

  function initialize(container, application) {
    var classifiedName = Ember['default'].String.classify(config['default'].modulePrefix);

    if (config['default'].exportApplicationGlobal && !window[classifiedName]) {
      window[classifiedName] = application;
    }
  }

  ;

  exports['default'] = {
    name: 'export-application-global',

    initialize: initialize
  };

});
define('dummy/router', ['exports', 'ember', 'dummy/config/environment'], function (exports, Ember, config) {

  'use strict';

  var Router = Ember['default'].Router.extend({
    location: config['default'].locationType
  });

  Router.map(function () {
    this.route('examples');
    this.route('docs');
  });

  exports['default'] = Router;

});
define('dummy/templates/application', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    var child0 = (function() {
      var child0 = (function() {
        return {
          isHTMLBars: true,
          revision: "Ember@1.11.1",
          blockParams: 0,
          cachedFragment: null,
          hasRendered: false,
          build: function build(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("Home");
            dom.appendChild(el0, el1);
            return el0;
          },
          render: function render(context, env, contextualElement) {
            var dom = env.dom;
            dom.detectNamespace(contextualElement);
            var fragment;
            if (env.useFragmentCache && dom.canClone) {
              if (this.cachedFragment === null) {
                fragment = this.build(dom);
                if (this.hasRendered) {
                  this.cachedFragment = fragment;
                } else {
                  this.hasRendered = true;
                }
              }
              if (this.cachedFragment) {
                fragment = dom.cloneNode(this.cachedFragment, true);
              }
            } else {
              fragment = this.build(dom);
            }
            return fragment;
          }
        };
      }());
      return {
        isHTMLBars: true,
        revision: "Ember@1.11.1",
        blockParams: 0,
        cachedFragment: null,
        hasRendered: false,
        build: function build(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("        	");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        render: function render(context, env, contextualElement) {
          var dom = env.dom;
          var hooks = env.hooks, block = hooks.block;
          dom.detectNamespace(contextualElement);
          var fragment;
          if (env.useFragmentCache && dom.canClone) {
            if (this.cachedFragment === null) {
              fragment = this.build(dom);
              if (this.hasRendered) {
                this.cachedFragment = fragment;
              } else {
                this.hasRendered = true;
              }
            }
            if (this.cachedFragment) {
              fragment = dom.cloneNode(this.cachedFragment, true);
            }
          } else {
            fragment = this.build(dom);
          }
          var morph0 = dom.createMorphAt(fragment,1,1,contextualElement);
          block(env, morph0, context, "link-to", ["index"], {}, child0, null);
          return fragment;
        }
      };
    }());
    var child1 = (function() {
      var child0 = (function() {
        return {
          isHTMLBars: true,
          revision: "Ember@1.11.1",
          blockParams: 0,
          cachedFragment: null,
          hasRendered: false,
          build: function build(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("Examples");
            dom.appendChild(el0, el1);
            return el0;
          },
          render: function render(context, env, contextualElement) {
            var dom = env.dom;
            dom.detectNamespace(contextualElement);
            var fragment;
            if (env.useFragmentCache && dom.canClone) {
              if (this.cachedFragment === null) {
                fragment = this.build(dom);
                if (this.hasRendered) {
                  this.cachedFragment = fragment;
                } else {
                  this.hasRendered = true;
                }
              }
              if (this.cachedFragment) {
                fragment = dom.cloneNode(this.cachedFragment, true);
              }
            } else {
              fragment = this.build(dom);
            }
            return fragment;
          }
        };
      }());
      return {
        isHTMLBars: true,
        revision: "Ember@1.11.1",
        blockParams: 0,
        cachedFragment: null,
        hasRendered: false,
        build: function build(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("          ");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        render: function render(context, env, contextualElement) {
          var dom = env.dom;
          var hooks = env.hooks, block = hooks.block;
          dom.detectNamespace(contextualElement);
          var fragment;
          if (env.useFragmentCache && dom.canClone) {
            if (this.cachedFragment === null) {
              fragment = this.build(dom);
              if (this.hasRendered) {
                this.cachedFragment = fragment;
              } else {
                this.hasRendered = true;
              }
            }
            if (this.cachedFragment) {
              fragment = dom.cloneNode(this.cachedFragment, true);
            }
          } else {
            fragment = this.build(dom);
          }
          var morph0 = dom.createMorphAt(fragment,1,1,contextualElement);
          block(env, morph0, context, "link-to", ["examples"], {}, child0, null);
          return fragment;
        }
      };
    }());
    var child2 = (function() {
      var child0 = (function() {
        return {
          isHTMLBars: true,
          revision: "Ember@1.11.1",
          blockParams: 0,
          cachedFragment: null,
          hasRendered: false,
          build: function build(dom) {
            var el0 = dom.createDocumentFragment();
            var el1 = dom.createTextNode("Docs");
            dom.appendChild(el0, el1);
            return el0;
          },
          render: function render(context, env, contextualElement) {
            var dom = env.dom;
            dom.detectNamespace(contextualElement);
            var fragment;
            if (env.useFragmentCache && dom.canClone) {
              if (this.cachedFragment === null) {
                fragment = this.build(dom);
                if (this.hasRendered) {
                  this.cachedFragment = fragment;
                } else {
                  this.hasRendered = true;
                }
              }
              if (this.cachedFragment) {
                fragment = dom.cloneNode(this.cachedFragment, true);
              }
            } else {
              fragment = this.build(dom);
            }
            return fragment;
          }
        };
      }());
      return {
        isHTMLBars: true,
        revision: "Ember@1.11.1",
        blockParams: 0,
        cachedFragment: null,
        hasRendered: false,
        build: function build(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("          ");
          dom.appendChild(el0, el1);
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        render: function render(context, env, contextualElement) {
          var dom = env.dom;
          var hooks = env.hooks, block = hooks.block;
          dom.detectNamespace(contextualElement);
          var fragment;
          if (env.useFragmentCache && dom.canClone) {
            if (this.cachedFragment === null) {
              fragment = this.build(dom);
              if (this.hasRendered) {
                this.cachedFragment = fragment;
              } else {
                this.hasRendered = true;
              }
            }
            if (this.cachedFragment) {
              fragment = dom.cloneNode(this.cachedFragment, true);
            }
          } else {
            fragment = this.build(dom);
          }
          var morph0 = dom.createMorphAt(fragment,1,1,contextualElement);
          block(env, morph0, context, "link-to", ["docs"], {}, child0, null);
          return fragment;
        }
      };
    }());
    return {
      isHTMLBars: true,
      revision: "Ember@1.11.1",
      blockParams: 0,
      cachedFragment: null,
      hasRendered: false,
      build: function build(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1,"class","navbar navbar-default navbar-fixed-top");
        dom.setAttribute(el1,"role","navigation");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","container");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3,"class","navbar-header");
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("button");
        dom.setAttribute(el4,"type","button");
        dom.setAttribute(el4,"class","navbar-toggle");
        dom.setAttribute(el4,"data-toggle","collapse");
        dom.setAttribute(el4,"data-target",".navbar-collapse");
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("span");
        dom.setAttribute(el5,"class","sr-only");
        var el6 = dom.createTextNode("Toggle navigation");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("span");
        dom.setAttribute(el5,"class","icon-bar");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("span");
        dom.setAttribute(el5,"class","icon-bar");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("span");
        dom.setAttribute(el5,"class","icon-bar");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n      ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("a");
        dom.setAttribute(el4,"class","navbar-brand");
        dom.setAttribute(el4,"href","#");
        var el5 = dom.createTextNode("ember-select-2 ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("span");
        dom.setAttribute(el5,"class","version-number");
        var el6 = dom.createComment("");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3,"class","navbar-collapse collapse");
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("ul");
        dom.setAttribute(el4,"class","nav navbar-nav");
        var el5 = dom.createTextNode("\n");
        dom.appendChild(el4, el5);
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("      ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("ul");
        dom.setAttribute(el4,"class","nav navbar-nav navbar-right");
        var el5 = dom.createTextNode("\n        ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("li");
        var el6 = dom.createElement("a");
        dom.setAttribute(el6,"href","https://github.com/istefo/ember-select-2");
        var el7 = dom.createTextNode("Fork on Github.com");
        dom.appendChild(el6, el7);
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("\n      ");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("/.nav-collapse ");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1,"class","container");
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        return el0;
      },
      render: function render(context, env, contextualElement) {
        var dom = env.dom;
        var hooks = env.hooks, content = hooks.content, block = hooks.block;
        dom.detectNamespace(contextualElement);
        var fragment;
        if (env.useFragmentCache && dom.canClone) {
          if (this.cachedFragment === null) {
            fragment = this.build(dom);
            if (this.hasRendered) {
              this.cachedFragment = fragment;
            } else {
              this.hasRendered = true;
            }
          }
          if (this.cachedFragment) {
            fragment = dom.cloneNode(this.cachedFragment, true);
          }
        } else {
          fragment = this.build(dom);
        }
        var element0 = dom.childAt(fragment, [0, 1]);
        var element1 = dom.childAt(element0, [3, 1]);
        var morph0 = dom.createMorphAt(dom.childAt(element0, [1, 3, 1]),0,0);
        var morph1 = dom.createMorphAt(element1,1,1);
        var morph2 = dom.createMorphAt(element1,2,2);
        var morph3 = dom.createMorphAt(element1,3,3);
        var morph4 = dom.createMorphAt(dom.childAt(fragment, [2]),1,1);
        content(env, morph0, context, "version");
        block(env, morph1, context, "link-li", [], {}, child0, null);
        block(env, morph2, context, "link-li", [], {}, child1, null);
        block(env, morph3, context, "link-li", [], {}, child2, null);
        content(env, morph4, context, "outlet");
        return fragment;
      }
    };
  }()));

});
define('dummy/templates/components/highlight-code', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    return {
      isHTMLBars: true,
      revision: "Ember@1.11.1",
      blockParams: 0,
      cachedFragment: null,
      hasRendered: false,
      build: function build(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("code");
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        return el0;
      },
      render: function render(context, env, contextualElement) {
        var dom = env.dom;
        var hooks = env.hooks, get = hooks.get, element = hooks.element, content = hooks.content;
        dom.detectNamespace(contextualElement);
        var fragment;
        if (env.useFragmentCache && dom.canClone) {
          if (this.cachedFragment === null) {
            fragment = this.build(dom);
            if (this.hasRendered) {
              this.cachedFragment = fragment;
            } else {
              this.hasRendered = true;
            }
          }
          if (this.cachedFragment) {
            fragment = dom.cloneNode(this.cachedFragment, true);
          }
        } else {
          fragment = this.build(dom);
        }
        var element0 = dom.childAt(fragment, [0]);
        var morph0 = dom.createMorphAt(element0,0,0);
        element(env, element0, context, "bind-attr", [], {"class": get(env, context, "languageClass")});
        content(env, morph0, context, "yield");
        return fragment;
      }
    };
  }()));

});
define('dummy/templates/docs', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    var child0 = (function() {
      return {
        isHTMLBars: true,
        revision: "Ember@1.11.1",
        blockParams: 0,
        cachedFragment: null,
        hasRendered: false,
        build: function build(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("var app = new EmberAddon({\n  select2: {\n    includeAssets: false\n  }\n});");
          dom.appendChild(el0, el1);
          return el0;
        },
        render: function render(context, env, contextualElement) {
          var dom = env.dom;
          dom.detectNamespace(contextualElement);
          var fragment;
          if (env.useFragmentCache && dom.canClone) {
            if (this.cachedFragment === null) {
              fragment = this.build(dom);
              if (this.hasRendered) {
                this.cachedFragment = fragment;
              } else {
                this.hasRendered = true;
              }
            }
            if (this.cachedFragment) {
              fragment = dom.cloneNode(this.cachedFragment, true);
            }
          } else {
            fragment = this.build(dom);
          }
          return fragment;
        }
      };
    }());
    return {
      isHTMLBars: true,
      revision: "Ember@1.11.1",
      blockParams: 0,
      cachedFragment: null,
      hasRendered: false,
      build: function build(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("h4");
        var el2 = dom.createTextNode("Terminology");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("To avoid confusion when reading the documentation, there is a short overview\nof the term used.");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("dl");
        dom.setAttribute(el1,"class","dl-horizontal");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("dt");
        var el3 = dom.createTextNode("Content");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("dd");
        var el3 = dom.createTextNode("Array of elements that have to be supplied and will be displayed in the dropdown list");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("dt");
        var el3 = dom.createTextNode("Selection");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("dd");
        var el3 = dom.createTextNode("Subset of Content containing the elements that were selected by the user");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("h3");
        var el2 = dom.createTextNode("Content");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("h4");
        var el2 = dom.createTextNode("Flat Content");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("The component's ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("code");
        var el3 = dom.createTextNode("content");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(" property has to be set or bound to an Array (or subclass of Ember.Enumerable).");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("Its elements are expected to have a specific set of properties each:");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("dl");
        dom.setAttribute(el1,"class","dl-horizontal");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("dt");
        var el3 = dom.createTextNode("id");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("dd");
        var el3 = dom.createTextNode("Mixed");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("br");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("Used to internally identify an object and should be unique when coerced to a String");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("dt");
        var el3 = dom.createTextNode("text");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("dd");
        var el3 = dom.createTextNode("String | SafeString");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("br");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("Can be a computed property. Text to be displayed in the dropdown menu. Escapes html entities by default except when already a Handlebars.SafeString.");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("dt");
        var el3 = dom.createTextNode("description");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("dd");
        var el3 = dom.createTextNode("String | SafeString");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("br");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("Can be a computed property. Additional text to be displayed in the dropdown menu, visually less important. Will be omitted in the non-expanded view. Escapes html entities by default except when already a Handlebars.SafeString.");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("dt");
        var el3 = dom.createTextNode("locked");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("dd");
        var el3 = dom.createTextNode("Boolean");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("br");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("Can be set to indicate that this item can not be removed from the selection once selected. ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("b");
        var el4 = dom.createTextNode("Note:");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode(" make sure to add the object to the ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("code");
        var el4 = dom.createTextNode("value");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode(" when setting this to true.");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("Additionally, content objects may contain any other properties, functions etc., they will be preserved in full object binding mode.");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("h4");
        var el2 = dom.createTextNode("Nested Content");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("Simulating the ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("code");
        var el3 = dom.createTextNode("select > optgroup");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(" behaviour, it is possible to supply a nested datasource containing category headers.");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("For first level items in ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("code");
        var el3 = dom.createTextNode("content");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(":");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("dl");
        dom.setAttribute(el1,"class","dl-horizontal");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("dt");
        var el3 = dom.createTextNode("id");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("dd");
        var el3 = dom.createTextNode("Not necessary, header elements cannot be selected");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("dt");
        var el3 = dom.createTextNode("children");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("dd");
        var el3 = dom.createTextNode("Array");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("br");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("Containing elements that conform to the ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("i");
        var el4 = dom.createTextNode("Flat Content");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode(" specification");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("dt");
        var el3 = dom.createTextNode("description");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("dd");
        var el3 = dom.createTextNode("Not displayed, instead, the text will be printed in bold.");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("h3");
        var el2 = dom.createTextNode("Selection");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("Selecting an option from the dropdown will update the component's ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("code");
        var el3 = dom.createTextNode("value");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(" binding.");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("h4");
        var el2 = dom.createTextNode("Full Object Binding");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("Full Object Binding is the default way of binding the component's selection and will be used, when ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("code");
        var el3 = dom.createTextNode("optionValuePath");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(" is not set. It ensures strict equality between the object selected and the object from the provided content.");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("Also, setting the external end of the binding will update the displayed selection of the component.");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("h4");
        var el2 = dom.createTextNode("Value Binding");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("There are situations where it's more convenient to only bind one property of the whole content objects. This can be accieved by setting the ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("code");
        var el3 = dom.createTextNode("optionValuePath");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(", this path will then be used to ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("code");
        var el3 = dom.createTextNode("Ember.get()");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(" the desired value which then is the selected value.");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("This path will also be used to collect the complete objects when syncing the component with the external value, so it better be unique.");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("In value binding mode, there is a special feature important when lazy-loading data:");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("br");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("Imagine there is already a selection ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("code");
        var el3 = dom.createTextNode("value");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(", but the ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("code");
        var el3 = dom.createTextNode("content");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(" array does not yet contain all selected elements. As long as the selection can not be fullfilled, user interaction on the component is disabled in order to prevent the user from accidentally destroying the selection.");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("\n  For multiple selection mode with ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("code");
        var el3 = dom.createTextNode("optionValuePath");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(" set, the value string is by default split at commas.\n  If you want to change this, you can set the ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("code");
        var el3 = dom.createTextNode("valueSeparator");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(" to any character that does not appear within your item ids. Value string splitting will only be done in the configuration stated above.\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("h3");
        var el2 = dom.createTextNode("Styling");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("select-2 does not interfere with the default styling of the Select2 Component and depends on the original stylesheet. It adds support for ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("a");
        dom.setAttribute(el2,"href","http://fk.github.io/select2-bootstrap-css/master.html");
        var el3 = dom.createTextNode("Twitter Bootstrap styling");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(" by adding the class ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("code");
        var el3 = dom.createTextNode(".form-control");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(" when the corresponding stylesheets are loaded.");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("It is possible to exclude the select2 assets from ember-cli by setting the ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("code");
        var el3 = dom.createTextNode("includeAssets");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(" option to ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("code");
        var el3 = dom.createTextNode("false");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(" in your ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("code");
        var el3 = dom.createTextNode("Brocfile.js");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(". This will skip loading select2.css, select2.png, select2x2.png and select2-spinner.gif.");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      render: function render(context, env, contextualElement) {
        var dom = env.dom;
        var hooks = env.hooks, block = hooks.block;
        dom.detectNamespace(contextualElement);
        var fragment;
        if (env.useFragmentCache && dom.canClone) {
          if (this.cachedFragment === null) {
            fragment = this.build(dom);
            if (this.hasRendered) {
              this.cachedFragment = fragment;
            } else {
              this.hasRendered = true;
            }
          }
          if (this.cachedFragment) {
            fragment = dom.cloneNode(this.cachedFragment, true);
          }
        } else {
          fragment = this.build(dom);
        }
        var morph0 = dom.createMorphAt(fragment,48,48,contextualElement);
        block(env, morph0, context, "highlight-code", [], {"lang": ".js"}, child0, null);
        return fragment;
      }
    };
  }()));

});
define('dummy/templates/examples', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    var child0 = (function() {
      return {
        isHTMLBars: true,
        revision: "Ember@1.11.1",
        blockParams: 0,
        cachedFragment: null,
        hasRendered: false,
        build: function build(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("{{select-2\n    content=pizzas\n    value=favouritePizza\n    placeholder=\"Choose your pizza\"\n    allowClear=true\n}}");
          dom.appendChild(el0, el1);
          return el0;
        },
        render: function render(context, env, contextualElement) {
          var dom = env.dom;
          dom.detectNamespace(contextualElement);
          var fragment;
          if (env.useFragmentCache && dom.canClone) {
            if (this.cachedFragment === null) {
              fragment = this.build(dom);
              if (this.hasRendered) {
                this.cachedFragment = fragment;
              } else {
                this.hasRendered = true;
              }
            }
            if (this.cachedFragment) {
              fragment = dom.cloneNode(this.cachedFragment, true);
            }
          } else {
            fragment = this.build(dom);
          }
          return fragment;
        }
      };
    }());
    var child1 = (function() {
      return {
        isHTMLBars: true,
        revision: "Ember@1.11.1",
        blockParams: 0,
        cachedFragment: null,
        hasRendered: false,
        build: function build(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("{{select-2\n    content=pizzas\n    value=favouritePizza\n    optionValuePath=\"id\"\n    placeholder=\"Choose your Pizza\"\n}}");
          dom.appendChild(el0, el1);
          return el0;
        },
        render: function render(context, env, contextualElement) {
          var dom = env.dom;
          dom.detectNamespace(contextualElement);
          var fragment;
          if (env.useFragmentCache && dom.canClone) {
            if (this.cachedFragment === null) {
              fragment = this.build(dom);
              if (this.hasRendered) {
                this.cachedFragment = fragment;
              } else {
                this.hasRendered = true;
              }
            }
            if (this.cachedFragment) {
              fragment = dom.cloneNode(this.cachedFragment, true);
            }
          } else {
            fragment = this.build(dom);
          }
          return fragment;
        }
      };
    }());
    var child2 = (function() {
      return {
        isHTMLBars: true,
        revision: "Ember@1.11.1",
        blockParams: 0,
        cachedFragment: null,
        hasRendered: false,
        build: function build(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("{{select-2\n    content=pizzas\n    value=favouritePizza\n    multiple=true\n    placeholder=\"Choose some Pizzas\"\n}}");
          dom.appendChild(el0, el1);
          return el0;
        },
        render: function render(context, env, contextualElement) {
          var dom = env.dom;
          dom.detectNamespace(contextualElement);
          var fragment;
          if (env.useFragmentCache && dom.canClone) {
            if (this.cachedFragment === null) {
              fragment = this.build(dom);
              if (this.hasRendered) {
                this.cachedFragment = fragment;
              } else {
                this.hasRendered = true;
              }
            }
            if (this.cachedFragment) {
              fragment = dom.cloneNode(this.cachedFragment, true);
            }
          } else {
            fragment = this.build(dom);
          }
          return fragment;
        }
      };
    }());
    var child3 = (function() {
      return {
        isHTMLBars: true,
        revision: "Ember@1.11.1",
        blockParams: 0,
        cachedFragment: null,
        hasRendered: false,
        build: function build(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("{{select-2\n    content=pizzas\n    value=favouritePizza\n    multiple=true\n    optionValuePath=\"id\"\n    placeholder=\"Choose some Pizzas\"\n}}");
          dom.appendChild(el0, el1);
          return el0;
        },
        render: function render(context, env, contextualElement) {
          var dom = env.dom;
          dom.detectNamespace(contextualElement);
          var fragment;
          if (env.useFragmentCache && dom.canClone) {
            if (this.cachedFragment === null) {
              fragment = this.build(dom);
              if (this.hasRendered) {
                this.cachedFragment = fragment;
              } else {
                this.hasRendered = true;
              }
            }
            if (this.cachedFragment) {
              fragment = dom.cloneNode(this.cachedFragment, true);
            }
          } else {
            fragment = this.build(dom);
          }
          return fragment;
        }
      };
    }());
    var child4 = (function() {
      return {
        isHTMLBars: true,
        revision: "Ember@1.11.1",
        blockParams: 1,
        cachedFragment: null,
        hasRendered: false,
        build: function build(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createElement("a");
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode(" ");
          dom.appendChild(el0, el1);
          return el0;
        },
        render: function render(context, env, contextualElement, blockArguments) {
          var dom = env.dom;
          var hooks = env.hooks, set = hooks.set, get = hooks.get, element = hooks.element, content = hooks.content;
          dom.detectNamespace(contextualElement);
          var fragment;
          if (env.useFragmentCache && dom.canClone) {
            if (this.cachedFragment === null) {
              fragment = this.build(dom);
              if (this.hasRendered) {
                this.cachedFragment = fragment;
              } else {
                this.hasRendered = true;
              }
            }
            if (this.cachedFragment) {
              fragment = dom.cloneNode(this.cachedFragment, true);
            }
          } else {
            fragment = this.build(dom);
          }
          var element0 = dom.childAt(fragment, [0]);
          var morph0 = dom.createMorphAt(element0,0,0);
          set(env, context, "pizza", blockArguments[0]);
          element(env, element0, context, "action", ["selectPizza", get(env, context, "pizza")], {});
          content(env, morph0, context, "pizza.text");
          return fragment;
        }
      };
    }());
    var child5 = (function() {
      return {
        isHTMLBars: true,
        revision: "Ember@1.11.1",
        blockParams: 1,
        cachedFragment: null,
        hasRendered: false,
        build: function build(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createComment("");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode(" ");
          dom.appendChild(el0, el1);
          return el0;
        },
        render: function render(context, env, contextualElement, blockArguments) {
          var dom = env.dom;
          var hooks = env.hooks, set = hooks.set, content = hooks.content;
          dom.detectNamespace(contextualElement);
          var fragment;
          if (env.useFragmentCache && dom.canClone) {
            if (this.cachedFragment === null) {
              fragment = this.build(dom);
              if (this.hasRendered) {
                this.cachedFragment = fragment;
              } else {
                this.hasRendered = true;
              }
            }
            if (this.cachedFragment) {
              fragment = dom.cloneNode(this.cachedFragment, true);
            }
          } else {
            fragment = this.build(dom);
          }
          var morph0 = dom.createMorphAt(fragment,0,0,contextualElement);
          dom.insertBoundary(fragment, 0);
          set(env, context, "pizza", blockArguments[0]);
          content(env, morph0, context, "pizza.id");
          return fragment;
        }
      };
    }());
    var child6 = (function() {
      return {
        isHTMLBars: true,
        revision: "Ember@1.11.1",
        blockParams: 0,
        cachedFragment: null,
        hasRendered: false,
        build: function build(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("{{select-2\n    content=pizzas\n    optionLabelPath=\"id\"\n    optionDescriptionPath=\"text\"\n    placeholder=\"Choose some Pizzas\"\n}}");
          dom.appendChild(el0, el1);
          return el0;
        },
        render: function render(context, env, contextualElement) {
          var dom = env.dom;
          dom.detectNamespace(contextualElement);
          var fragment;
          if (env.useFragmentCache && dom.canClone) {
            if (this.cachedFragment === null) {
              fragment = this.build(dom);
              if (this.hasRendered) {
                this.cachedFragment = fragment;
              } else {
                this.hasRendered = true;
              }
            }
            if (this.cachedFragment) {
              fragment = dom.cloneNode(this.cachedFragment, true);
            }
          } else {
            fragment = this.build(dom);
          }
          return fragment;
        }
      };
    }());
    var child7 = (function() {
      return {
        isHTMLBars: true,
        revision: "Ember@1.11.1",
        blockParams: 0,
        cachedFragment: null,
        hasRendered: false,
        build: function build(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("{{select-2\n    content=pizzas\n    placeholder=\"Choose some Pizzas\"\n    cssClass=\"custom-class\"\n}}");
          dom.appendChild(el0, el1);
          return el0;
        },
        render: function render(context, env, contextualElement) {
          var dom = env.dom;
          dom.detectNamespace(contextualElement);
          var fragment;
          if (env.useFragmentCache && dom.canClone) {
            if (this.cachedFragment === null) {
              fragment = this.build(dom);
              if (this.hasRendered) {
                this.cachedFragment = fragment;
              } else {
                this.hasRendered = true;
              }
            }
            if (this.cachedFragment) {
              fragment = dom.cloneNode(this.cachedFragment, true);
            }
          } else {
            fragment = this.build(dom);
          }
          return fragment;
        }
      };
    }());
    var child8 = (function() {
      return {
        isHTMLBars: true,
        revision: "Ember@1.11.1",
        blockParams: 0,
        cachedFragment: null,
        hasRendered: false,
        build: function build(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("{{select-2\n    placeholder=\"Choose from our many pizzas\"\n    value=chosenTypeaheadPizza\n    typeaheadSearchingText=\"Searching pizzas\"\n    typeaheadNoMatchesText=\"No pizzas found for '%@'\"\n    typeaheadErrorText=\"Loading failed: %@\"\n    minimumInputLength=3\n    maximumInputLength=10\n    query=\"queryPizzas\"\n}}");
          dom.appendChild(el0, el1);
          return el0;
        },
        render: function render(context, env, contextualElement) {
          var dom = env.dom;
          dom.detectNamespace(contextualElement);
          var fragment;
          if (env.useFragmentCache && dom.canClone) {
            if (this.cachedFragment === null) {
              fragment = this.build(dom);
              if (this.hasRendered) {
                this.cachedFragment = fragment;
              } else {
                this.hasRendered = true;
              }
            }
            if (this.cachedFragment) {
              fragment = dom.cloneNode(this.cachedFragment, true);
            }
          } else {
            fragment = this.build(dom);
          }
          return fragment;
        }
      };
    }());
    var child9 = (function() {
      return {
        isHTMLBars: true,
        revision: "Ember@1.11.1",
        blockParams: 0,
        cachedFragment: null,
        hasRendered: false,
        build: function build(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("Ember.Controller.extend({\n  actions: {\n    queryPizzas: function(query, deferred) {\n      this.store.find('myModel', { name: query.term })\n        .then(deferred.resolve, deferred.reject);\n    }\n  }\n});");
          dom.appendChild(el0, el1);
          return el0;
        },
        render: function render(context, env, contextualElement) {
          var dom = env.dom;
          dom.detectNamespace(contextualElement);
          var fragment;
          if (env.useFragmentCache && dom.canClone) {
            if (this.cachedFragment === null) {
              fragment = this.build(dom);
              if (this.hasRendered) {
                this.cachedFragment = fragment;
              } else {
                this.hasRendered = true;
              }
            }
            if (this.cachedFragment) {
              fragment = dom.cloneNode(this.cachedFragment, true);
            }
          } else {
            fragment = this.build(dom);
          }
          return fragment;
        }
      };
    }());
    var child10 = (function() {
      return {
        isHTMLBars: true,
        revision: "Ember@1.11.1",
        blockParams: 0,
        cachedFragment: null,
        hasRendered: false,
        build: function build(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("{{select-2\n    placeholder=\"Choose from our many pizzas\"\n    value=chosenTypeaheadPizza\n    typeaheadSearchingText=\"Searching pizzas\"\n    typeaheadNoMatchesText=\"No pizzas found for '%@'\"\n    typeaheadErrorText=\"Loading failed: %@\"\n    minimumInputLength=3\n    maximumInputLength=10\n    query=\"queryPizzas\"\n}}");
          dom.appendChild(el0, el1);
          return el0;
        },
        render: function render(context, env, contextualElement) {
          var dom = env.dom;
          dom.detectNamespace(contextualElement);
          var fragment;
          if (env.useFragmentCache && dom.canClone) {
            if (this.cachedFragment === null) {
              fragment = this.build(dom);
              if (this.hasRendered) {
                this.cachedFragment = fragment;
              } else {
                this.hasRendered = true;
              }
            }
            if (this.cachedFragment) {
              fragment = dom.cloneNode(this.cachedFragment, true);
            }
          } else {
            fragment = this.build(dom);
          }
          return fragment;
        }
      };
    }());
    var child11 = (function() {
      return {
        isHTMLBars: true,
        revision: "Ember@1.11.1",
        blockParams: 0,
        cachedFragment: null,
        hasRendered: false,
        build: function build(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("Ember.Controller.extend({\n  actions: {\n    queryPizzas: function(query, deferred) {\n      this.store.find('myModel', { name: query.term })\n        .then(function(data) {\n          //'when everything has been loaded, specify more: false'\n          deferred.resolve({data: data, more: true});\n        }, deferred.reject);\n    }\n  }\n});");
          dom.appendChild(el0, el1);
          return el0;
        },
        render: function render(context, env, contextualElement) {
          var dom = env.dom;
          dom.detectNamespace(contextualElement);
          var fragment;
          if (env.useFragmentCache && dom.canClone) {
            if (this.cachedFragment === null) {
              fragment = this.build(dom);
              if (this.hasRendered) {
                this.cachedFragment = fragment;
              } else {
                this.hasRendered = true;
              }
            }
            if (this.cachedFragment) {
              fragment = dom.cloneNode(this.cachedFragment, true);
            }
          } else {
            fragment = this.build(dom);
          }
          return fragment;
        }
      };
    }());
    var child12 = (function() {
      return {
        isHTMLBars: true,
        revision: "Ember@1.11.1",
        blockParams: 0,
        cachedFragment: null,
        hasRendered: false,
        build: function build(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("[\n  {\n    text: \"Vegetables\",\n    children: [\n      {\n        id: \"tom\",\n        text: \"Tomatoes\"\n      }, {\n        id: \"pin\",\n        text: \"Pineapples\"\n      }\n    ]\n  }, { ... }\n]");
          dom.appendChild(el0, el1);
          return el0;
        },
        render: function render(context, env, contextualElement) {
          var dom = env.dom;
          dom.detectNamespace(contextualElement);
          var fragment;
          if (env.useFragmentCache && dom.canClone) {
            if (this.cachedFragment === null) {
              fragment = this.build(dom);
              if (this.hasRendered) {
                this.cachedFragment = fragment;
              } else {
                this.hasRendered = true;
              }
            }
            if (this.cachedFragment) {
              fragment = dom.cloneNode(this.cachedFragment, true);
            }
          } else {
            fragment = this.build(dom);
          }
          return fragment;
        }
      };
    }());
    var child13 = (function() {
      return {
        isHTMLBars: true,
        revision: "Ember@1.11.1",
        blockParams: 0,
        cachedFragment: null,
        hasRendered: false,
        build: function build(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("[\n    {\n       id: \"1\",\n       text: \"Margherita\",\n       description: \"The original italian one\"\n     }, {\n       id: \"2\",\n       text: \"Cheese\",\n       disabled: true,\n       description: \"Can you say Laaame?\"\n     }\n  ]");
          dom.appendChild(el0, el1);
          return el0;
        },
        render: function render(context, env, contextualElement) {
          var dom = env.dom;
          dom.detectNamespace(contextualElement);
          var fragment;
          if (env.useFragmentCache && dom.canClone) {
            if (this.cachedFragment === null) {
              fragment = this.build(dom);
              if (this.hasRendered) {
                this.cachedFragment = fragment;
              } else {
                this.hasRendered = true;
              }
            }
            if (this.cachedFragment) {
              fragment = dom.cloneNode(this.cachedFragment, true);
            }
          } else {
            fragment = this.build(dom);
          }
          return fragment;
        }
      };
    }());
    var child14 = (function() {
      return {
        isHTMLBars: true,
        revision: "Ember@1.11.1",
        blockParams: 0,
        cachedFragment: null,
        hasRendered: false,
        build: function build(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("{{select-2\n    content=pizzas\n    enabled=enabled\n    placeholder=\"Choose some Pizzas\"\n}}");
          dom.appendChild(el0, el1);
          return el0;
        },
        render: function render(context, env, contextualElement) {
          var dom = env.dom;
          dom.detectNamespace(contextualElement);
          var fragment;
          if (env.useFragmentCache && dom.canClone) {
            if (this.cachedFragment === null) {
              fragment = this.build(dom);
              if (this.hasRendered) {
                this.cachedFragment = fragment;
              } else {
                this.hasRendered = true;
              }
            }
            if (this.cachedFragment) {
              fragment = dom.cloneNode(this.cachedFragment, true);
            }
          } else {
            fragment = this.build(dom);
          }
          return fragment;
        }
      };
    }());
    var child15 = (function() {
      return {
        isHTMLBars: true,
        revision: "Ember@1.11.1",
        blockParams: 0,
        cachedFragment: null,
        hasRendered: false,
        build: function build(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("{{select-2\n    content=pizzas\n    searchEnabled=false\n    placeholder=\"Choose some Pizzas\"\n}}");
          dom.appendChild(el0, el1);
          return el0;
        },
        render: function render(context, env, contextualElement) {
          var dom = env.dom;
          dom.detectNamespace(contextualElement);
          var fragment;
          if (env.useFragmentCache && dom.canClone) {
            if (this.cachedFragment === null) {
              fragment = this.build(dom);
              if (this.hasRendered) {
                this.cachedFragment = fragment;
              } else {
                this.hasRendered = true;
              }
            }
            if (this.cachedFragment) {
              fragment = dom.cloneNode(this.cachedFragment, true);
            }
          } else {
            fragment = this.build(dom);
          }
          return fragment;
        }
      };
    }());
    return {
      isHTMLBars: true,
      revision: "Ember@1.11.1",
      blockParams: 0,
      cachedFragment: null,
      hasRendered: false,
      build: function build(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("h3");
        var el2 = dom.createTextNode("Single-Selection Dropdown");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("This mode works mostly like the default ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("code");
        var el3 = dom.createTextNode("{{select}}");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(" component which comes with ember.js right away. However, notice the nice styling and search field making it easy to find the right option.");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1,"class","row");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","col-sm-6");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("h4");
        var el4 = dom.createTextNode("Selection with Full Object Binding");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("p");
        var el4 = dom.createTextNode("You may choose your favourite pizza now! It will be remembered as ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("code");
        var el5 = dom.createTextNode("favouritePizza");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode(" on the controller.");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3,"class","example-box");
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("p");
        var el5 = dom.createTextNode("Your Pizza:");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("br");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("b");
        var el6 = dom.createTextNode("Id");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode(": ");
        dom.appendChild(el4, el5);
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("br");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("b");
        var el6 = dom.createTextNode("Name");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode(": ");
        dom.appendChild(el4, el5);
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("br");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("b");
        var el6 = dom.createTextNode("Description");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode(": ");
        dom.appendChild(el4, el5);
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("p");
        var el4 = dom.createTextNode("Full Object Binding ensures strict equality between the selected object and the object from the ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("code");
        var el5 = dom.createTextNode("content");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode(" array.");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("p");
        var el4 = dom.createTextNode("You can specify the ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("code");
        var el5 = dom.createTextNode("placeholder");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode(" option to display a placeholder.  By specifying the ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("code");
        var el5 = dom.createTextNode("allowClear");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n    option, you determine whether or not a clear button is displayed when the select box has a selection.");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","col-sm-6");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("h4");
        var el4 = dom.createTextNode("Selection with Value Binding");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("p");
        var el4 = dom.createTextNode("Again, choose your pizza. This time though, only the ID will be set to the value binding.");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3,"class","example-box");
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("p");
        var el5 = dom.createTextNode("Your Pizza Id: ");
        dom.appendChild(el4, el5);
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("p");
        var el4 = dom.createTextNode("Using the ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("code");
        var el5 = dom.createTextNode("optionValuePath");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode(" option, you can set the select-2 component into \"value mode\".");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("p");
        var el4 = dom.createTextNode("You can specify any path that can be resolved for the input object (");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("code");
        var el5 = dom.createTextNode("\"id\"");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode(" is just a simple example) and its data type will be preserved.");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("hr");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("h3");
        var el2 = dom.createTextNode("Multiple-Selection Dropdown");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("Multiple Selections behave like tag inputs and provide a high level of comfort for selecting elements.");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1,"class","row");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","col-sm-6");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("h4");
        var el4 = dom.createTextNode("Multiple Selection w/ Full Object Binding");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("p");
        var el4 = dom.createTextNode("In case you are really hungry or order pizza for you and your friends (yeah, sure...), you can choose multiple objects which will be stored in the ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("code");
        var el5 = dom.createTextNode("favouritePizzas");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode(" Array.");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3,"class","example-box");
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("p");
        var el5 = dom.createTextNode("Your Pizzas are: ");
        dom.appendChild(el4, el5);
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("p");
        var el4 = dom.createTextNode("As you can see, the full objects are stored on the controller.");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","col-sm-6");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("h4");
        var el4 = dom.createTextNode("Multiple Selection w/ Value Binding");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("p");
        var el4 = dom.createTextNode("Maybe you only need the pizza Ids. Specify a path in ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("code");
        var el5 = dom.createTextNode("optionValuePath");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode(" and you're good to go.");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3,"class","example-box");
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("p");
        var el5 = dom.createTextNode("Your Pizza Ids: ");
        dom.appendChild(el4, el5);
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("hr");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("h3");
        var el2 = dom.createTextNode("Changing the Selection Value");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("Since Ember has nice two-way data bindings, you can of course change the selected element from outside the select-2 input and it will update accordingly. These examples work with single and multiple selection, but only single selection is shown here for siplicity.");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1,"class","row");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","col-sm-6");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("h4");
        var el4 = dom.createTextNode("Full Object Binding");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("p");
        var el4 = dom.createTextNode("Same example as above, but now you can manually set the selected Element from outside the input.");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3,"class","example-box example-box-full");
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("p");
        var el5 = dom.createTextNode("Set Selection to: ");
        dom.appendChild(el4, el5);
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","col-sm-6");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("h4");
        var el4 = dom.createTextNode("Value Binding");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("p");
        var el4 = dom.createTextNode("Naturally, this works as well for the Value Binding method. Try values like \"pep\", \"mar\" or \"haw\"!");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3,"class","example-box example-box-full");
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("br");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("p");
        var el4 = dom.createTextNode("You will notice, that the dropdown gets locked when the entered ID does not match any of the objects available. This is a feature intended to prevent the destruction of the currently selected value when the options are yet to be loaded. (See the next example)");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("hr");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("h3");
        var el2 = dom.createTextNode("Changing the Dropdown Content");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("The way Ember handles data is often asynchronous and the select-2 component can respond to changes in its ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("code");
        var el3 = dom.createTextNode("content");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(" Array.");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("The following example will simulate lazy-loaded objects that were preselected using the ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("code");
        var el3 = dom.createTextNode("value");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(" Binding but not available until the new data is loaded. Because the objects were selected but not available for display, the select-2 input is disabled so one can't change the selection without first knowing what data actually is selected!");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1,"class","row");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","col-sm-6");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("h4");
        var el4 = dom.createTextNode("Full Object Binding");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("p");
        var el4 = dom.createTextNode("Changing the dropdown's content simply works as expected.");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3,"class","example-box example-box-full");
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("p");
        var el5 = dom.createElement("button");
        dom.setAttribute(el5,"class","btn btn-default");
        var el6 = dom.createTextNode("Load more Pizzas");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","col-sm-6");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("h4");
        var el4 = dom.createTextNode("Value Binding");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("p");
        var el4 = dom.createTextNode("As you can see below, there is an Array of selected pizzas which contains keys that are not yet loaded into the main pizza Array. As soon as you load more pizzas, the input will become editable.");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3,"class","example-box example-box-full");
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("p");
        var el5 = dom.createTextNode("Available: ");
        dom.appendChild(el4, el5);
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("br");
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode("Selected: ");
        dom.appendChild(el4, el5);
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("p");
        var el5 = dom.createElement("button");
        dom.setAttribute(el5,"class","btn btn-default");
        var el6 = dom.createTextNode("Load even more Pizzas");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("hr");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("h3");
        var el2 = dom.createTextNode("Customizing");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1,"class","row");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","col-sm-6");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("h4");
        var el4 = dom.createTextNode("Change Label Value Path");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("p");
        var el4 = dom.createTextNode("While by default the items' ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("code");
        var el5 = dom.createTextNode("text");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode(" attribute is used for the text displayed, it can be customized by setting the components ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("code");
        var el5 = dom.createTextNode("optionLabelPath");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode(". Additionally, if you want to use a different label path for selected elements (visible when the dropdown is not expanded), you can set ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("code");
        var el5 = dom.createTextNode("optionLabelSelectedPath");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode(".");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("p");
        var el4 = dom.createTextNode("The ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("code");
        var el5 = dom.createTextNode("optionDescriptionPath");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode(" can be changed to something different from the default (");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("code");
        var el5 = dom.createTextNode("description");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("), and the ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("code");
        var el5 = dom.createTextNode("optionHeadlinePath");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode(" may be changed from ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("code");
        var el5 = dom.createTextNode("text");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode(" to a different path for displaying group headers.");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3,"class","example-box");
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","col-sm-6");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("h4");
        var el4 = dom.createTextNode("Add Custom CSS Class");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("p");
        var el4 = dom.createTextNode("When one select2 components needs special styles, set the ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("code");
        var el5 = dom.createTextNode("cssClass");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode(" binding to a string containing a single css class. It will be assigned to the ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("code");
        var el5 = dom.createTextNode(".select2-container");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode(", which is the input in closed state, as well as to the ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("code");
        var el5 = dom.createTextNode(".select2-drop");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode(", which is the dropdown menu.");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("p");
        var el4 = dom.createElement("b");
        var el5 = dom.createTextNode("Warning:");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode(" Don't get to fancy! These classes will not update when the binding updates, they have to be computable at the point of time the component is inserted.");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3,"class","example-box");
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("hr");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("h3");
        var el2 = dom.createTextNode("Typeahead & Ajax Queries");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("Imagine you sell so many pizzas that you don't want to send all of them to the client. Instead, there is a protocol that lets the nearest controller figure out which options to show for a given search term, asynchronously.");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("Typeahead is currently only possible for Full Object Binding, because when using an ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("code");
        var el3 = dom.createTextNode("optionValuePath");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(", there is no API to retrieve the full object from the controller.");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1,"class","row");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","col-sm-6");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("h4");
        var el4 = dom.createTextNode("The Component");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3,"class","example-box");
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("p");
        var el5 = dom.createTextNode("Specify the name of your controller's callback in the ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("code");
        var el6 = dom.createTextNode("query");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode(" option.");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("p");
        var el5 = dom.createTextNode("You can use single or multiple selection. Customizing the displayed messages (with placeholder for search term and error) as seen below is optional.");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("p");
        var el5 = dom.createTextNode("Type in \"empty\" to see the result for an empty query or \"error\" for a rejected query.");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","col-sm-6");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("h4");
        var el4 = dom.createTextNode("The Controller");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3,"class","example-box");
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("p");
        var el5 = dom.createTextNode("The action specified in the component will be called every time the query changes.");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("p");
        var el5 = dom.createTextNode("Make sure to not call ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("code");
        var el6 = dom.createTextNode("query.callback");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode(" directly but always use the provided deferred!");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("h3");
        var el2 = dom.createTextNode("Infinite Scroll with Typeahead & Ajax Queries");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("Imagine you sell so many pizzas that you don't want to send all of them to the client, and using Typeahead doesn't give you a large enough filter. You can implement infinite scroll using the ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("code");
        var el3 = dom.createTextNode("more");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(" property");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1,"class","row");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","col-sm-6");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("h4");
        var el4 = dom.createTextNode("The Component");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3,"class","example-box");
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("p");
        var el5 = dom.createTextNode("The component is exactly the same as the regular Typeahead and Ajax query from above");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","col-sm-6");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("h4");
        var el4 = dom.createTextNode("The Controller");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3,"class","example-box");
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("p");
        var el5 = dom.createTextNode("There are a few minor changes from the regular Typeahead and Ajax query from above.");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("p");
        var el5 = dom.createTextNode("Instead of sending in deferred.resolve as the callback, you need to implement your own callback and call deferred.resolve with the data that was returned and more property");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("p");
        var el5 = dom.createTextNode("Implement ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("code");
        var el6 = dom.createTextNode("more: true");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode(" when there is still more data to load, and ");
        dom.appendChild(el4, el5);
        var el5 = dom.createElement("code");
        var el6 = dom.createTextNode("more: false");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode(" when the server has responded with all the data and there is nothing to load.");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("h3");
        var el2 = dom.createTextNode("Miscellaneous");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1,"class","row");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","col-sm-6");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("h4");
        var el4 = dom.createTextNode("Hierarchical JSON");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("p");
        var el4 = dom.createTextNode("select-2 works out of the box when given hierarchical JSON as input. Notice the ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("code");
        var el5 = dom.createTextNode("children");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode(" attribute.");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3,"class","example-box");
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","col-sm-6");
        var el3 = dom.createTextNode("\n      ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("h4");
        var el4 = dom.createTextNode("Disabled Individual Options");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n      ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("p");
        var el4 = dom.createTextNode("Setting an attribute of ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("code");
        var el5 = dom.createTextNode("disabled");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode(" to ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("code");
        var el5 = dom.createTextNode("true");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode(" will disable the option from being selected");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n      ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3,"class","example-box");
        var el4 = dom.createTextNode("\n        ");
        dom.appendChild(el3, el4);
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n      ");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        dom.setAttribute(el1,"class","row");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","col-sm-6");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("h4");
        var el4 = dom.createTextNode("Enabling/Disabling");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("p");
        var el4 = dom.createTextNode("By binding the component's ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("code");
        var el5 = dom.createTextNode("enabled");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode(" value, supply a truthy value to enable or a falsy value to disable the input.");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3,"class","example-box");
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("p");
        var el5 = dom.createElement("button");
        dom.setAttribute(el5,"class","btn btn-default");
        var el6 = dom.createTextNode("Toggle enabled");
        dom.appendChild(el5, el6);
        dom.appendChild(el4, el5);
        var el5 = dom.createTextNode(" Enabled: ");
        dom.appendChild(el4, el5);
        var el5 = dom.createComment("");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n        ");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2,"class","col-sm-6");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("h4");
        var el4 = dom.createTextNode("Disabling the Search Field");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("p");
        var el4 = dom.createTextNode("For small option lists, you may want to disable the search to save screen estate and make the component easier to use on mobile devices. Set ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("code");
        var el5 = dom.createTextNode("searchEnabled");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode(" to ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("code");
        var el5 = dom.createTextNode("false");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode(" to disable search. ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("b");
        var el5 = dom.createTextNode("This works in single selection mode only!");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("p");
        var el4 = dom.createTextNode("You can, in fact, use any binding (e.g. the ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("code");
        var el5 = dom.createTextNode("Ember.computed.lt");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode(" computed property), but the value has to be computed on initial rendering.");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3,"class","example-box");
        var el4 = dom.createTextNode("\n      ");
        dom.appendChild(el3, el4);
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n    ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n        ");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      render: function render(context, env, contextualElement) {
        var dom = env.dom;
        var hooks = env.hooks, content = hooks.content, get = hooks.get, inline = hooks.inline, block = hooks.block, element = hooks.element;
        dom.detectNamespace(contextualElement);
        var fragment;
        if (env.useFragmentCache && dom.canClone) {
          if (this.cachedFragment === null) {
            fragment = this.build(dom);
            if (this.hasRendered) {
              this.cachedFragment = fragment;
            } else {
              this.hasRendered = true;
            }
          }
          if (this.cachedFragment) {
            fragment = dom.cloneNode(this.cachedFragment, true);
          }
        } else {
          fragment = this.build(dom);
        }
        var element1 = dom.childAt(fragment, [4]);
        var element2 = dom.childAt(element1, [1]);
        var element3 = dom.childAt(element2, [5]);
        var element4 = dom.childAt(element3, [1]);
        var element5 = dom.childAt(element1, [3]);
        var element6 = dom.childAt(element5, [5]);
        var element7 = dom.childAt(fragment, [12]);
        var element8 = dom.childAt(element7, [1]);
        var element9 = dom.childAt(element8, [5]);
        var element10 = dom.childAt(element7, [3]);
        var element11 = dom.childAt(element10, [5]);
        var element12 = dom.childAt(fragment, [20]);
        var element13 = dom.childAt(element12, [1, 5]);
        var element14 = dom.childAt(element12, [3, 5]);
        var element15 = dom.childAt(fragment, [30]);
        var element16 = dom.childAt(element15, [1, 5]);
        var element17 = dom.childAt(element16, [1, 0]);
        var element18 = dom.childAt(element15, [3, 5]);
        var element19 = dom.childAt(element18, [1]);
        var element20 = dom.childAt(element18, [3, 0]);
        var element21 = dom.childAt(fragment, [36]);
        var element22 = dom.childAt(element21, [1]);
        var element23 = dom.childAt(element21, [3]);
        var element24 = dom.childAt(fragment, [46]);
        var element25 = dom.childAt(element24, [1]);
        var element26 = dom.childAt(fragment, [52]);
        var element27 = dom.childAt(element26, [1]);
        var element28 = dom.childAt(fragment, [56]);
        var element29 = dom.childAt(element28, [1]);
        var element30 = dom.childAt(element28, [3]);
        var element31 = dom.childAt(fragment, [58]);
        var element32 = dom.childAt(element31, [1]);
        var element33 = dom.childAt(element32, [5]);
        var element34 = dom.childAt(element33, [1]);
        var element35 = dom.childAt(element34, [0]);
        var element36 = dom.childAt(element31, [3]);
        var morph0 = dom.createMorphAt(element4,4,4);
        var morph1 = dom.createMorphAt(element4,8,8);
        var morph2 = dom.createMorphAt(element4,12,12);
        var morph3 = dom.createMorphAt(element3,3,3);
        var morph4 = dom.createMorphAt(element2,7,7);
        var morph5 = dom.createMorphAt(dom.childAt(element6, [1]),1,1);
        var morph6 = dom.createMorphAt(element6,3,3);
        var morph7 = dom.createMorphAt(element5,7,7);
        var morph8 = dom.createMorphAt(dom.childAt(element9, [1]),1,1);
        var morph9 = dom.createMorphAt(element9,3,3);
        var morph10 = dom.createMorphAt(element8,7,7);
        var morph11 = dom.createMorphAt(dom.childAt(element11, [1]),1,1);
        var morph12 = dom.createMorphAt(element11,3,3);
        var morph13 = dom.createMorphAt(element10,7,7);
        var morph14 = dom.createMorphAt(dom.childAt(element13, [1]),1,1);
        var morph15 = dom.createMorphAt(element13,3,3);
        var morph16 = dom.createMorphAt(element14,1,1);
        var morph17 = dom.createMorphAt(element14,4,4);
        var morph18 = dom.createMorphAt(element16,3,3);
        var morph19 = dom.createMorphAt(element19,1,1);
        var morph20 = dom.createMorphAt(element19,4,4);
        var morph21 = dom.createMorphAt(element18,5,5);
        var morph22 = dom.createMorphAt(dom.childAt(element22, [7]),1,1);
        var morph23 = dom.createMorphAt(element22,9,9);
        var morph24 = dom.createMorphAt(dom.childAt(element23, [7]),1,1);
        var morph25 = dom.createMorphAt(element23,9,9);
        var morph26 = dom.createMorphAt(dom.childAt(element25, [3]),7,7);
        var morph27 = dom.createMorphAt(element25,5,5);
        var morph28 = dom.createMorphAt(dom.childAt(element24, [3]),5,5);
        var morph29 = dom.createMorphAt(dom.childAt(element27, [3]),3,3);
        var morph30 = dom.createMorphAt(element27,5,5);
        var morph31 = dom.createMorphAt(dom.childAt(element26, [3]),5,5);
        var morph32 = dom.createMorphAt(dom.childAt(element29, [5]),1,1);
        var morph33 = dom.createMorphAt(element29,7,7);
        var morph34 = dom.createMorphAt(dom.childAt(element30, [5]),1,1);
        var morph35 = dom.createMorphAt(element30,7,7);
        var morph36 = dom.createMorphAt(element34,2,2);
        var morph37 = dom.createMorphAt(element33,3,3);
        var morph38 = dom.createMorphAt(element32,7,7);
        var morph39 = dom.createMorphAt(dom.childAt(element36, [7]),1,1);
        var morph40 = dom.createMorphAt(element36,9,9);
        content(env, morph0, context, "favouritePizza.id");
        content(env, morph1, context, "favouritePizza.text");
        content(env, morph2, context, "favouritePizza.description");
        inline(env, morph3, context, "select-2", [], {"content": get(env, context, "pizzas"), "value": get(env, context, "favouritePizza"), "placeholder": "Choose your Pizza", "allowClear": true});
        block(env, morph4, context, "highlight-code", [], {"lang": ".hbs"}, child0, null);
        content(env, morph5, context, "favouritePizzaId");
        inline(env, morph6, context, "select-2", [], {"content": get(env, context, "pizzas"), "value": get(env, context, "favouritePizzaId"), "optionValuePath": "id", "placeholder": "Choose your Pizza"});
        block(env, morph7, context, "highlight-code", [], {"lang": ".hbs"}, child1, null);
        content(env, morph8, context, "favouritePizzas");
        inline(env, morph9, context, "select-2", [], {"content": get(env, context, "pizzas"), "value": get(env, context, "favouritePizzas"), "multiple": true, "placeholder": "Choose some Pizzas"});
        block(env, morph10, context, "highlight-code", [], {"lang": ".hbs"}, child2, null);
        content(env, morph11, context, "favouritePizzaIds");
        inline(env, morph12, context, "select-2", [], {"content": get(env, context, "pizzas"), "value": get(env, context, "favouritePizzaIds"), "multiple": true, "optionValuePath": "id", "placeholder": "Choose some Pizzas"});
        block(env, morph13, context, "highlight-code", [], {"lang": ".hbs"}, child3, null);
        block(env, morph14, context, "each", [get(env, context, "pizzas")], {}, child4, null);
        inline(env, morph15, context, "select-2", [], {"content": get(env, context, "pizzas"), "value": get(env, context, "favouritePizza"), "placeholder": "Choose your Pizza"});
        inline(env, morph16, context, "input", [], {"type": "text", "value": get(env, context, "favouritePizzaId"), "class": "form-control"});
        inline(env, morph17, context, "select-2", [], {"content": get(env, context, "pizzas"), "value": get(env, context, "favouritePizzaId"), "optionValuePath": "id", "placeholder": "Choose your Pizza"});
        element(env, element17, context, "action", ["loadPizzas"], {});
        inline(env, morph18, context, "select-2", [], {"content": get(env, context, "pizzas"), "value": get(env, context, "favouritePizzas"), "multiple": true, "placeholder": "Choose some Pizzas"});
        block(env, morph19, context, "each", [get(env, context, "pizzas")], {}, child5, null);
        content(env, morph20, context, "preselectedPizzaIds");
        element(env, element20, context, "action", ["loadMorePizzas"], {});
        inline(env, morph21, context, "select-2", [], {"content": get(env, context, "pizzas"), "value": get(env, context, "preselectedPizzaIds"), "multiple": true, "optionValuePath": "id", "placeholder": "Choose some Pizzas"});
        inline(env, morph22, context, "select-2", [], {"content": get(env, context, "pizzas"), "optionLabelPath": "id", "optionDescriptionPath": "text", "placeholder": "Choose some Pizzas"});
        block(env, morph23, context, "highlight-code", [], {"lang": ".hbs"}, child6, null);
        inline(env, morph24, context, "select-2", [], {"content": get(env, context, "pizzas"), "placeholder": "Choose some Pizzas", "cssClass": "custom-class"});
        block(env, morph25, context, "highlight-code", [], {"lang": ".hbs"}, child7, null);
        inline(env, morph26, context, "select-2", [], {"placeholder": "Choose from our many pizzas", "value": get(env, context, "chosenTypeaheadPizza"), "typeaheadSearchingText": "Searching pizzas", "typeaheadNoMatchesText": "No pizzas found for '%@'", "typeaheadErrorText": "Loading failed: %@", "minimumInputLength": 3, "maximumInputLength": 10, "query": "queryPizzas"});
        block(env, morph27, context, "highlight-code", [], {"lang": ".hbs"}, child8, null);
        block(env, morph28, context, "highlight-code", [], {"lang": ".js"}, child9, null);
        inline(env, morph29, context, "select-2", [], {"placeholder": "Choose from our many pizzas", "value": get(env, context, "chosenTypeaheadPizza"), "typeaheadSearchingText": "Searching pizzas", "typeaheadNoMatchesText": "No pizzas found for '%@'", "typeaheadErrorText": "Loading failed: %@", "minimumInputLength": 3, "maximumInputLength": 10, "query": "queryInfiniteScrollPizzas"});
        block(env, morph30, context, "highlight-code", [], {"lang": ".hbs"}, child10, null);
        block(env, morph31, context, "highlight-code", [], {"lang": ".js"}, child11, null);
        inline(env, morph32, context, "select-2", [], {"content": get(env, context, "ingredients"), "value": get(env, context, "selectedIngredients"), "multiple": true, "placeholder": "What would you like on your Pizza?"});
        block(env, morph33, context, "highlight-code", [], {"lang": "json"}, child12, null);
        inline(env, morph34, context, "select-2", [], {"content": get(env, context, "disabledPizzas"), "placeholder": "Choose some Pizzas"});
        block(env, morph35, context, "highlight-code", [], {"lang": "json"}, child13, null);
        element(env, element35, context, "action", ["toggleEnabled"], {});
        content(env, morph36, context, "enabled");
        inline(env, morph37, context, "select-2", [], {"content": get(env, context, "pizzas"), "enabled": get(env, context, "enabled"), "placeholder": "Choose some Pizzas"});
        block(env, morph38, context, "highlight-code", [], {"lang": ".hbs"}, child14, null);
        inline(env, morph39, context, "select-2", [], {"content": get(env, context, "pizzas"), "searchEnabled": false, "placeholder": "Choose some Pizzas"});
        block(env, morph40, context, "highlight-code", [], {"lang": ".hbs"}, child15, null);
        return fragment;
      }
    };
  }()));

});
define('dummy/templates/index', ['exports'], function (exports) {

  'use strict';

  exports['default'] = Ember.HTMLBars.template((function() {
    var child0 = (function() {
      return {
        isHTMLBars: true,
        revision: "Ember@1.11.1",
        blockParams: 0,
        cachedFragment: null,
        hasRendered: false,
        build: function build(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("View the examples »");
          dom.appendChild(el0, el1);
          return el0;
        },
        render: function render(context, env, contextualElement) {
          var dom = env.dom;
          dom.detectNamespace(contextualElement);
          var fragment;
          if (env.useFragmentCache && dom.canClone) {
            if (this.cachedFragment === null) {
              fragment = this.build(dom);
              if (this.hasRendered) {
                this.cachedFragment = fragment;
              } else {
                this.hasRendered = true;
              }
            }
            if (this.cachedFragment) {
              fragment = dom.cloneNode(this.cachedFragment, true);
            }
          } else {
            fragment = this.build(dom);
          }
          return fragment;
        }
      };
    }());
    return {
      isHTMLBars: true,
      revision: "Ember@1.11.1",
      blockParams: 0,
      cachedFragment: null,
      hasRendered: false,
      build: function build(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1,"class","jumbotron");
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("h1");
        dom.setAttribute(el2,"id","title");
        var el3 = dom.createTextNode("select2 for ember.js");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("p");
        var el3 = dom.createTextNode("The go-to component for rich dropdown menus that integrate nicely with Ember.js.");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("h3");
        var el2 = dom.createTextNode("What is this?");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("p");
        var el2 = dom.createTextNode("This component wraps the wildly used ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("a");
        dom.setAttribute(el2,"href","http://ivaynberg.github.io/select2/");
        dom.setAttribute(el2,"target","blank");
        var el3 = dom.createTextNode("Select2 jQuery Plugin");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode(" in an Ember.Component making it easy to use in your ember application.");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("h3");
        var el2 = dom.createTextNode("Why is it good?");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("ul");
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("li");
        var el3 = dom.createTextNode("It does not reinvent the wheel but leverages the power of the ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("a");
        dom.setAttribute(el3,"href","http://ivaynberg.github.io/select2/");
        dom.setAttribute(el3,"target","blank");
        var el4 = dom.createTextNode("Select2 jQuery Plugin");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("li");
        var el3 = dom.createTextNode("It is a nice citizen in the Ember.js Town, supporting value bindings on ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("code");
        var el4 = dom.createTextNode("content");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode(" and ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("code");
        var el4 = dom.createTextNode("value");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode(" properties");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("li");
        var el3 = dom.createTextNode("It supports computed ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("code");
        var el4 = dom.createTextNode("text");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode(" and ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("code");
        var el4 = dom.createTextNode("description");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode(" properties on its option elements");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("li");
        var el3 = dom.createTextNode("It prevents XSS attacks in case the options contain user-supplied values, but enables html content when fed ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("code");
        var el4 = dom.createTextNode("Handlebars.SafeString");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("s");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n	");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("li");
        var el3 = dom.createTextNode("Source code is documented and extensively tested");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        return el0;
      },
      render: function render(context, env, contextualElement) {
        var dom = env.dom;
        var hooks = env.hooks, block = hooks.block;
        dom.detectNamespace(contextualElement);
        var fragment;
        if (env.useFragmentCache && dom.canClone) {
          if (this.cachedFragment === null) {
            fragment = this.build(dom);
            if (this.hasRendered) {
              this.cachedFragment = fragment;
            } else {
              this.hasRendered = true;
            }
          }
          if (this.cachedFragment) {
            fragment = dom.cloneNode(this.cachedFragment, true);
          }
        } else {
          fragment = this.build(dom);
        }
        var morph0 = dom.createMorphAt(dom.childAt(fragment, [0]),5,5);
        block(env, morph0, context, "link-to", ["examples"], {"class": "btn btn-primary btn-lg"}, child0, null);
        return fragment;
      }
    };
  }()));

});
define('dummy/tests/app.jshint', function () {

  'use strict';

  module('JSHint - .');
  test('app.js should pass jshint', function() { 
    ok(true, 'app.js should pass jshint.'); 
  });

});
define('dummy/tests/components/highlight-code.jshint', function () {

  'use strict';

  module('JSHint - components');
  test('components/highlight-code.js should pass jshint', function() { 
    ok(true, 'components/highlight-code.js should pass jshint.'); 
  });

});
define('dummy/tests/components/link-li.jshint', function () {

  'use strict';

  module('JSHint - components');
  test('components/link-li.js should pass jshint', function() { 
    ok(true, 'components/link-li.js should pass jshint.'); 
  });

});
define('dummy/tests/controllers/application.jshint', function () {

  'use strict';

  module('JSHint - controllers');
  test('controllers/application.js should pass jshint', function() { 
    ok(true, 'controllers/application.js should pass jshint.'); 
  });

});
define('dummy/tests/controllers/examples.jshint', function () {

  'use strict';

  module('JSHint - controllers');
  test('controllers/examples.js should pass jshint', function() { 
    ok(true, 'controllers/examples.js should pass jshint.'); 
  });

});
define('dummy/tests/helpers/resolver', ['exports', 'ember/resolver', 'dummy/config/environment'], function (exports, Resolver, config) {

  'use strict';

  var resolver = Resolver['default'].create();

  resolver.namespace = {
    modulePrefix: config['default'].modulePrefix,
    podModulePrefix: config['default'].podModulePrefix
  };

  exports['default'] = resolver;

});
define('dummy/tests/helpers/resolver.jshint', function () {

  'use strict';

  module('JSHint - helpers');
  test('helpers/resolver.js should pass jshint', function() { 
    ok(true, 'helpers/resolver.js should pass jshint.'); 
  });

});
define('dummy/tests/helpers/start-app', ['exports', 'ember', 'dummy/app', 'dummy/router', 'dummy/config/environment'], function (exports, Ember, Application, Router, config) {

  'use strict';



  exports['default'] = startApp;
  function startApp(attrs) {
    var application;

    var attributes = Ember['default'].merge({}, config['default'].APP);
    attributes = Ember['default'].merge(attributes, attrs); // use defaults, but you can override;

    Ember['default'].run(function () {
      application = Application['default'].create(attributes);
      application.setupForTesting();
      application.injectTestHelpers();
    });

    return application;
  }

});
define('dummy/tests/helpers/start-app.jshint', function () {

  'use strict';

  module('JSHint - helpers');
  test('helpers/start-app.js should pass jshint', function() { 
    ok(true, 'helpers/start-app.js should pass jshint.'); 
  });

});
define('dummy/tests/router.jshint', function () {

  'use strict';

  module('JSHint - .');
  test('router.js should pass jshint', function() { 
    ok(true, 'router.js should pass jshint.'); 
  });

});
define('dummy/tests/test-helper', ['dummy/tests/helpers/resolver', 'ember-qunit'], function (resolver, ember_qunit) {

	'use strict';

	ember_qunit.setResolver(resolver['default']);

});
define('dummy/tests/test-helper.jshint', function () {

  'use strict';

  module('JSHint - .');
  test('test-helper.js should pass jshint', function() { 
    ok(true, 'test-helper.js should pass jshint.'); 
  });

});
define('dummy/tests/unit/components/select-2-customize-test', ['ember', 'ember-qunit', 'dummy/tests/helpers/start-app'], function (Ember, ember_qunit, startApp) {

  'use strict';

  /*
    Test "customization" options like:
     * `optionLabelPath`
     * `optionHeadlinePath`   
     * `optionDescriptionPath`
     * `searchEnabled` 
     * custom styles (future...)
   */

  var ingredients = Ember['default'].A([{
    id: 1,
    name: "Tomato",
    subtext: "first"
  }, {
    id: 2,
    name: "Peperoni",
    subtext: "second"
  }, {
    id: 3,
    name: "Ham",
    subtext: "third"
  }, {
    id: 4,
    name: "Chorizo",
    subtext: "fourth"
  }, {
    id: 5,
    group: "Seefruits",
    subtext: "fifth",
    children: [{
      id: 6,
      name: "Salmon"
    }, {
      id: 7,
      name: "Shrimps"
    }]
  }]);

  var modifiedIdIngredients = Ember['default'].A([{
    code: 1,
    name: "Tomato",
    description: "first"
  }, {
    code: 2,
    name: "Peperoni",
    description: "second"
  }, {
    code: 3,
    name: "Ham",
    description: "third"
  }, {
    code: 4,
    name: "Chorizo",
    description: "fourth"
  }]);

  var App, component;
  ember_qunit.moduleForComponent("select-2", "Select2Component (customize)", {
    setup: function setup() {
      App = startApp['default']();
      // setup and append component to dom
      component = this.subject();
    },
    teardown: function teardown() {
      Ember['default'].run(App, "destroy");
      Ember['default'].run(component, "destroy");
    }
  });

  ember_qunit.test("it uses optionLabelPath", function (assert) {
    assert.expect(2);

    component.set("optionLabelPath", "name");
    component.set("content", ingredients);

    this.render();

    click(".select2-choice");
    click(".select2-results li:nth-child(2)", "body");

    andThen(function () {
      assert.strictEqual(component.get("value"), ingredients[1], "selects correct item");
      assert.equal($(".select2-chosen").text(), ingredients[1].name, "has correct text");
    });
  });

  ember_qunit.test("it uses optionHeadlinePath", function (assert) {
    assert.expect(1);

    component.set("optionHeadlinePath", "group");
    component.set("content", ingredients);

    this.render();

    click(".select2-choice");

    andThen(function () {
      var headline = $(".select2-results > li:last-child").find(".select2-result-label").first().text();
      var expected = ingredients[4].group;
      assert.equal(headline, expected, "has correct headline");
    });
  });

  ember_qunit.test("it uses optionDescriptionPath", function (assert) {
    assert.expect(1);

    component.set("optionLabelPath", "name");
    component.set("optionDescriptionPath", "subtext");
    component.set("content", ingredients);

    this.render();

    // open options by clicking on the element
    click(".select2-choice");

    andThen(function () {
      var expected = ingredients.map(function (ingredient) {
        // jQuery .text() will have space between name and subtext, but thats ok
        return ingredient.children ? "" : ingredient.name + " " + ingredient.subtext;
      }).join("");
      assert.equal($(".select2-results > li:not(:last)").text(), expected, "display correct text");
    });
  });

  ember_qunit.test("it uses optionIdPath", function (assert) {
    assert.expect(1);

    component.setProperties({
      optionIdPath: "code",
      content: modifiedIdIngredients
    });

    this.render();

    // open options by clicking on the element
    click(".select2-choice");
    // then select an option
    click(".select2-results li:nth-child(1)", "body");

    andThen(function () {
      assert.strictEqual(component.get("value"), modifiedIdIngredients[0], "selects correct item");
    });
  });

  ember_qunit.test("it uses custom `cssClass` for container", function (assert) {
    assert.expect(1);

    component.set("cssClass", "customClass");

    this.render();

    assert.ok($(".select2-container").hasClass("customClass"), "has class");
  });

  ember_qunit.test("it uses custom `cssClass` for dropdown", function (assert) {
    assert.expect(1);

    component.set("cssClass", "customClass");
    component.set("content", ingredients);

    this.render();

    click(".select2-choice");

    andThen(function () {
      assert.ok($(".select2-drop").hasClass("customClass"), "has class");
    });
  });

  ember_qunit.test("disable search hides search field in single slection mode", function (assert) {
    assert.expect(1);

    component.setProperties({
      searchEnabled: false,
      content: ingredients
    });

    this.render();

    // open options by clicking on the element
    click(".select2-choice");

    andThen(function () {
      assert.equal($("select2-search input").length, 0, "no input field");
    });
  });

  ember_qunit.test("disable search throws exception in multiple selection mode", function (assert) {
    assert.expect(1);

    component.setProperties({
      searchEnabled: false,
      multiple: true
    });

    try {
      this.render();
    } catch (e) {
      assert.ok(e, "threw exception");
    }
  });

  ember_qunit.test("uses tabindex", function (assert) {
    assert.expect(1);

    component.setProperties({
      tabindex: -1,
      content: ingredients
    });

    this.render();

    assert.equal(find(".select2-focusser").attr("tabindex"), "-1", "tabindex matches");
  });

  ember_qunit.test("uses `valueSeparator`", function (assert) {
    assert.expect(2);

    component.setProperties({
      content: [{
        id: "first",
        text: "First" }, {
        id: "second",
        text: "Second" }, {
        id: "thi,rd",
        text: "Third"
      }],
      multiple: true,
      optionValuePath: "id",
      valueSeparator: "|"
    });

    this.render();

    // open options by clicking on the element
    click(".select2-choices");
    // then select an option
    click(".select2-results li:nth-child(1)", "body");

    // open options by clicking on the element
    click(".select2-choices");
    // and select another option
    click(".select2-results li:nth-child(2)", "body");

    andThen(function () {
      assert.equal(component._select.val(), "first|second", "outputs correct raw value string");

      component.set("value", "second|thi,rd");

      assert.equal(component.get("_hasSelectedMissingItems"), false, "accepts value string with custom separator");
    });
  });

  ember_qunit.test("uses `optionLabelSelectedPath`", function (assert) {
    assert.expect(1);

    component.setProperties({
      content: [{
        id: "first",
        text: "First",
        selectedText: "selectedFirst"
      }, {
        id: "second",
        text: "Second",
        selectedText: "selectedSecond"
      }],
      optionValuePath: "id",
      optionLabelSelectedPath: "selectedText"
    });

    this.render();

    component.set("value", "first");

    assert.equal(find(".select2-choice").text().trim(), "selectedFirst", "has correct selected text");
  });

});
define('dummy/tests/unit/components/select-2-customize-test.jshint', function () {

  'use strict';

  module('JSHint - unit/components');
  test('unit/components/select-2-customize-test.js should pass jshint', function() { 
    ok(true, 'unit/components/select-2-customize-test.js should pass jshint.'); 
  });

});
define('dummy/tests/unit/components/select-2-ember-data-test', ['ember', 'ember-data', 'ember-qunit', 'dummy/tests/helpers/start-app'], function (Ember, DS, ember_qunit, startApp) {

  'use strict';

  /*
    Test usage with Ember Data ArrayProxy and PromiseArray
   */

  var simpleContent = Ember['default'].A([{
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
  }]);

  var App, component;
  ember_qunit.moduleForComponent("select-2", "Select2Component (ember-data)", {
    setup: function setup() {
      App = startApp['default']();
      // setup and append component to dom
      component = this.subject();
    },
    teardown: function teardown() {
      Ember['default'].run(App, "destroy");
      Ember['default'].run(component, "destroy");
    }
  });

  ember_qunit.test("it displays items from DS.RecordArray", function (assert) {
    assert.expect(4);

    this.render();

    // warp content in DS.RecordArray
    var simpleContentRecordArray = DS['default'].RecordArray.create({
      content: simpleContent
    });

    component.set("content", simpleContentRecordArray);
    component.set("optionValuePath", "id");

    // open options by clicking on the element
    click(".select2-choice");
    // then select an option
    click(".select2-results li:nth-child(3)", "body");

    andThen(function () {
      assert.strictEqual(component.get("value"), simpleContent[2].id, "selects correct item");
      assert.equal($(".select2-chosen").text(), simpleContent[2].text, "has correct text");

      // select another option just to make sure
      click(".select2-choice");
      click(".select2-results li:nth-child(1)", "body");

      andThen(function () {
        assert.strictEqual(component.get("value"), simpleContent[0].id, "selects correct item");
        assert.equal($(".select2-chosen").text(), simpleContent[0].text, "has correct text");
      });
    });
  });

  ember_qunit.test("it displays items from DS.PromiseArray", function (assert) {
    assert.expect(2);

    this.render();

    // warp content in DS.RecordArray
    var simpleContentPromiseArray = DS['default'].PromiseArray.create({
      promise: Ember['default'].RSVP.resolve(simpleContent)
    });

    component.set("content", simpleContentPromiseArray);

    // wait until Promise is resolved
    simpleContentPromiseArray.then(function () {
      // open options by clicking on the element
      click(".select2-choice");

      andThen(function () {
        assert.equal($(".select2-results li").length, simpleContent.length, "has correct options length");
        assert.equal($(".select2-results li").text(), simpleContent.getEach("text").join(""), "display correct text");
      });
    });
  });

  ember_qunit.test("it is disabled until content promise is resolved", function (assert) {
    assert.expect(2);

    var deferred = Ember['default'].RSVP.defer();

    // warp content in DS.RecordArray
    var simpleContentPromiseArray = DS['default'].PromiseArray.create({
      promise: deferred.promise
    });

    component.set("content", simpleContentPromiseArray);

    this.render();

    assert.ok($(".select2-container").hasClass("select2-container-disabled"), "is disabled");

    deferred.resolve(simpleContent);

    // wait until Promise is resolved
    simpleContentPromiseArray.then(function () {
      assert.ok(!$(".select2-container").hasClass("select2-container-disabled"), "is enabled");
    });
  });

  ember_qunit.test("it stays disabled after content promise is rejected", function (assert) {
    assert.expect(2);

    var deferred = Ember['default'].RSVP.defer(),
        errorText = "some error description";

    // warp content in DS.RecordArray
    var simpleContentPromiseArray = DS['default'].PromiseArray.create({
      promise: deferred.promise
    });

    component.set("content", simpleContentPromiseArray);

    this.render();

    assert.ok($(".select2-container").hasClass("select2-container-disabled"), "is disabled");

    deferred.reject(new Error(errorText));

    // wait until Promise is rejected
    simpleContentPromiseArray.then(null, function () {
      assert.ok($(".select2-container").hasClass("select2-container-disabled"), "is disabled");
    });
  });

  ember_qunit.test("it is disabled until value promise is resolved", function (assert) {
    assert.expect(2);

    var deferred = Ember['default'].RSVP.defer();

    var simpleValuePromiseProxy = DS['default'].PromiseObject.create({
      promise: deferred.promise
    });

    component.set("value", simpleValuePromiseProxy);

    this.render();

    assert.ok($(".select2-container").hasClass("select2-container-disabled"), "is disabled");

    deferred.resolve(simpleContent[0]);

    // wait until Promise is resolved
    simpleValuePromiseProxy.then(function () {
      assert.ok(!$(".select2-container").hasClass("select2-container-disabled"), "is enabled");
    });
  });

  ember_qunit.test("it stays disabled after value promise is rejected", function (assert) {
    assert.expect(2);

    var deferred = Ember['default'].RSVP.defer(),
        errorText = "some error description";

    var simpleValuePromiseProxy = DS['default'].PromiseObject.create({
      promise: deferred.promise
    });

    component.set("value", simpleValuePromiseProxy);

    this.render();

    assert.ok($(".select2-container").hasClass("select2-container-disabled"), "is disabled");

    deferred.reject(new Error(errorText));

    // wait until Promise is rejected
    simpleValuePromiseProxy.then(null, function () {
      assert.ok($(".select2-container").hasClass("select2-container-disabled"), "is disabled");
    });
  });

  ember_qunit.test("it clears selection when value promise resolves to null", function (assert) {
    assert.expect(2);

    var deferred = Ember['default'].RSVP.defer(),
        placeholder = "placeholder";

    var simpleValuePromiseProxy = DS['default'].PromiseObject.create({
      promise: deferred.promise
    });

    component.setProperties({
      value: simpleValuePromiseProxy,
      placeholder: placeholder,
      allowClear: true
    });

    this.render();

    assert.ok($(".select2-container").hasClass("select2-container-disabled"), "is disabled");

    deferred.resolve(null);

    // wait until Promise is resolved
    simpleValuePromiseProxy.then(function () {
      assert.equal($(".select2-chosen").text(), placeholder, "has placeholder text");
    });
  });

});
define('dummy/tests/unit/components/select-2-ember-data-test.jshint', function () {

  'use strict';

  module('JSHint - unit/components');
  test('unit/components/select-2-ember-data-test.js should pass jshint', function() { 
    ok(true, 'unit/components/select-2-ember-data-test.js should pass jshint.'); 
  });

});
define('dummy/tests/unit/components/select-2-enabled-option-test', ['ember', 'ember-qunit', 'dummy/tests/helpers/start-app'], function (Ember, ember_qunit, startApp) {

  'use strict';

  /*
    Test the `enabled=true/false` binding
   */

  var App, component;
  ember_qunit.moduleForComponent("select-2", "Select2Component (enabled-option)", {
    setup: function setup() {
      App = startApp['default']();
      // setup and append component to dom
      component = this.subject();
    },
    teardown: function teardown() {
      Ember['default'].run(App, "destroy");
      Ember['default'].run(component, "destroy");
    }
  });

  ember_qunit.test("it is disabled when `enabled=false` on creation", function (assert) {
    assert.expect(1);

    component.set("enabled", false);

    this.render();

    assert.ok($(".select2-container").hasClass("select2-container-disabled"), "is disabled");
  });

  ember_qunit.test("it is disabled when `enabled=false`", function (assert) {
    assert.expect(3);

    this.render();

    assert.ok(!$(".select2-container").hasClass("select2-container-disabled"), "is enabled");

    component.set("enabled", false);

    assert.ok($(".select2-container").hasClass("select2-container-disabled"), "is disabled");

    component.set("enabled", true);

    assert.ok(!$(".select2-container").hasClass("select2-container-disabled"), "is enabled");
  });

  ember_qunit.test("it stays disabled when `enabled=true` but has selected missing values", function (assert) {
    assert.expect(2);

    this.render();

    assert.ok(!$(".select2-container").hasClass("select2-container-disabled"), "is enabled");

    component.setProperties({
      optionValuePath: "id",
      content: [],
      value: ["missingObject"]
    });

    assert.ok($(".select2-container").hasClass("select2-container-disabled"), "is disabled");
  });

});
define('dummy/tests/unit/components/select-2-enabled-option-test.jshint', function () {

  'use strict';

  module('JSHint - unit/components');
  test('unit/components/select-2-enabled-option-test.js should pass jshint', function() { 
    ok(true, 'unit/components/select-2-enabled-option-test.js should pass jshint.'); 
  });

});
define('dummy/tests/unit/components/select-2-nested-content-test', ['ember', 'ember-qunit', 'dummy/tests/helpers/start-app'], function (Ember, ember_qunit, startApp) {

  'use strict';

  /*
    Test basic functionality with nested input for `content`
   */

  var categorizedIngredients = Ember['default'].A([{
    text: "Vegetables",
    children: [{
      id: "tom",
      text: "Tomatoes"
    }, {
      id: "pin",
      text: "Pineapples"
    }]
  }, {
    text: "Meat",
    children: [{
      id: "sal",
      text: "Salami"
    }, {
      id: "ham",
      text: "Ham"
    }, {
      id: "bac",
      text: "Bacon"
    }]
  }]);

  var App, component;
  ember_qunit.moduleForComponent("select-2", "Select2Component (nested-content)", {
    setup: function setup() {
      App = startApp['default']();
      // setup and append component to dom
      component = this.subject();
    },
    teardown: function teardown() {
      Ember['default'].run(App, "destroy");
      Ember['default'].run(component, "destroy");
    }
  });

  ember_qunit.test("it sets value to selected object in single selection mode", function (assert) {
    assert.expect(4);

    this.render();

    component.set("content", categorizedIngredients);

    // open options by clicking on the element
    click(".select2-choice");
    // then select a nested option
    click(".select2-results li:nth-child(2) ul li:nth-child(3)", "body");

    andThen(function () {
      assert.strictEqual(component.get("value"), categorizedIngredients[1].children[2], "selects correct item");
      assert.equal($(".select2-chosen").text(), categorizedIngredients[1].children[2].text, "has correct text");

      // select another option just to make sure
      click(".select2-choice");
      click(".select2-results li:nth-child(1) ul li:nth-child(1)", "body");

      andThen(function () {
        assert.strictEqual(component.get("value"), categorizedIngredients[0].children[0], "selects correct item");
        assert.equal($(".select2-chosen").text(), categorizedIngredients[0].children[0].text, "has correct text");
      });
    });
  });

  ember_qunit.test("it sets value to selected object's optionValuePath in single selection mode", function (assert) {
    assert.expect(4);

    this.render();

    component.set("content", categorizedIngredients);
    component.set("optionValuePath", "id");

    // open options by clicking on the element
    click(".select2-choice");
    // then select a nested option
    click(".select2-results li:nth-child(2) ul li:nth-child(3)", "body");

    andThen(function () {
      assert.strictEqual(component.get("value"), categorizedIngredients[1].children[2].id, "selects correct item");
      assert.equal($(".select2-chosen").text(), categorizedIngredients[1].children[2].text, "has correct text");

      // select another option just to make sure
      click(".select2-choice");
      click(".select2-results li:nth-child(1) ul li:nth-child(1)", "body");

      andThen(function () {
        assert.strictEqual(component.get("value"), categorizedIngredients[0].children[0].id, "selects correct item");
        assert.equal($(".select2-chosen").text(), categorizedIngredients[0].children[0].text, "has correct text");
      });
    });
  });

  ember_qunit.test("it sets value to array of selected objects in multiple selection mode", function (assert) {
    assert.expect(7);

    component.set("multiple", true);

    this.render();

    component.set("content", categorizedIngredients);

    assert.equal($(".select2-choices").text().trim(), "", "has empty selection text on start");

    // select an option after opening the dropdown
    click(".select2-choices");
    click(".select2-results li:nth-child(2) ul li:nth-child(3)", "body");

    andThen(function () {
      assert.deepEqual(component.get("value"), [categorizedIngredients[1].children[2]], "has correct value");
      assert.equal($(".select2-choices").text().replace(/ /g, ""), categorizedIngredients[1].children[2].text, "displays correct text");

      // select another item
      click(".select2-choices");
      click(".select2-results li:nth-child(1) ul li:nth-child(1)", "body");

      andThen(function () {
        assert.deepEqual(component.get("value"), [categorizedIngredients[1].children[2], categorizedIngredients[0].children[0]], "has correct value");
        assert.equal($(".select2-choices").text().replace(/ /g, ""), categorizedIngredients[1].children[2].text + categorizedIngredients[0].children[0].text, "displays correct text");

        // remove the first item again
        click(".select2-search-choice:nth-child(1) .select2-search-choice-close");

        andThen(function () {
          assert.deepEqual(component.get("value"), [categorizedIngredients[0].children[0]], "has correct value");
          assert.equal($(".select2-choices").text().replace(/ /g, ""), categorizedIngredients[0].children[0].text, "displays correct text");
        });
      });
    });
  });

  ember_qunit.test("it sets value to array of selected objects' optionValuePaths in multiple selection mode", function (assert) {
    assert.expect(7);

    component.set("multiple", true);

    this.render();

    component.set("content", categorizedIngredients);
    component.set("optionValuePath", "id");

    assert.equal($(".select2-choices").text().trim(), "", "has empty selection text on start");

    // select an option after opening the dropdown
    click(".select2-choices");
    click(".select2-results li:nth-child(2) ul li:nth-child(3)", "body");

    andThen(function () {
      assert.deepEqual(component.get("value"), [categorizedIngredients[1].children[2].id], "has correct value");
      assert.equal($(".select2-choices").text().replace(/ /g, ""), categorizedIngredients[1].children[2].text, "displays correct text");

      // select another item
      click(".select2-choices");
      click(".select2-results li:nth-child(1) ul li:nth-child(1)", "body");

      andThen(function () {
        assert.deepEqual(component.get("value"), [categorizedIngredients[1].children[2].id, categorizedIngredients[0].children[0].id], "has correct value");
        assert.equal($(".select2-choices").text().replace(/ /g, ""), categorizedIngredients[1].children[2].text + categorizedIngredients[0].children[0].text, "displays correct text");

        // remove the first item again
        click(".select2-search-choice:nth-child(1) .select2-search-choice-close");

        andThen(function () {
          assert.deepEqual(component.get("value"), [categorizedIngredients[0].children[0].id], "has correct value");
          assert.equal($(".select2-choices").text().replace(/ /g, ""), categorizedIngredients[0].children[0].text, "displays correct text");
        });
      });
    });
  });

});
define('dummy/tests/unit/components/select-2-nested-content-test.jshint', function () {

  'use strict';

  module('JSHint - unit/components');
  test('unit/components/select-2-nested-content-test.js should pass jshint', function() { 
    ok(true, 'unit/components/select-2-nested-content-test.js should pass jshint.'); 
  });

});
define('dummy/tests/unit/components/select-2-test', ['ember', 'ember-qunit', 'dummy/tests/helpers/start-app'], function (Ember, ember_qunit, startApp) {

  'use strict';

  /*
    Test basic functionality like selection in various modes
   */

  var simpleContent = Ember['default'].A([{
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
  }]);
  var additionalContent = Ember['default'].A([{
    id: "cal",
    text: "Calzone"
  }, {
    id: "bbq",
    text: "Barbecue"
  }]);

  var App, component;
  ember_qunit.moduleForComponent("select-2", "Select2Component", {
    setup: function setup() {
      App = startApp['default']();
      // setup and append component to dom
      component = this.subject();
    },
    teardown: function teardown() {
      Ember['default'].run(App, "destroy");
      Ember['default'].run(component, "destroy");
    }
  });

  ember_qunit.test("it renders", function (assert) {
    assert.expect(2);

    assert.equal(component._state, "preRender");

    // appends the component to the page
    this.render();
    assert.equal(component._state, "inDOM");
  });

  ember_qunit.test("it initializes select2 plugin", function (assert) {
    assert.expect(2);

    // append the component to the DOM
    this.render();

    assert.ok(component.$().data("select2"), "has select2 data attribute");

    assert.ok($(".select2-container").length, "inserts container into dom");
  });

  ember_qunit.test("it supports placeholder text", function (assert) {
    var placeholder = "unit testing rocks";

    component.set("placeholder", placeholder);

    this.render();

    assert.equal($(".select2-chosen").text(), placeholder, "has placeholder text");
  });

  ember_qunit.test("it shows options when opened", function (assert) {
    assert.expect(2);

    this.render();

    component.set("content", simpleContent);

    // open options by clicking on the element
    click(".select2-choice");

    andThen(function () {
      assert.equal($(".select2-results li").length, simpleContent.length, "has correct options length");
      assert.equal($(".select2-results li").text(), simpleContent.getEach("text").join(""), "display correct text");
    });
  });

  ember_qunit.test("it sets value to selected object in single selection mode", function (assert) {
    assert.expect(4);

    this.render();

    component.set("content", simpleContent);

    // open options by clicking on the element
    click(".select2-choice");
    // then select an option
    click(".select2-results li:nth-child(3)", "body");

    andThen(function () {
      assert.strictEqual(component.get("value"), simpleContent[2], "selects correct item");
      assert.equal($(".select2-chosen").text(), simpleContent[2].text, "has correct text");

      // select another option just to make sure
      click(".select2-choice");
      click(".select2-results li:nth-child(1)", "body");

      andThen(function () {
        assert.strictEqual(component.get("value"), simpleContent[0], "selects correct item");
        assert.equal($(".select2-chosen").text(), simpleContent[0].text, "has correct text");
      });
    });
  });

  ember_qunit.test("it sends `didSelect` action once when selection has been changed", function (assert) {
    assert.expect(1);

    var controller = {
      selectionChanged: function selectionChanged() {}
    };
    var spy = sinon.spy(controller, "selectionChanged");

    component.setProperties({
      targetObject: controller,
      content: simpleContent,
      didSelect: "selectionChanged"
    });

    this.render();

    // open options by clicking on the element
    click(".select2-choice");
    // then select an option
    click(".select2-results li:nth-child(3)", "body");

    andThen(function () {
      assert.ok(spy.calledOnce, "callback after selection changed has been executed");
    });
  });

  /*
    This test assures, that when sending the `didSelect` action, bindings have
    already been synced. Test for PR #75
   */
  ember_qunit.test("component has correct value before `didSelect` fires", function (assert) {
    assert.expect(1);

    var controller = Ember['default'].Object.create({
      component: component,
      valueBinding: "component.value",
      selectionChanged: function selectionChanged() {
        assert.strictEqual(this.get("value"), simpleContent[2], "selects correct item");
      }
    });

    component.setProperties({
      targetObject: controller,
      content: simpleContent,
      didSelect: "selectionChanged"
    });

    this.render();

    // open options by clicking on the element
    click(".select2-choice");
    // then select an option
    click(".select2-results li:nth-child(3)", "body");
  });

  ember_qunit.test("it sends `didSelect` action having the new value as the first argument", function (assert) {
    assert.expect(2);

    var controller = {
      selectionChanged: function selectionChanged() {}
    };
    var spy = sinon.spy(controller, "selectionChanged");

    component.setProperties({
      targetObject: controller,
      content: simpleContent,
      didSelect: "selectionChanged"
    });

    this.render();

    // open options by clicking on the element
    click(".select2-choice");
    // then select an option
    click(".select2-results li:nth-child(3)", "body");

    andThen(function () {
      assert.ok(spy.calledOnce, "callback after selection changed has been executed");
      assert.ok(spy.calledWith(simpleContent[2]), "has new value as argument");
    });
  });

  ember_qunit.test("it sends `didSelect` action having a reference to itself as the second argument", function (assert) {
    assert.expect(2);

    var controller = {
      selectionChanged: function selectionChanged() {}
    };
    var spy = sinon.spy(controller, "selectionChanged");

    component.setProperties({
      targetObject: controller,
      content: simpleContent,
      didSelect: "selectionChanged"
    });

    this.render();

    // open options by clicking on the element
    click(".select2-choice");
    // then select an option
    click(".select2-results li:nth-child(3)", "body");

    andThen(function () {
      assert.ok(spy.calledOnce, "callback after selection changed has been executed");
      assert.ok(spy.calledWith(simpleContent[2], component), "has reference to self as argument");
    });
  });

  ember_qunit.test("it supports the allowClear option", function (assert) {
    assert.expect(3);

    component.set("placeholder", "Select a value"); // placeholder is required for allowClear
    component.set("allowClear", true);

    this.render();

    component.set("content", simpleContent);

    // open options by clicking on the element
    click(".select2-choice");
    // then select an option
    click(".select2-results li:nth-child(3)", "body");

    andThen(function () {
      assert.strictEqual(component.get("value"), simpleContent[2], "selects correct item");
      assert.equal($(".select2-chosen").text(), simpleContent[2].text, "has correct text");

      // Click the remove option x
      click(".select2-search-choice-close:visible");

      andThen(function () {
        assert.strictEqual(component.get("value"), null, "unselects the selected item");
      });
    });
  });

  ember_qunit.test("it alerts if allowClear is set without a placeholder", function (assert) {
    assert.expect(1);

    component.set("placeholder", undefined);
    component.set("allowClear", true);

    try {
      this.render();
    } catch (e) {
      assert.equal(e.message, "Assertion Failed: To use allowClear, you have to specify a placeholder", "throws and error");
    }
  });

  ember_qunit.test("it sets value to selected object's optionValuePath in single selection mode", function (assert) {
    assert.expect(4);

    this.render();

    component.set("content", simpleContent);
    component.set("optionValuePath", "id");

    // open options by clicking on the element
    click(".select2-choice");
    // then select an option
    click(".select2-results li:nth-child(3)", "body");

    andThen(function () {
      assert.strictEqual(component.get("value"), simpleContent[2].id, "selects correct item");
      assert.equal($(".select2-chosen").text(), simpleContent[2].text, "has correct text");

      // select another option just to make sure
      click(".select2-choice");
      click(".select2-results li:nth-child(1)", "body");

      andThen(function () {
        assert.strictEqual(component.get("value"), simpleContent[0].id, "selects correct item");
        assert.equal($(".select2-chosen").text(), simpleContent[0].text, "has correct text");
      });
    });
  });

  ember_qunit.test("it allows individual options to be disabled", function (assert) {
    assert.expect(3);

    this.render();

    component.set("content", simpleContent);
    component.set("optionValuePath", "id");

    //select an enabled option
    click(".select2-choice");
    click(".select2-results li:nth-child(2)", "body");

    //click disabled option
    click(".select2-choice");
    click(".select2-results li:nth-child(5)", "body");

    andThen(function () {
      //selection should remain unchanged
      assert.strictEqual(component.get("value"), simpleContent[1].id, "selection remains unchanged");
      assert.equal($(".select2-chosen").text(), simpleContent[1].text, "remains unchanged");

      //should have disabled styling
      assert.equal($(".select2-results li:nth-child(5)").hasClass("select2-disabled"), true, "has disabled class");
    });
  });

  ember_qunit.test("it reacts to external value change", function (assert) {
    assert.expect(2);

    this.render();

    component.set("content", simpleContent);

    assert.equal($(".select2-chosen").text(), "", "has empty selection text on start");

    component.set("value", simpleContent[1]);

    assert.equal($(".select2-chosen").text(), simpleContent[1].text, "has correct selection text after value change");
  });

  ember_qunit.test("it reacts to external value change with optionValuePath", function (assert) {
    assert.expect(2);

    this.render();

    component.set("content", simpleContent);
    component.set("optionValuePath", "id");

    assert.equal($(".select2-chosen").text(), "", "has empty selection text on start");

    component.set("value", simpleContent[1].id);

    assert.equal($(".select2-chosen").text(), simpleContent[1].text, "has correct selection text after value change");
  });

  ember_qunit.test("it sets value to array of selected objects in multiple selection mode", function (assert) {
    assert.expect(7);

    component.set("multiple", true);

    this.render();

    component.set("content", simpleContent);

    assert.equal($(".select2-choices").text().trim(), "", "has empty selection text on start");

    // select an option after opening the dropdown
    click(".select2-choices");
    click(".select2-results li:nth-child(3)", "body");

    andThen(function () {
      assert.deepEqual(component.get("value"), [simpleContent[2]], "has correct value");
      assert.equal($(".select2-choices").text().replace(/ /g, ""), simpleContent[2].text, "displays correct text");

      // select another item
      click(".select2-choices");
      click(".select2-results li:nth-child(1)", "body");

      andThen(function () {
        assert.deepEqual(component.get("value"), [simpleContent[2], simpleContent[0]], "has correct value");
        assert.equal($(".select2-choices").text().replace(/ /g, ""), simpleContent[2].text + simpleContent[0].text, "displays correct text");

        // remove the first item again
        click(".select2-search-choice:nth-child(1) .select2-search-choice-close");

        andThen(function () {
          assert.deepEqual(component.get("value"), [simpleContent[0]], "has correct value");
          assert.equal($(".select2-choices").text().replace(/ /g, ""), simpleContent[0].text, "displays correct text");
        });
      });
    });
  });

  ember_qunit.test("it sets value to array of selected objects' optionValuePaths in multiple selection mode", function (assert) {
    assert.expect(7);

    component.set("multiple", true);

    this.render();

    component.set("content", simpleContent);
    component.set("optionValuePath", "id");

    assert.equal($(".select2-choices").text().trim(), "", "has empty selection text on start");

    // select an option after opening the dropdown
    click(".select2-choices");
    click(".select2-results li:nth-child(3)", "body");

    andThen(function () {
      assert.deepEqual(component.get("value"), [simpleContent[2].id], "has correct value");
      assert.equal($(".select2-choices").text().replace(/ /g, ""), simpleContent[2].text, "displays correct text");

      // select another item
      click(".select2-choices");
      click(".select2-results li:nth-child(1)", "body");

      andThen(function () {
        assert.deepEqual(component.get("value"), [simpleContent[2].id, simpleContent[0].id], "has correct value");
        assert.equal($(".select2-choices").text().replace(/ /g, ""), simpleContent[2].text + simpleContent[0].text, "displays correct text");

        // remove the first item again
        click(".select2-search-choice:nth-child(1) .select2-search-choice-close");

        andThen(function () {
          assert.deepEqual(component.get("value"), [simpleContent[0].id], "has correct value");
          assert.equal($(".select2-choices").text().replace(/ /g, ""), simpleContent[0].text, "displays correct text");
        });
      });
    });
  });

  ember_qunit.test("it reacts to changing the content array", function (assert) {
    assert.expect(4);

    this.render();

    var content = Ember['default'].A();
    content.pushObjects(simpleContent);

    component.set("content", content);

    // select an option after opening the dropdown
    click(".select2-choice");

    andThen(function () {
      assert.equal($(".select2-results li").length, simpleContent.length, "has correct options length");
      assert.equal($(".select2-results li").text(), simpleContent.getEach("text").join(""), "display correct text");

      click(".select2-choice");

      content.pushObjects(additionalContent);

      click(".select2-choice");

      andThen(function () {
        assert.equal($(".select2-results li").length, simpleContent.length + additionalContent.length, "has correct options length");
        assert.equal($(".select2-results li").text(), simpleContent.getEach("text").join("") + additionalContent.getEach("text").join(""), "display correct text");
      });
    });
  });

  ember_qunit.test("it is disabled when its selection contains values not in the content array", function (assert) {
    assert.expect(2);

    this.render();

    var content = Ember['default'].A();
    content.pushObjects(simpleContent);

    component.set("content", content);
    component.set("multiple", true);
    component.set("optionValuePath", "id");
    component.set("value", ["bbq"]);

    assert.ok($(".select2-container").hasClass("select2-container-disabled"), "is disabled");

    content.pushObjects(additionalContent);

    assert.ok(!$(".select2-container").hasClass("select2-container-disabled"), "is enabled");
  });

  ember_qunit.test("Change event does not trigger an autorun", function (assert) {
    assert.expect(1);

    this.render();
    var content = Ember['default'].A();
    content.pushObjects(simpleContent);
    component.set("content", content);
    component.set("optionValuePath", "id");

    Ember['default'].addObserver(component, "value", function () {
      Ember['default'].run.schedule("afterRender", function () {
        assert.ok(true);
      });
    });

    component._select.val(42).trigger("change");
  });

});
define('dummy/tests/unit/components/select-2-test.jshint', function () {

  'use strict';

  module('JSHint - unit/components');
  test('unit/components/select-2-test.js should pass jshint', function() { 
    ok(true, 'unit/components/select-2-test.js should pass jshint.'); 
  });

});
define('dummy/tests/unit/components/select-2-typeahead-test', ['ember', 'ember-qunit', 'dummy/tests/helpers/start-app'], function (Ember, ember_qunit, startApp) {

  'use strict';

  /*
    Test the typeahead feature enabled by setting the `query` binding

    Also tests the customization options
     * `typeaheadSearchingText`
     * `typeaheadNoMatchesText` and escaping of the search term
     * `typeaheadErrorText`
   */

  var simpleContent = Ember['default'].A([{
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
  }]);

  var firstContent = Ember['default'].A([{
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
    id: "choco",
    text: "Chocolate"
  }, {
    id: "tomato",
    text: "Tomato"
  }, {
    id: 36,
    text: "Crust"
  }, {
    id: 37,
    text: "Dominos"
  }]);

  var moreContent = Ember['default'].A([{
    id: "pine",
    text: "Pineapple"
  }, {
    id: "cheese",
    text: "Cheese"
  }, {
    id: 45,
    text: "Sausage"
  }, {
    id: 46,
    text: "Mushroom"
  }]);

  var App, component;
  ember_qunit.moduleForComponent("select-2", "Select2Component (typeahead)", {
    setup: function setup() {
      App = startApp['default']();
      // setup and append component to dom
      component = this.subject();
    },
    teardown: function teardown() {
      Ember['default'].run(App, "destroy");
      Ember['default'].run(component, "destroy");
    }
  });

  ember_qunit.test("it send `query` action with query and deferred arguments", function (assert) {
    assert.expect(1);

    var controller = {
      queryOptions: function queryOptions(query, deferred) {
        deferred.resolve(simpleContent);
      }
    };

    var spy = sinon.spy(controller, "queryOptions");

    component.setProperties({
      targetObject: controller,
      query: "queryOptions"
    });

    this.render();

    // open options by clicking on the element
    click(".select2-choice");

    andThen(function () {
      assert.ok(spy.calledWithMatch(sinon.match.has("term", sinon.match.string), sinon.match.has("resolve", sinon.match.func)), "callback with query object with search string and deferred object that can be resolved");
    });
  });

  ember_qunit.test("it displays options from array", function (assert) {
    assert.expect(2);

    var controller = {
      queryOptions: function queryOptions(query, deferred) {
        deferred.resolve(simpleContent);
      }
    };

    component.setProperties({
      targetObject: controller,
      query: "queryOptions"
    });

    this.render();

    // open options by clicking on the element
    click(".select2-choice");

    andThen(function () {
      assert.equal($(".select2-results li").length, simpleContent.length, "has correct options length");
      assert.equal($(".select2-results li").text(), simpleContent.getEach("text").join(""), "display correct text");
    });
  });

  ember_qunit.test("it displays options from ArrayProxy", function (assert) {
    assert.expect(2);

    var controller = {
      queryOptions: function queryOptions(query, deferred) {
        deferred.resolve(Ember['default'].ArrayProxy.create({ content: simpleContent }));
      }
    };

    component.setProperties({
      targetObject: controller,
      query: "queryOptions"
    });

    this.render();

    // open options by clicking on the element
    click(".select2-choice");

    andThen(function () {
      assert.equal($(".select2-results li").length, simpleContent.length, "has correct options length");
      assert.equal($(".select2-results li").text(), simpleContent.getEach("text").join(""), "display correct text");
    });
  });

  ember_qunit.test("it displays options from array with loading more", function (assert) {
    assert.expect(4);

    var alreadyLoadedOnce = false;
    var loadingMoreText = "Loading more results…";

    var controller = {
      queryOptions: function queryOptions(query, deferred) {
        if (alreadyLoadedOnce) {
          deferred.resolve({ data: moreContent, more: false });
        } else {
          alreadyLoadedOnce = true;
          deferred.resolve({ data: firstContent, more: true });
        }
      }
    };

    component.setProperties({
      targetObject: controller,
      query: "queryOptions"
    });

    this.render();

    // open options by clicking on the element
    click(".select2-choice");

    andThen(function () {
      assert.equal($(".select2-results li").length, firstContent.length + 1, "has correct options length");
      assert.equal($(".select2-results li").text(), Ember['default'].A(firstContent).getEach("text").join("") + loadingMoreText, "display correct text");

      //scroll to bottom, wait for scroll event to be regsitered, and expect a load more
      $(".select2-results").scrollTop($(".select2-results")[0].scrollHeight);

      Ember['default'].run.later(this, function () {
        assert.equal($(".select2-results li").length, firstContent.length + moreContent.length, "has correct options length after scroll");
        assert.equal($(".select2-results li").text(), Ember['default'].A(firstContent.concat(moreContent)).getEach("text").join(""), "display correct text after scroll");
      }, 150);
    });
  });

  ember_qunit.test("it displays options from ArrayProxy with loading more", function (assert) {
    assert.expect(4);

    var alreadyLoadedOnce = false;
    var loadingMoreText = "Loading more results…";

    var controller = {
      queryOptions: function queryOptions(query, deferred) {
        if (alreadyLoadedOnce) {
          deferred.resolve({ data: Ember['default'].ArrayProxy.create({ content: moreContent }), more: false });
        } else {
          alreadyLoadedOnce = true;
          deferred.resolve({ data: Ember['default'].ArrayProxy.create({ content: firstContent }), more: true });
        }
      }
    };

    component.setProperties({
      targetObject: controller,
      query: "queryOptions"
    });

    this.render();

    // open options by clicking on the element
    click(".select2-choice");

    andThen(function () {
      assert.equal($(".select2-results li").length, firstContent.length + 1, "has correct options length");
      assert.equal($(".select2-results li").text(), Ember['default'].A(firstContent).getEach("text").join("") + loadingMoreText, "display correct text");

      //scroll to bottom, wait for scroll event to be regsitered, and expect a load more
      $(".select2-results").scrollTop($(".select2-results")[0].scrollHeight);

      Ember['default'].run.later(this, function () {
        assert.equal($(".select2-results li").length, firstContent.length + moreContent.length, "has correct options length after scroll");
        assert.equal($(".select2-results li").text(), Ember['default'].A(firstContent.concat(moreContent)).getEach("text").join(""), "display correct text after scroll");
      }, 150);
    });
  });

  ember_qunit.test("it displays default minimumInputLength text", function (assert) {
    assert.expect(1);

    component.set("minimumInputLength", 3);

    this.render();

    // open options by clicking on the element
    click(".select2-choice");

    andThen(function () {
      assert.equal($("li.select2-no-results").text(), "Please enter 3 or more characters", "displays minimumInputLength text info");
    });
  });

  ember_qunit.test("it allows no inputs longer than maximumInputLength", function (assert) {
    assert.expect(1);

    component.setProperties({
      maximumInputLength: 10,
      content: simpleContent
    });

    this.render();

    // open options by clicking on the element
    click(".select2-choice");

    andThen(function () {
      assert.equal(find(".select2-input", "body")[0].maxLength, 10, "has 10 character limit");
    });
  });

  ember_qunit.test("it displays default searching text when waiting for results for first time", function (assert) {
    assert.expect(1);

    var controller = {
      queryOptions: function queryOptions(query, deferred) {}
    };

    component.setProperties({
      targetObject: controller,
      query: "queryOptions"
    });

    this.render();

    // open options by clicking on the element
    click(".select2-choice");

    andThen(function () {
      assert.equal($("li.select2-searching").text(), "Searching…", "displays searching text");
    });
  });

  ember_qunit.test("it displays custom `typeaheadSearchingText` when waiting for results for first time", function (assert) {
    assert.expect(1);

    var controller = {
      queryOptions: function queryOptions(query, deferred) {}
    };

    component.setProperties({
      targetObject: controller,
      typeaheadSearchingText: "customSearch",
      query: "queryOptions"
    });

    this.render();

    // open options by clicking on the element
    click(".select2-choice");

    andThen(function () {
      assert.equal($("li.select2-searching").text(), "customSearch", "displays custom searching text");
    });
  });

  ember_qunit.test("it displays default no-matches message for empty response", function (assert) {
    assert.expect(1);

    var controller = {
      queryOptions: function queryOptions(query, deferred) {
        deferred.resolve([]);
      }
    };

    component.setProperties({
      targetObject: controller,
      query: "queryOptions"
    });

    this.render();

    // open options by clicking on the element
    click(".select2-choice");

    andThen(function () {
      assert.equal($("li.select2-no-results").text(), "No matches found", "display no results text");
    });
  });

  ember_qunit.test("it displays custom `typeaheadNoMatchesText` text", function (assert) {
    assert.expect(1);

    var controller = {
      queryOptions: function queryOptions(query, deferred) {
        deferred.resolve([]);
      }
    };

    component.setProperties({
      targetObject: controller,
      typeaheadNoMatchesText: "No results for %@",
      query: "queryOptions"
    });

    this.render();

    // open options by clicking on the element
    click(".select2-choice");

    fillIn(".select2-input", "body", "bla");

    andThen(function () {
      assert.equal($("li.select2-no-results").text(), "No results for ", "display custom no results text");
    });
  });

  ember_qunit.test("it displays default error message for rejected promise", function (assert) {
    assert.expect(1);

    var controller = {
      queryOptions: function queryOptions(query, deferred) {
        deferred.reject("Some message");
      }
    };

    component.setProperties({
      targetObject: controller,
      query: "queryOptions"
    });

    this.render();

    // open options by clicking on the element
    click(".select2-choice");

    andThen(function () {
      assert.equal($("li.select2-ajax-error").text(), "Loading failed", "displays error text");
    });
  });

  ember_qunit.test("it displays `typeaheadErrorText` for rejected promise", function (assert) {
    assert.expect(1);

    var controller = {
      queryOptions: function queryOptions(query, deferred) {
        deferred.reject("Some message");
      }
    };

    component.setProperties({
      targetObject: controller,
      typeaheadErrorText: "Loading Error: %@",
      query: "queryOptions"
    });

    this.render();

    // open options by clicking on the element
    click(".select2-choice");

    andThen(function () {
      assert.equal($("li.select2-ajax-error").text(), "Loading Error: Some message", "displays custom error text");
    });
  });

});
define('dummy/tests/unit/components/select-2-typeahead-test.jshint', function () {

  'use strict';

  module('JSHint - unit/components');
  test('unit/components/select-2-typeahead-test.js should pass jshint', function() { 
    ok(true, 'unit/components/select-2-typeahead-test.js should pass jshint.'); 
  });

});
/* jshint ignore:start */

/* jshint ignore:end */

/* jshint ignore:start */

define('dummy/config/environment', ['ember'], function(Ember) {
  var prefix = 'dummy';
/* jshint ignore:start */

try {
  var metaName = prefix + '/config/environment';
  var rawConfig = Ember['default'].$('meta[name="' + metaName + '"]').attr('content');
  var config = JSON.parse(unescape(rawConfig));

  return { 'default': config };
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

/* jshint ignore:end */

});

if (runningTests) {
  require("dummy/tests/test-helper");
} else {
  require("dummy/app")["default"].create({"name":"ember-select-2","version":"1.3.0.12be6180"});
}

/* jshint ignore:end */
//# sourceMappingURL=dummy.map