'use strict';

module.exports = {
  name: require('./package').name,

  options: {
    svgJar: {
      sourceDirs: [
        'public',
        'tests/dummy/public/assets/images/svg',
        'node_modules/@smile-io/ember-smile-polaris/public',
      ],
    },
    'ember-composable-helpers': {
      only: ['includes'],
    },
  },

  included: function (/* app */) {
    this._super.included.apply(this, arguments);
  },

  isDevelopingAddon() {
    return process.env.SMILE_DEV;
  },
};
