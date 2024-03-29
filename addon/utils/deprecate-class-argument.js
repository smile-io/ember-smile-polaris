import { DEBUG } from '@glimmer/env';
import { deprecate } from '@ember/debug';
import { dasherize } from '@ember/string';

export default function deprecateClassArgument(target) {
  if (DEBUG) {
    const wrapperClass = class extends target {
      init() {
        const componentName = target.name;

        deprecate(
          `[${componentName}] Passing 'class' argument is deprecated! Switch to angle bracket invocation and pass an HTML attribute instead`,
          !this.class,
          {
            id: `ember-polaris.${dasherize(componentName)}.class-arg`,
            since: '6.2.2',
            until: '7.0.0',
            for: 'ember-polaris',
          },
        );

        return super.init(...arguments);
      }
    };

    return wrapperClass;
  }
}
