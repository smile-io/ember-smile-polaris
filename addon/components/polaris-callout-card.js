import Component from '@ember/component';
import { computed } from '@ember/object';
import { tagName, layout } from '@ember-decorators/component';
import template from '../templates/components/polaris-callout-card';

const illustrationSizeClasses = {
  large: 'illustration-large',
};

/**
 * Polaris callout card component.
 * See https://polaris.shopify.com/components/structure/callout-card
 */
@tagName('')
@layout(template)
export default class PolarisCalloutCard extends Component {
  /**
   * The content to display inside the callout card.
   *
   * This component can be used in block form,
   * in which case the block content will be used
   * instead of `text`
   *
   * @type {String}
   * @default null
   */
  text = null;

  /**
   * The title of the card
   *
   * @type {String}
   * @default null
   */
  title = null;

  /**
   * URL to the card illustration
   *
   * @type {String}
   * @default null
   */
  illustration = null;

  /**
   * Primary action for the card
   *
   * @type {Object}
   * @default null
   */
  primaryAction = null;

  /**
   * Secondary action for the card
   *
   * @type {Object}
   * @default null
   */
  secondaryAction = null;

  /**
   * Allows overriding the illustration size
   * This is an addition to the Polaris spec
   *
   * @property illustrationSize
   * @type {String}
   * @default null
   * @extends ember-polaris
   */
  illustrationSize = null;

  /**
   * Callback when banner is dismissed
   *
   * @type {Function}
   * @default null
   */
  onDismiss = null;

  /**
   * Class name to apply illustration size override.
   *
   * @property illustrationSizeClass
   * @type {String}
   * @extends ember-polaris
   */
  @computed('illustrationSize')
  get illustrationSizeClasses() {
    return illustrationSizeClasses[this.illustrationSize] || null;
  }
}
