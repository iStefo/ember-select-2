import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    return {
      tags: this.get('store').find('tag'),
      post: this.get('store').find('post', 1)
    };
  }
});
