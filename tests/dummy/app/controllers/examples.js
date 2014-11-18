import Ember from "ember";

var ExamplesController = Ember.Controller.extend({
  favouritePizza: null,
  favouritePizzaId: Ember.computed.defaultTo('ham'),
  favouritePizzas: null,
  favouritePizzaIds: null,
  preselectedPizzaIds: ["ham", "pep", "tex"],
  chosenIngredients: null,
  chosenTypeaheadPizza: null,
  enabled: true,

  pizzas: Ember.A([
    {
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
    }
  ]),

  morePizzas: [
    {
      id: "cal",
      text: "Calzone",
      description: "Anyone know what that is?"
    }, {
      id: "bbq",
      text: "Barbecue",
      description: "Just lovely!"
    }
  ],

  evenMorePizzas: [
    {
      id: "tex",
      text: "Texas",
      description: "Like Barbecue but with bullets"
    }, {
      id: "for",
      text: "Quattro Formaggi",
      description: "Cheese overload"
    }
  ],

  ingredients: [
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
  ],

  actions: {
    selectPizza: function(item) {
      this.set("favouritePizza", item);
    },

    loadPizzas: function() {
      this.pizzas.pushObjects(this.morePizzas);
      this.morePizzas = [];
    },

    loadMorePizzas: function() {
      this.pizzas.pushObjects(this.evenMorePizzas);
      this.evenMorePizzas = [];
    },

    toggleEnabled: function() {
      this.toggleProperty('enabled');
    },

    queryPizzas: function(query, deferred) {
      setTimeout(function() {
        var data = [];
        switch(query.term) {
          case 'error':
            deferred.reject("sample error");
            break;
          case 'empty':
            deferred.resolve(data);
            break;
          default:
            for (var i = 0; i < 10; i++) {
              data.push({
                id: query.term + '_' + i,
                text: 'Pizza ' + query.term + ' ' + i
              });
            }
            deferred.resolve(data);
            break;
        }
      }, 300);
    }
  }
});

export default ExamplesController;