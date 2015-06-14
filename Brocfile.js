/* jshint node: true */
/* global require, module */

var EmberAddon = require('ember-cli/lib/broccoli/ember-addon');

/*
  This Brocfile specifes the options for the dummy test app of this
  addon, located in `/tests/dummy`

  This Brocfile does *not* influence how the addon or the app using it
  behave. You most likely want to be modifying `./index.js` or app's Brocfile
*/

var app = new EmberAddon();

// dependency for the highlight-code component
app.import('bower_components/highlightjs/highlight.pack.js');
app.import('bower_components/boxuk/index.css');

// load sinon for test spies
app.import('bower_components/sinon/index.js');

// this is just to override the default select2 css to look better with bootstrap
app.import('bower_components/bootstrap/dist/css/bootstrap.css');
app.import('bower_components/select2-bootstrap/select2-bootstrap.css');

module.exports = app.toTree();
