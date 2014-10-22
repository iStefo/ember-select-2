# ember-select-2
Ember.js Wrapper for the [jQuery Select2 Plugin](http://ivaynberg.github.io/select2/).

For Demo & Docs, see the [Github Page](https://istefo.github.io/ember-select-2/) for this project.

**Disclaimer:** This is a pretty early release and there may be major bugs. Still, there are [several test cases](http://istefo.github.io/ember-select-2/test/?module=Select2Component) using state-of-the art ember unit testing methods ;)

## Including Select2 in your Project
Since ember-cli 0.0.44 (or so...), there is a default way of installing addons. It's easy:

```sh
# install addon from npm repository
$ npm install ember-select-2 --save-dev
# install dependencies
$ ember g ember-select-2
```

## Contributing
I would love to see some support when extending or bugfixing this component! Since I am quiet new to maintaining open source software, feel free to contact me so we can organize this better.

### Generating the Docs
`ember-cli` compiles the project into the `/dist` folder, but Github Pages expects the content to be in the repository's root within the `gh-pages` branch. In order not to overwrite the original `/tests` directory, we rename the compiled tests to `test`.

Using the `github` environment will set the correct rootUrl and basePath settings.

```sh
ember build --environment github
mv dist/tests dist/test
cp -rf dist/* .
rm -rf dist
```

Pay attention that you perform this in the `gh-pages` branch after merging the changes from master because the commands will clutter the root with files from `/dist`.

**Important:** Make changes on `master`, then merge them onto `gh-pages` and run the steps above when documentation or tests changed.
