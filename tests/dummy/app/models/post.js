import DS from 'ember-data';

var Post = DS.Model.extend({
  title: DS.attr('string'),
  body: DS.attr('string'),

  tags: DS.hasMany('tag', { async: true })
});

Post.reopenClass({
  FIXTURES: [
    { id: 1, title: "My first post", body: "Body of the first post", tags: [1, 3] }
  ]
});

export default Post;
