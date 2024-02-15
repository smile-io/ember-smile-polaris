import Component from '@ember/component';
import { computed } from '@ember/object';
import { guidFor } from '@ember/object/internals';
import { tagName, layout as templateLayout } from '@ember-decorators/component';
import layout from '../../templates/components/polaris-option-list/checkbox';
import deprecateClassArgument from '../../utils/deprecate-class-argument';

@deprecateClassArgument
@tagName('')
@templateLayout(layout)
export default class PolarisOptionListCheckbox extends Component {
  /**
   * @type {Boolean}
   * @default false
   * @public
   */
  checked = false;

  /**
   * @type {Boolean}
   * @default false
   * @public
   */
  disabled = false;

  /**
   * @type {Boolean}
   * @default false
   * @public
   */
  active = false;

  /**
   * @type {String}
   * @default null
   * @public
   */
  name = null;

  /**
   * @type {String}
   * @default null
   * @public
   */
  value = null;

  /**
   * @type {String}
   * @default null
   * @public
   */
  role = null;

  /**
   * @type {String}
   * @public
   */
  @computed
  get checkboxId() {
    if (this._checkboxId) {
      return this._checkboxId;
    }

    return guidFor(this);
  }

  set checkboxId(value) {
    this._checkboxId = value;
  }

  /**
   * @type {Function}
   * @default noop
   * @public
   */
  onChange() {}
}
