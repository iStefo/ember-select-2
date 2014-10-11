import Ember from "ember";

var HighlightCodeComponent = Ember.Component.extend({
  tagName: "pre",

  languageClass: function() {
    return "language-" + this.get("lang");
  }.property("lang"),

  didInsertElement: function() {
    window.hljs.highlightBlock(this.$().get(0));
  }
});

export default HighlightCodeComponent;