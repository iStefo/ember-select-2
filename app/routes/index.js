import Ember from "ember";

var MyModel = Ember.Object.extend({
  name: null,
  id: null,
  
  text: function() {
    return this.get("id") + ": " + this.get("name");
  }.property("name", "id"),

  description: function() {
    return new Ember.Handlebars.SafeString("Item ID: " + this.get("id") + ", item name <span style=\"color: green\">" + this.get("name") + "</span>");
  }.property("name", "id")
});

export default Ember.Route.extend({
  model: function() {
    return [{
      id: "bla",
      text: new Ember.Handlebars.SafeString("Bla bla <span style='color: red'>Item</span>"),
      description: "This is the bla bla item",
      value: [1,2,3]
    }, {
      id: "foo",
      text: "Foo foo Item",
      description: "This is the foo foo item",
      value: new Date()
    }, MyModel.create({id: 20, name: "Computed Text Item"})];
  }
});
