import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import Component from '@ember/component';
import { default as GlimmerComponent } from '@glimmer/component';

function createMockGlimmerComponentDefinition() {
  return {
    [Symbol('INNER')]: {
      name: 'mock-component',
      ComponentClass: {},
      template: {},
      manager: {},
      state: {},
    },
  };
}

module('Integration | Helper | is-component-definition', function (hooks) {
  setupRenderingTest(hooks);

  test('it works with string arguments', async function (assert) {
    await render(hbs`{{if (is-component-definition "something") "yes" "no"}}`);
    assert
      .dom(this.element)
      .hasText('no', 'return false when passed a plain string');
  });

  test('it works with classic Ember components', async function (assert) {
    this.owner.register(
      'component:custom-classic-component',
      Component.extend({}),
    );
    this.owner.register(
      'template:components/custom-classic-component',
      hbs`{{yiled}}`,
    );

    await render(
      hbs`{{if (is-component-definition (component "custom-classic-component")) "yes" "no"}}`,
    );
    assert
      .dom(this.element)
      .hasText('yes', 'return false when passed classic Ember component');
  });

  test('it works with Glimmer components', async function (assert) {
    this.owner.register(
      'component:custom-glimmer-component',
      class CustomGlimmerComponent extends GlimmerComponent {},
    );
    this.owner.register(
      'template:components/custom-glimmer-component',
      hbs`{{yiled}}`,
    );

    await render(
      hbs`{{if (is-component-definition (component "custom-glimmer-component")) "yes" "no"}}`,
    );
    assert
      .dom(this.element)
      .hasText('yes', 'return false when passed Glimmer Ember component');
  });

  test('it works with template-only components', async function (assert) {
    this.owner.register(
      'template:components/custom-template-only-component',
      hbs`{{yiled}}`,
    );

    await render(
      hbs`{{if (is-component-definition (component "custom-template-only-component")) "yes" "no"}}`,
    );
    assert
      .dom(this.element)
      .hasText('yes', 'return false when passed a template-only component');
  });
  // test('it detects component definitions correctly', async function (assert) {
  //   await render(hbs`{{if (is-component-definition "1234") "yes" "no"}}`);
  //   assert
  //     .dom(this.element)
  //     .hasText(
  //       'no',
  //       'returns false when passed something other than a component definition',
  //     );
  //
  //   await render(
  //     hbs`{{if (is-component-definition (component "polaris-heading" text="Text")) "yes" "no"}}`,
  //   );
  //   assert
  //     .dom(this.element)
  //     .hasText('yes', 'returns true when passed a component definition');
  //
  //   this.set(
  //     'glimmerComponentDefinition',
  //     createMockGlimmerComponentDefinition(),
  //   );
  //   await render(
  //     hbs`{{if (is-component-definition this.glimmerComponentDefinition) "yes" "no"}}`,
  //   );
  //   assert
  //     .dom(this.element)
  //     .hasText(
  //       'yes',
  //       'returns true when passed a Glimmer component definition',
  //     );
  // });
});
