import Ember from "ember";

var IndexController = Ember.ArrayController.extend({
  selectedItem: null,
  selectedItems: null,
  selectedItemId: "ho",
  selectedItemIds: ["bla", "foo", "ho"],

  actions: {
    changeModel: function() {
      this.pushObjects([{
        id: "ho",
        text: "Ho ho Item",
        description: "I was added asynchronous"
      }, {
        id: "hey",
        text: "Hey hey Item",
        description: "I was added asynchronous, too"
      }]);
    },

    selectItem: function(item) {
      this.set("selectedItem", item);
      this.set("selectedItemId", Ember.get(item, "id"));
    },

    setToNonexistingID: function() {
      this.set("selectedItemId", "nonexisting");
    }
  }
});

export default IndexController;