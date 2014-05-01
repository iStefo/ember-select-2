var Router = Ember.Router.extend({
  location: 'auto'
});

Router.map(function() {
  this.route('examples');

  this.route('docs');
});

export default Router;
