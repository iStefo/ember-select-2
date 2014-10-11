import Ember from "ember";

var LinkLiComponent = Ember.Component.extend({
  tagName: 'li',
  classNameBindings: ['active'],
  
  active: function() {
    return this.get('childViews').anyBy('active');
  }.property('childViews.@each.active')
});

export default LinkLiComponent;