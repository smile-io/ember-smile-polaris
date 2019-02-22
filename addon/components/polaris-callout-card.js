import Component from '@ember/component';
import { computed } from '@ember/object';
import layout from '../templates/components/polaris-callout-card';

const illustrationSizeClasses = {
  large: 'illustration-large',
};

/**
 * Polaris callout card component.
 * See https://polaris.shopify.com/components/structure/callout-card
 */
export default Component.extend({
  classNames: ['Polaris-Card'],
  classNameBindings: ['illustrationSizeClass'],

  layout,

  /**
   * The content to display inside the callout card.
   *
   * This component can be used in block form,
   * in which case the block content will be used
   * instead of `text`
   *
   * @property text
   * @type {String}
   * @default null
   */
  text: null,

  /**
   * The title of the card
   *
   * @property title
   * @type {String}
   * @default null
   */
  title: null,

  /**
   * URL to the card illustration
   *
   * @property illustration
   * @type {String}
   * @default null
   */
  illustration: null,

  /**
   * Primary action for the card
   *
   * @property primaryAction
   * @type {Object}
   * @default null
   */
  primaryAction: null,

  /**
   * Secondary action for the card
   *
   * @property secondaryAction
   * @type {Object}
   * @default null
   */
  secondaryAction: null,

  /**
   * Allows overriding the illustration size.
   * This is an addition to the Polaris spec.
   *
   * @property illustrationSize
   * @type {String}
   * @default null
   */
  illustrationSize: null,

  /**
   * Class name to apply illustration size override.
   *
   * @property illustrationSizeClass
   * @type {String}
   */
  illustrationSizeClass: computed('illustrationSize', function() {
    return illustrationSizeClasses[this.get('illustrationSize')] || null;
  }).readOnly(),
});
