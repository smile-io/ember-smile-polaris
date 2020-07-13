import Component from '@ember/component';
import { tagName, layout as templateLayout } from '@ember-decorators/component';
import layout from '../templates/components/polaris-empty-search-result';

@tagName('')
@templateLayout(layout)
export default class PolarisEmptySearchResult extends Component {
  /**
   * @type {String}
   * @default null
   * @public
   */
  title = null;

  /**
   * @type {String|Component|Object}
   * @default null
   * @public
   */
  description = null;

  /**
   * @type {Boolean}
   * @default false
   * @public
   */
  withIllustration = false;

  /**
   * Use a custom empty search result illustration.
   * This is an addition to the Polaris spec
   *
   * @type {String}
   * @default null
   * @extends ember-polaris
   */
  illustrationSrc = null;
}
