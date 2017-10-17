import Route from '@ember/routing/route';

export default Route.extend({
  setupController(controller) {
    this._super(...arguments);

    controller.set('color', {
      hue: 0,
      saturation: 0,
      brightness: 0,
      alpha: 1,
    });
  }
});
