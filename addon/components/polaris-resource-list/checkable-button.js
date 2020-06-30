import Component from '@ember/component';
import { action, computed } from '@ember/object';
import { not, and } from '@ember/object/computed';
import { tagName, layout as templateLayout } from '@ember-decorators/component';
import layout from '../../templates/components/polaris-resource-list/checkable-button';

@tagName('')
@templateLayout(layout)
export default class CheckableButton extends Component {
  /**
   * @type {String}
   * @default null
   * @public
   */
  accessibilityLabel = null;

  /**
   * @type {String}
   * @default ''
   * @public
   */
  label = '';

  /**
   *
   * Checkbox is selected. `indeterminate` shows a horizontal line in the checkbox
   *
   * @type {Boolean|String}
   * @default null
   * @public
   */
  selected = null;

  /**
   * @type {Boolean}
   * @default false
   * @public
   */
  selectMode = false;

  /**
   * @type {Boolean}
   * @default false
   * @public
   */
  plain = false;

  /**
   * @type {Boolean}
   * @default false
   * @public
   */
  measuring = false;

  /**
   * @type {Boolean}
   * @default false
   * @public
   */
  disabled = false;

  /**
   * @type {Function}
   * @default noop
   * @public
   */
  onToggleAll() {}

  @not('plain')
  isNotPlain;

  @and('isNotPlain', 'selectMode')
  shouldApplySelectModeClass;

  @and('isNotPlain', 'selected')
  shouldApplySelectedClass;

  @and('isNotPlain', 'measuring')
  shouldApplyMeasuringClass;

  @computed(
    'plain',
    'shouldApplySelectModeClass',
    'shouldApplySelectedClass',
    'shouldApplyMeasuringClass'
  )
  get classes() {
    let classes = ['Polaris-ResourceList-CheckableButton'];
    if (this.plain) {
      classes.push(
        'Polaris-ResourceList-CheckableButton__CheckableButton--plain'
      );
    }
    if (this.shouldApplySelectModeClass) {
      classes.push(
        'Polaris-ResourceList-CheckableButton__CheckableButton--selectMode'
      );
    }
    if (this.shouldApplySelectedClass) {
      classes.push(
        'Polaris-ResourceList-CheckableButton__CheckableButton--selected'
      );
    }
    if (this.shouldApplyMeasuringClass) {
      classes.push(
        'Polaris-ResourceList-CheckableButton__CheckableButton--measuring'
      );
    }

    return classes.join(' ');
  }

  @action
  toggleAll(event) {
    event.stopPropagation();
    this.onToggleAll();
  }
}
