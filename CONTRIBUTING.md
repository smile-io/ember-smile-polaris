# How To Contribute

## Installation

* `git clone <repository-url>`
* `cd ember-smile-polaris`
* `yarn install`

## Linting

* `yarn lint:hbs`
* `yarn lint:js`
* `yarn lint:js --fix`

## Running tests

* `ember test` – Runs the test suite on the current Ember version
* `ember test --server` – Runs the test suite in "watch mode"
* `ember try:each` – Runs the test suite against multiple Ember versions

## Running the dummy application

* `ember serve`
* Visit the dummy application at [http://localhost:4200](http://localhost:4200).

For more information on using ember-cli, visit [https://ember-cli.com/](https://ember-cli.com/).

## Setting up upstream [`ember-polaris`](https://github.com/smile-io/ember-polaris) repo

```shell
# One-time only - add git remote
git remote add upstream --no-tags git@github.com:smile-io/ember-polaris.git
```
**NOTE:** Make sure you use `--no-tags` when adding upstream so that fetching from upstream does not pull in `ember-polaris`'s tags and overwrite this addon's own tags.
