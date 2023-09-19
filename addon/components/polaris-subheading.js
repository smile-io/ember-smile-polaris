import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { deprecate } from '@ember/debug';
import deprecateClassArgument from '../utils/deprecate-class-argument';

/**
 * Polaris subheading component.
 * See https://polaris.shopify.com/components/titles-and-text/subheading
 *
 * Default inline usage:
 *
 *   {{polaris-subheading text="This is a subheading"}}
 *
 * Customised block usage (note the use of htmlTag instead of element - this is an ember thing):
 *
 *   {{#polaris-subheading htmlTag="u"}}
 *     This is an underlined subheading
 *   {{/polaris-subheading}}
 */
@deprecateClassArgument
export default class PolarisSubheading extends Component {
  /**
   * The content to display inside the heading
   *
   * This component can be used in block form,
   * in which case the block content will be used
   * instead of `text`
   *
   * @type {String}
   * @public
   */
  text;

  @tracked ariaLabel;

  constructor(owner, args) {
    super(owner, args);

    deprecate(
      `[PolarisSubheading] Passing 'tagName' argument is deprecated! Use '@htmlTag' instead`,
      !this.args.tagName,
      {
        id: 'polaris-subheading.tagName-arg',
        since: '6.2.2',
        until: '7.0.0',
        for: 'ember-polaris',
      },
    );
  }

  /**
   * We're updating `aria-label` directly as a HTML attribute because `ember-element-helper`
   * will throw an error if we try to update an attribute multiple times.
   */
  @action
  updateAriaLabel(element, text) {
    element.setAttribute('aria-label', text);
  }
}
