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
    if (!this.element) {
      this.element = element;
      this.onUpdate = onUpdate;
    }

    this.setupMutationObserver();
  }

  setupMutationObserver() {
    this.mutationObserver = new MutationObserver(() => {
      const newText = elementText(this.element);
      if (newText === this.previousText) {
        return;
      }

      run(this, this.triggerUpdate, newText);
    });

    this.mutationObserver.observe(this.element, {
      subtree: true,
      childList: true,
      characterDataOldValue: true,
    });
  }

  triggerUpdate(text) {
    this.previousText = text;
    this.onUpdate(text);
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
