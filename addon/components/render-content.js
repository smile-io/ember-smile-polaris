import Component from '@ember/component';
import layout from '../templates/components/render-content';

export default Component.extend({
  tagName: '',

  layout,

  content: null,
}).reopenClass({
  positionalParams: ['content'],
});
