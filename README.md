# ember-select-2
Ember.js Wrapper for the [jQuery Select2 Plugin](http://ivaynberg.github.io/select2/).

For Demo & Docs, see the [Github Page](https://istefo.github.io/ember-select-2/) for this project.

## Including Select2 in your Project
Packaging components for Ember.js is not a clearly solved task, so you may be better off simply copying the file from [`app/components/select-2.js`](https://github.com/iStefo/ember-select-2/blob/master/app/components/select-2.js). It will fit into every ember-cli or Ember App Kit project as-is.

## Generating the Docs
`ember-cli` compiles the project into the `/dist` folder, but Github Pages expects the content to be in the repository's root within the `gh-pages` branch.

Using the `github` environment will set the correct rootUrl and basePath settings.

```
ember-cli build --environment github
cp -rf dist/* .
rm -rf dist
```

Pay attention that you perform this in the `gh-pages` branch after merging the changes from master. The command will overwrite the tests directory and clutter the root with files from `/dist`.