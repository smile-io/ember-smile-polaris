import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action, computed } from '@ember/object';
import { handleMouseUpByBlurring } from '../utils/focus';
import deprecateClassArgument from '../utils/deprecate-class-argument';

/**
 * Polaris tag component.
 * See https://polaris.shopify.com/components/forms/tag
 *
 * @component polaris-tag
 */
@deprecateClassArgument
export default class PolarisTag extends Component {
  /**
   * The content to display inside the tag.
   *
   * This component can be used in block form,
   * in which case the block content will be used
   * instead of `text`
   *
   * @type {String}
   * @public
   */
  text;

  /**
   * Disables the tag.
   *
   * @type {boolean}
   * @public
   */
  disabled;

  /**
   * Callback when tag is removed
   *
   * @type {Function}
   * @public
   */
  onRemove;

  /**
   * The tag title. When inline-form, will match `text`, otherwise will read the
   * block for this.
   *
   * @type {String}
   */
  @tracked tagText;

  handleMouseUpByBlurring = handleMouseUpByBlurring;

  constructor() {
    super(...arguments);
    this.tagText = this.args.text ?? '';
  }
  /**
   * String to be used as the `remove` button's `aria-label`
   * Gets updated after rendering to always use the most up-to-date tag text
   *
   * @type {String}
   * @dyefault null
   */
  get buttonLabel() {
    return `Remove ${this.tagText}`;
  }

  @action
  setTagText(_element, text) {
    this.tagText = text;
  }
}
