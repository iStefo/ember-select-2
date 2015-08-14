/* global require, module */
var EmberApp = require('ember-cli/lib/broccoli/ember-addon');

module.exports = function(defaults) {
  var app = new EmberApp(defaults, {
    // Add options here
  });

  /*
    This build file specifes the options for the dummy test app of this
    addon, located in `/tests/dummy`
    This build file does *not* influence how the addon or the app using it
    behave. You most likely want to be modifying `./index.js` or app's build file
  */

  // dependency for the highlight-code component
  app.import('bower_components/highlightjs/highlight.pack.js');
  app.import('bower_components/boxuk/index.css');

  // this is just to override the default select2 css to look better with bootstrap
  app.import('bower_components/bootstrap/dist/css/bootstrap.css');
  app.import('bower_components/select2-bootstrap/select2-bootstrap.css');

  return app.toTree();
};
