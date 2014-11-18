/* global require, module */

var EmberAddon = require('ember-cli/lib/broccoli/ember-addon');

var app = new EmberAddon();

// Use `app.import` to add additional libraries to the generated
// output files.
//
// If you need to use different assets in different
// environments, specify an object as the first parameter. That
// object's keys should be the environment name and the values
// should be the asset to use in that environment.
//
// If the library that you are including contains AMD or ES6
// modules that you would like to import into your application
// please specify an object with the list of modules as keys
// along with the exports of each module as its value.

// dependency for the highlight-code component
app.import('bower_components/highlightjs/highlight.pack.js');
app.import('bower_components/boxuk/index.css');

// load sinon for test spies
app.import('bower_components/sinon/index.js');

// this is just to override the default select2 css to look better with bootstrap
app.import('bower_components/bootstrap/dist/css/bootstrap.css');
app.import('bower_components/select2-bootstrap/select2-bootstrap.css');

module.exports = app.toTree();
