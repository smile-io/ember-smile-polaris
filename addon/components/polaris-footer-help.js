import Component from '@ember/component';
import { tagName, layout as templateLayout } from '@ember-decorators/component';
import layout from '../templates/components/polaris-footer-help';
import TaglessCssDeprecation from '../mixins/tagless-css-deprecation';

/**
 * Polaris footer help component.
 * See https://polaris.shopify.com/components/titles-and-text/footer-help
 */
@tagName('')
@templateLayout(layout)
export default class PolarisFooterHelp extends Component.extend(
  TaglessCssDeprecation
) {
  /**
   * The content to display inside the layout.
   *
   * This component can be used in block form,
   * in which case the block content will be used
   * instead of `text`
   *
   * @type {String}
   * @default null
   * @public
   */
  text = null;
}
