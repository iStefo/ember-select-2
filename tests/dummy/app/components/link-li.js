import Ember from "ember";

var LinkLiComponent = Ember.Component.extend({
  tagName: 'li',
  classNameBindings: ['active'],
  
  active: Ember.computed('childViews.@each.active', function() {
    return this.get('childViews').anyBy('active');
  })
});

export default LinkLiComponent;