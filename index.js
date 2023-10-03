'use strict';

module.exports = {
  name: require('./package').name,

  options: {
    svgJar: {
      inline: {
        // This overwrites default glocal `sourceDirs: []` since we don't want that.
        sourceDirs: [],
      },
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
