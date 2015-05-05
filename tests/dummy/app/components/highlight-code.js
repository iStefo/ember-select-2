import Ember from "ember";

var HighlightCodeComponent = Ember.Component.extend({
  tagName: "pre",

  languageClass: Ember.computed('lang', function() {
    return "language-" + this.get("lang");
  }),

  didInsertElement: function() {
    window.hljs.highlightBlock(this.$().get(0));
  }
});

export default HighlightCodeComponent;