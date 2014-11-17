# ember-select-2 [![Build Status](http://img.shields.io/travis/iStefo/ember-select-2.svg?style=flat-square)](https://travis-ci.org/iStefo/ember-select-2) [![NPM Version](http://img.shields.io/npm/v/ember-select-2.svg?style=flat-square)](https://www.npmjs.org/package/ember-select-2) [![NPM Downlaads](http://img.shields.io/npm/dm/ember-select-2.svg?style=flat-square)](https://www.npmjs.org/package/ember-select-2)
Ember.js Wrapper for the [jQuery Select2 Plugin](http://ivaynberg.github.io/select2/). While not aiming for full API coverage at any cost, the actual focus is on providing a plugin that is easy to drop into an application and that plays nice with the ember specific classes. 

For Demo & Docs, see the [Github Page](https://istefo.github.io/ember-select-2/) for this project.

**Disclaimer:** This is a pretty early release and there may be major bugs. Still, there are [several test cases](http://istefo.github.io/ember-select-2/test/?nojshint=true) using state-of-the art ember unit testing methods ;)

## Including Select2 in your Project
Since ember-cli 0.0.44 (or so...), there is a default way of installing addons. It's easy:

```sh
# install addon from npm repository
$ npm install ember-select-2 --save-dev
# install dependencies
$ ember g ember-select-2
```

## Contributing
I would love to see some support when extending or bugfixing this component! Please keep in mind the agena on the top of this page and discuss possible conflicts with the ember-way of things (bindings, proxies...).

### Generating the Docs
After commiting changes in the examples or tests to master, you can run `./make_docs` which does several things:

* Checks out `gh-pages` and pulls changes from `master`
* Builds ember app with `github` environment
* Fixes things to make the tests work
* Commits the generated app and pushes it to github pages
* Switches back to original branch