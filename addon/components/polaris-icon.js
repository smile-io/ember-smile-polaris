import Component from '@ember/component';
import { computed } from '@ember/object';
import { equal } from '@ember/object/computed';
import { classify } from '@ember/string';
import { tagName, layout as templateLayout } from '@ember-decorators/component';
import layout from '../templates/components/polaris-icon';
import SvgHandling from '../mixins/components/svg-handling';
import TaglessCssDeprecation from '../mixins/tagless-css-deprecation';

// TODO: look into importing icons properly.
@tagName('')
@templateLayout(layout)
export default class PolarisIcon extends Component.extend(
  SvgHandling,
  TaglessCssDeprecation
) {
  /**
   * The SVG contents to display in the icon
   * If the source doesn't have a slash in the name, it will look for Polaris
   * icons in the namespace specified by `sourcePath` property.
   *
   * @type {String}
   * @default null
   * @public
   */
  source = null;

  /**
   * Sets the color for the SVG fill
   *
   * @type {String}
   * @default null
   * @public
   */
  color = null;

  /**
   * Show a backdrop behind the icon
   *
   * @type {Boolean}
   * @default false
   * @public
   */
  backdrop = false;

  /**
   * Descriptive text to be read to screenreaders
   *
   * @type {String}
   * @default null
   * @public
   */
  accessibilityLabel = null;

  /**
   * Path under which `ember-svg-jar` serves the Polaris SVG icons
   *
   * @type {String}
   * @default 'polaris'
   * @public
   */
  sourcePath = 'polaris';

  /**
   * Whether the component should leave space for an icon
   *
   * @type {Boolean}
   */
  @equal('source', 'placeholder')
  showPlaceholder;

  /**
   * Shopify removes all SVG fills from icons. In order to use this component
   * for our icons too, we need to be able to keep their fills.
   * This won't remove fills for anything other than Polaris icons by default,
   * but passing `keepFills=false` will remove them for non-Polaris icons too.
   *
   * @type {Boolean}
   * @public
   * @extends emmber-polaris
   */
  @computed('sourcePath', 'source')
  get keepFills() {
    // If not Polaris icons, keep fills by default
    if (this.sourcePath !== 'polaris') {
      return true;
    }

    let { source } = this;
    // If source does not have a slash OR has a slash and contains `polaris`, remove fills
    if (source.indexOf('/') === -1 || source.indexOf('polaris/') !== -1) {
      return false;
    }

    // Else, it's clearly not a Polaris icon, so keep them
    return true;
  }

  /**
   * Whether a color has been specified for the icon
   *
   * @type {Boolean}
   */
  @computed('color')
  get isColored() {
    return this.color && this.color !== 'white';
  }

  /**
   * Final source for the icon SVG
   *
   * @type {String}
   */
  @computed('sourcePath', 'source')
  get iconSource() {
    let { source } = this;
    return source.indexOf('/') === -1 ? `${this.sourcePath}/${source}` : source;
  }

  @computed('color', 'isColored', 'backdrop', 'class')
  get cssClasses() {
    let cssClasses = ['Polaris-Icon'];
    if (this.color) {
      cssClasses.push(`Polaris-Icon--color${classify(this.color)}`);
    }
    if (this.isColored) {
      cssClasses.push('Polaris-Icon--isColored');
    }
    if (this.backdrop) {
      cssClasses.push('Polaris-Icon--hasBackdrop');
    }
    if (this.class) {
      cssClasses.push(this.class);
    }

    return cssClasses.join(' ');
  }

  removeSvgFills() {
    // Don't remove SVG fills for this icon unless instructed to.
    if (this.keepFills) {
      return;
    }

    super.removeSvgFills(...arguments);
  }
}
