import Modifier from 'ember-modifier';
import { registerDestructor } from '@ember/destroyable';
import { run } from '@ember/runloop';

export default class triggerUpdateOnTextChangeModifier extends Modifier {
  element = null;
  mutationObserver = null;
  onUpdate = () => {};

  constructor(owner, args) {
    super(owner, args);
    registerDestructor(this, cleanup);
  }

  modify(element, [onUpdate]) {
    // Save off the element the first time for convenience with setupMutationObserver
    if (this.element) {
      return;
    }

    this.element = element;
    this.onUpdate = onUpdate;

    this.triggerUpdate();
    this.setupMutationObserver();
  }

  setupMutationObserver() {
    this.mutationObserver = new MutationObserver(() => {
      this.triggerUpdate();
    });

    this.mutationObserver.observe(this.element, {
      subtree: true,
      childList: true,
      characterDataOldValue: true,
    });
  }

  triggerUpdate() {
    const newText = elementText(this.element);
    if (typeof newText !== 'undefined' && newText === this.previousText) {
      return;
    }

    this.previousText = newText;
    run(this, this.onUpdate, this.element, newText);
  }
}

function cleanup(instance) {
  if (instance.mutationObserver === null) {
    return;
  }

  instance.mutationObserver.disconnect();
  instance.mutationObserver = null;
}

function elementText(element) {
  return element.textContent.trim() || '';
}
