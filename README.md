# ember-select-2
Ember.js Wrapper for the [jQuery Select2 Plugin](http://ivaynberg.github.io/select2/).

For Demo & Docs, see the [Github Page](https://istefo.github.io/ember-select-2/) for this project.

**Disclaimer:** This is a pretty early release, I have yet to integrate the component into my real-world projects. Still, there are [several test cases](http://istefo.github.io/ember-select-2/test/?module=Select2Component) using state-of-the art ember unit testing methods ;)

## Including Select2 in your Project
Packaging components for Ember.js is not a clearly solved task, so you may be better off simply copying the file from [`app/components/select-2.js`](https://github.com/iStefo/ember-select-2/blob/master/app/components/select-2.js). It will fit into every ember-cli or Ember App Kit project as-is.

## Generating the Docs
`ember-cli` compiles the project into the `/dist` folder, but Github Pages expects the content to be in the repository's root within the `gh-pages` branch. In order not to overwrite the original `/tests` directory, we rename the compiled tests to `test`.

Using the `github` environment will set the correct rootUrl and basePath settings.

```
ember-cli build --environment github
mv dist/tests dist/test
cp -rf dist/* .
rm -rf dist
```

Pay attention that you perform this in the `gh-pages` branch after merging the changes from master because the commands will clutter the root with files from `/dist`.

**Important:** Make changes on `master`, then merge them onto `gh-pages` and run the steps above when documentation or tests changed.
