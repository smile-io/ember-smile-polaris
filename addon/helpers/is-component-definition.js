import { helper } from '@ember/component/helper';
import runtime from '@glimmer/runtime';

let { isCurriedComponentDefinition, CurriedValue } = runtime;

// TODO look into getting rid of this concept
export function isComponentDefinition(content) {
  // Older embers have isCurriedComponentDefinition, new ones have CurriedValue
  // and instanceof CurriedValue seems good enough.
  // NOTE This is just copy/pasta from  @embroider/util
  // https://github.com/embroider-build/embroider/blob/main/packages/util/addon/ember-private-api.js#L21C1-L34C2
  if (!isCurriedComponentDefinition) {
    isCurriedComponentDefinition = function (content) {
      return content instanceof CurriedValue;
    };
  }
  return isCurriedComponentDefinition(content);
}

export default helper(([content]) => isComponentDefinition(content));
