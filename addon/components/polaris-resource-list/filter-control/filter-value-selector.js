import Component from '@ember/component';
import { action, get, computed } from '@ember/object';
import { tagName, layout as templateLayout } from '@ember-decorators/component';
import layout from '../../../templates/components/polaris-resource-list/filter-control/filter-value-selector';

export const FilterType = {
  Select: 'select',
  TextField: 'text_field',
  DateSelector: 'date_selector',
};

@tagName('')
@templateLayout(layout)
export default class PolarisResourceListFilterControlFilterValueSelector extends Component {
  /**
   * @type {Object}
   * @default null
   * @public
   */
  filter = null;

  /**
   * @type {String}
   * @default null
   * @public
   */
  filterKey = null;

  /**
   * @type {String}
   * @default null
   * @public
   */
  value = null;

  /**
   * @type {Function}
   * @default noop
   * @public
   */
  onChange() {}

  /**
   * @type {Function}
   * @default noop
   * @public
   */
  onFilterKeyChange() {}

  FilterType = FilterType;

  @(computed('filter.{type,operatorText}').readOnly())
  get showOperatorOptions() {
    let { filter } = this;
    let type = get(filter, 'type');
    let operatorText = get(filter, 'operatorText');

    return (
      type !== FilterType.DateSelector &&
      operatorText &&
      typeof operatorText !== 'string'
    );
  }

  @computed('filter.operatorText')
  get operatorOptions() {
    const { operatorText } = this.filter;
    if (!operatorText || typeof operatorText === 'string') {
      return [];
    }

    return operatorText.map(({ key, optionLabel }) => {
      return { value: key, label: optionLabel };
    });
  }

  @(computed('filter.operatorText').readOnly())
  get selectedFilterLabel() {
    let operatorText = this.filter.operatorText;
    return typeof operatorText === 'string' ? operatorText : '';
  }

  @action
  handleOperatorOptionChange(operatorKey) {
    let { value, onChange, onFilterKeyChange } = this;

    onFilterKeyChange(operatorKey);

    if (!value) {
      return;
    }

    onChange(value);
  }

  @action
  insertFilterValueSelector() {
    let {
      filter: { type, operatorText },
    } = this;

    if (
      type === FilterType.DateSelector ||
      !operatorText ||
      typeof operatorText === 'string' ||
      operatorText.length === 0
    ) {
      return;
    }

    this.handleOperatorOptionChange(operatorText[0].key);
  }
}
