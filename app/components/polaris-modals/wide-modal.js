import BasePolarisModal from '@smile-io/ember-smile-core/components/polaris-modals/base';

export default class WideModal extends BasePolarisModal {
  // This property exists to allow the billing-subscription/view-offer to dynamically
  // force a non-wide modal based on some conditions. Generally it isn't needed, and
  // can be removed if we ever stop using it in that modal.
  overrideWideModal = false;

  init() {
    super.init(...arguments);

    if (!this.overrideWideModal) {
      document.querySelector('body').classList.add('wide-modal');
    }
  }

  willDestroyElement() {
    super.willDestroyElement(...arguments);

    if (!this.overrideWideModal) {
      document.querySelector('body').classList.remove('wide-modal');
    }
  }
}