import Resolver from 'ember/resolver';
import loadInitializers from 'ember/load-initializers';

Ember.MODEL_FACTORY_INJECTIONS = true;

var App = Ember.Application.extend({
  modulePrefix: 'select-2', // TODO: loaded via config
  Resolver: Resolver
});

loadInitializers(App, 'select-2');

export default App;
