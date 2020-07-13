import Component from '@ember/component';
import { computed } from '@ember/object';
import { notEmpty } from '@ember/object/computed';
import layout from '../templates/components/render-content';
import { isComponentDefinition } from '@smile-io/ember-smile-polaris/helpers/is-component-definition';

export default Component.extend({
  tagName: '',

  layout,

  content: null,

  contentIsComponentHash: notEmpty('content.componentName').readOnly(),

  contentIsComponentDefinition: computed('content', function() {
    return isComponentDefinition(this.content);
  }).readOnly(),
}).reopenClass({
  positionalParams: ['content'],
});
