import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    return {
      tags: this.get('store').find('tag'),
      post: this.get('store').find('post', 1),

      tagsSimple: Ember.A([
        Ember.Object.create({ name: "tag 1" }),
        Ember.Object.create({ name: "tag 2" }),
        Ember.Object.create({ name: "tag 3" }),
        Ember.Object.create({ name: "tag 4" })
      ]),

      postSimple: Ember.Object.create({
        tags: Ember.A([
          Ember.Object.create({ name: "tag 1" })
        ])
      })
    };
  }
});
