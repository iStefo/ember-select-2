# DEPRECATION NOTICE
For several reasons, mainly the lack of time for maintaining this project but also the difficulties of integrating a complex jQuery plugin into the Ember environment with all its implications, this addon should be avoided when starting new Ember applications.
Please consider using https://github.com/cibernox/ember-power-select or an alternative select component instead.

This addon will stay available for download and I will accept contributions from the community, but please don't expect major releases or active contributions from my side.
-- Stefan

# ember-select-2 [![Build Status](http://img.shields.io/travis/iStefo/ember-select-2.svg?style=flat-square)](https://travis-ci.org/iStefo/ember-select-2) [![NPM Version](http://img.shields.io/npm/v/ember-select-2.svg?style=flat-square)](https://www.npmjs.org/package/ember-select-2) [![NPM Downlaads](http://img.shields.io/npm/dm/ember-select-2.svg?style=flat-square)](https://www.npmjs.org/package/ember-select-2)
Ember.js Wrapper for the [jQuery Select2 Plugin](http://ivaynberg.github.io/select2/). While not aiming for full API coverage at any cost, the actual focus is on providing a plugin that is easy to drop into an application and that plays nice with the ember specific classes. 

For Demo & Docs, see the [Github Page](https://istefo.github.io/ember-select-2/) for this project.

## Including Select2 in your Project
Since ember-cli 0.2.3 `ember install <addon-name>` now is the correct way to install an add-on.
```
ember install ember-select-2
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
