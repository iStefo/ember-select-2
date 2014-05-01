var ExamplesController = Ember.Controller.extend({
  favouritePizza: null,
  favouritePizzaId: Ember.computed.defaultTo('ham'),
  favouritePizzas: null,
  favouritePizzaIds: null,
  preselectedPizzaIds: ["ham", "pep", "tex"],
  chosenIngredients: null,

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
    }
  }
});

export default ExamplesController;