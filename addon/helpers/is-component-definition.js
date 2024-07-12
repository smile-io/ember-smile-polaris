import { helper } from '@ember/component/helper';
import * as glimmerRuntime from '@glimmer/runtime';

/**
 * Checks if a value is a curried component definition.
 *
 * Example: value={{component ...}}
 */
const isCurriedComponentDefinition = function (value) {
  return value instanceof glimmerRuntime.CurriedValue;
};

const isComponentClass = function (value) {
  return (
    // If it's a Glimmer component class
    typeof value === 'function' ||
    // If it's a template-only component class
    value instanceof glimmerRuntime.TemplateOnlyComponent
  );
};

export function isComponent(value) {
  if (typeof value === 'string' || value == null) {
    return false;
  }

  if (isCurriedComponentDefinition(value)) {
    return true;
  }

  return isComponentClass(value);
}

export default helper(([content]) => isComponent(content));
