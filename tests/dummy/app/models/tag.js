import DS from 'ember-data';

var Tag = DS.Model.extend({
  name: DS.attr('string')
});

Tag.reopenClass({
  FIXTURES: [
    { id: 1, name: "Ember" },
    { id: 2, name: "Javascript" },
    { id: 3, name: "Tan" },
    { id: 4, name: "Select2" },
    { id: 5, name: "Sexy"}
  ]
});

export default Tag;
