import Component from '@ember/component';
import { or } from '@ember/object/computed';
import layout from '../templates/components/polaris-page';

/**
 * Polaris page component.
 * See https://polaris.shopify.com/components/structure/page
 */
export default Component.extend({
  classNames: ['Polaris-Page'],
  classNameBindings: [
    'fullWidth:Polaris-Page--fullWidth',
    'singleColumn:Polaris-Page--singleColumn',
  ],

  layout,

  /**
   * Page title, in large type
   *
   * @property title
   * @public
   * @type {String}
   * @default null
   */
  title: null,

  /**
   * Important and non-interactive status information shown immediately after the title
   *
   * @property titleMetadata
   * @public
   * @type {String|Component}
   * @default null
   */
  titleMetadata: null,

  /**
   * Visually hide the title
   *
   * @property titleHidden
   * @public
   * @type {Boolean}
   * @default false
   */
  titleHidden: false,

  /**
   * App icon, for pages that are part of Shopify apps
   *
   * @property icon
   * @public
   * @type {String}
   * @default null
   * TODO: not implemented yet.
   */
  icon: null,

  /**
   * Collection of breadcrumbs
   *
   * @property breadcrumbs
   * @public
   * @type {Array}
   * @default null
   */
  breadcrumbs: null,

  /**
   * The contents of the page
   *
   * This component can be used in block form,
   * in which case the block content will be used
   * instead of `text`
   *
   * @property text
   * @public
   * @type {String}
   * @default null
   */
  text: null,

  /**
   * Remove the normal max-width on the page
   *
   * @property fullWidth
   * @public
   * @type {Boolean}
   * @default false
   */
  fullWidth: false,

  /**
   * Decreases the maximum layout width. Intended for single-column layouts
   *
   * @property singleColumn
   * @public
   * @type {Boolean}
   * @default false
   */
  singleColumn: false,

  /**
   * Adds a border to the bottom of the page header
   *
   * @property separator
   * @public
   * @type {Boolean}
   * @default false
   */
  separator: false,

  /**
   * Collection of secondary page-level actions
   *
   * @property secondaryActions
   * @public
   * @type {Array}
   * @default null
   */
  secondaryActions: null,

  /**
   * Collection of page-level groups of secondary actions
   *
   * Properties:
   *
   * @property {String} title Action group title
   * @property {String} icon Icon to display
   * @property {Object[]} actions List of actions
   * @property {String|Component|Object} details Action details
   * @property {Function} onActionAnyItem Callback when any action takes place
   *
   * @property actionGroups
   * @public
   * @type {Object[]}
   * @default null
   */
  actionGroups: null,

  /**
   * Primary page-level action
   *
   * @property primaryAction
   * @public
   * @type {Object}
   * @default null
   */
  primaryAction: null,

  /**
   * Page-level pagination
   *
   * @property pagination
   * @public
   * @type {PaginationDescriptor}
   * @default null
   * TODO: not implemented yet
   */
  pagination: null,

  /**
   * Optional component to be rendered before the title text.
   *
   * @property beforeTitleComponent
   * @type {String|Component|Object}
   * @default null
   */
  beforeTitleComponent: null,

  /**
   * Computed properties.
   */
  hasHeaderContent: or(
    'title',
    'primaryAction',
    'secondaryActions',
    'breadcrumbs'
  ).readOnly(),
});
