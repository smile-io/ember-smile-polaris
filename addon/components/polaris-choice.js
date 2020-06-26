import Component from '@ember/component';
import { computed } from '@ember/object';
import { or } from '@ember/object/computed';
import { tagName, layout } from '@ember-decorators/component';
import template from '../templates/components/polaris-choice';

/**
 * Polaris choice component.
 * Wrapper for checkbox and radiobutton components.
 */
@tagName('')
@layout(template)
export default class PolarisChoice extends Component {
  /**
   * A unique identifier for the choice
   *
   * @type {String}
   * @default: null
   * @public
   */
  inputId = null;

  /**
   * Label for the choice
   *
   * @type {String|Component}
   * @default: null
   * @public
   */
  label = null;

  /**
   * Whether the associated form control is disabled
   *
   * @type {Boolean}
   * @default: null
   * @public
   */
  disabled = null;

  /**
   * Display an error message
   *
   * @type {String|Boolean}
   * @default: null
   * @public
   */
  error = null;

  /**
   * Visually hide the label
   *
   * @type {boolean}
   * @default: false
   * @public
   */
  labelHidden = false;

  /**
   * Additional text to aide in use
   *
   * @type {String|Component|Object}
   * @default: null
   * @public
   */
  helpText = null;

  /**
   * Allow overriding the width of the choice component that is rendered
   * in front of the choice label. This supports using custom components
   * instead of just radio buttons and checkboxes. Alternatively we allow
   * passing a `choiceClass` directly if more specific styling of the choice
   * control is needed.
   *
   * @type {Boolean}
   * @default false
   * @public
   * @extends ember-polaris
   */
  customWidth = false;

  @or('error', 'helpText')
  hasDescription;

  /**
   * Overrideable class to apply to the choice control if specific styling is needed.
   *
   * @type {String}
   * @public
   * @extends ember-polaris
   */
  @computed('customWidth')
  get choiceClass() {
    if (!this.customWidth) {
      return null;
    }

    return 'custom-width';
  }

  @computed('error')
  get shouldRenderError() {
    let { error } = this;
    return error && typeof error !== 'boolean';
  }

  @computed('inputId')
  get helpTextId() {
    return `${this.inputId}HelpText`;
  }
}
