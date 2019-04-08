import Component from '@ember/component';
import { computed } from '@ember/object';
import { readOnly } from '@ember/object/computed';
import { classify } from '@ember/string';
import layout from '../../templates/components/polaris-drop-zone/file-upload';

const iconDragDrop = 'drag-drop';
const fileUpload = '/@smile-io/ember-smile-polaris/images/file-upload.svg';
const imageUpload = '/@smile-io/ember-smile-polaris/images/image-upload.svg';

const fileUploadStrings = {
  actionTitleFile: 'Add file',
  actionTitleImage: 'Add image',
  actionHintFile: 'or drop files to upload',
  actionHintImage: 'or drop images to upload',
};

export default Component.extend({
  classNames: ['Polaris-DropZone-FileUpload'],

  layout,

  /**
   * String that appears in file upload
   *
   * @type {String}
   * @default `Add file`
   * @public
   * @property actionTitle
   */
  actionTitle: computed('type', function() {
    let type = this.get('type');
    return fileUploadStrings[`actionTitle${classify(type)}`];
  }),

  /**
   * String that appears in file upload
   *
   * @type {String}
   * @default `or drop files to upload`
   * @public
   * @property actionHint
   */
  actionHint: computed('type', function() {
    let type = this.get('type');
    return fileUploadStrings[`actionHint${classify(type)}`];
  }),

  iconDragDrop,

  fileUpload,

  imageUpload,

  type: readOnly('context.type'),

  size: readOnly('context.size'),

  imageClasses: computed('size', function() {
    let classes = ['Polaris-DropZone-FileUpload__Image'];
    let size = this.get('size');
    if (['extraLarge', 'large'].includes(size)) {
      classes.push(`Polaris-DropZone-FileUpload--size${classify(size)}`);
    }

    return classes.join(' ');
  }).readOnly(),
});
