import { hbs } from 'ember-cli-htmlbars';
import { module, test, skip } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click, find, triggerEvent } from '@ember/test-helpers';
import Component from '@glimmer/component';
import { setComponentTemplate } from '@ember/component';
import BulkActionsComponent from '@smile-io/ember-smile-polaris/components/polaris-resource-list/bulk-actions';
import SelectComponent from '@smile-io/ember-smile-polaris/components/polaris-select';
import { setUpAttributeCaptureOnComponent } from '../../helpers/component-attribute-capture';

const itemsNoID = [{ url: 'item 1' }, { url: 'item 2' }];
const singleItemNoID = [{ url: 'item 1' }];
const singleItemWithID = [{ id: '1', url: 'item 1' }];

const itemsWithID = [
  { id: '5', name: 'item 1', url: 'www.test.com', title: 'title 1' },
  { id: '6', name: 'item 2', url: 'www.test.com', title: 'title 2' },
  { id: '7', name: 'item 3', url: 'www.test.com', title: 'title 3' },
];
const promotedBulkActions = [
  { content: 'action', onAction() {} },
  { content: 'action 2', onAction() {} },
];
const bulkActions = [
  { content: 'action 3', onAction() {} },
  { content: 'action 4', onAction() {} },
];
const sortOptions = [
  'Product title (A-Z)',
  {
    value: 'PRODUCT_TITLE_DESC',
    label: 'Product title (Z-A)',
  },
  {
    value: 'EXTRA',
    label: 'Disabled Option',
    disabled: true,
  },
];

function idForItem(item) {
  return JSON.stringify(item);
}

module('Integration | Component | polaris-resource-list', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function () {
    this.setProperties({
      itemsNoID,
      singleItemNoID,
      singleItemWithID,
      itemsWithID,
      promotedBulkActions,
      bulkActions,
      sortOptions,
      idForItem,
    });

    class ShallowItemComponent extends Component {}
    setComponentTemplate(hbs`{{@item}}`, ShallowItemComponent);
    this.shallowItemComponent = ShallowItemComponent;

    class CustomMarkupComponent extends Component {}
    setComponentTemplate(hbs`<p>{{@item.title}}</p>`, CustomMarkupComponent);
    this.customMarkupComponent = CustomMarkupComponent;

    class ItemComponent extends Component {
      get accessibilityLabel() {
        return `View details for ${this.args.item.title}`;
      }
    }
    setComponentTemplate(
      hbs`
      <PolarisResourceList::Item
        @context={{@context}}
        @url={{@item.url}}
        @accessibilityLabel={{this.accessibilityLabel}}
        @itemId={{@itemId}}
      >
        <div>Item {{@itemId}}</div>
        <div>{{@item.title}}</div>
      </PolarisResourceList::Item>
    `,
      ItemComponent,
    );
    this.itemComponent = ItemComponent;
  });

  module('itemComponent', function () {
    test('renders list items', async function (assert) {
      await render(hbs`
        {{polaris-resource-list
          items=itemsWithID
          itemComponent=this.shallowItemComponent
        }}
      `);
      assert.dom('li').exists({ count: 3 });
    });

    test('renders custom markup', async function (assert) {
      await render(hbs`
        {{polaris-resource-list
          items=itemsWithID
          itemComponent=this.customMarkupComponent
        }}
      `);
      assert.dom('li:first-of-type > p').hasText('title 1');
    });
  });

  module('Selectable', function () {
    test('does not render bulk actions if the promotedBulkActions and the bulkActions props are not provided', async function (assert) {
      await render(hbs`
        {{polaris-resource-list items=itemsWithID itemComponent=this.itemComponent}}
      `);
      assert.dom('[data-test-bulk-actions]').doesNotExist();
    });

    test('does render bulk actions if the promotedBulkActions prop is provided', async function (assert) {
      await render(hbs`
        {{polaris-resource-list
          items=itemsWithID
          itemComponent=this.itemComponent
          promotedBulkActions=promotedBulkActions
        }}
      `);
      assert.dom('[data-test-bulk-actions]').exists();
    });

    test('renders bulk actions if the bulkActions prop is provided', async function (assert) {
      await render(hbs`
        {{polaris-resource-list
          items=itemsWithID
          itemComponent=this.itemComponent
          bulkActions=bulkActions
        }}
      `);
      assert.dom('[data-test-bulk-actions]').exists();
    });
  });

  module(
    'hasMoreItems',
    {
      beforeEach() {
        setUpAttributeCaptureOnComponent(
          this,
          'polaris-resource-list/bulk-actions',
          BulkActionsComponent,
          'paginatedSelectAllAction',
        );
      },
    },
    function () {
      test('does not add a prop of paginatedSelectAllAction to BulkActions if omitted', async function (assert) {
        await render(hbs`
        {{polaris-resource-list
          items=itemsNoID
          itemComponent=this.itemComponent
          bulkActions=bulkActions
        }}
      `);
        assert.notOk(this.get('paginatedSelectAllAction'));
      });

      test('adds a prop of paginatedSelectAllAction to BulkActions if included', async function (assert) {
        await render(hbs`
        {{polaris-resource-list
          items=itemsNoID
          hasMoreItems=true
          itemComponent=this.itemComponent
          bulkActions=bulkActions
        }}
      `);
        assert.ok(this.get('paginatedSelectAllAction'));
      });
    },
  );

  module('resourceName', function () {
    module('resoureName.singular', function () {
      test('renders default singular resource name when resourceName isn’t provided', async function (assert) {
        await render(hbs`
          {{polaris-resource-list
            showHeader=true
            items=singleItemNoID
            itemComponent=this.itemComponent
          }}
        `);
        assert
          .dom('[data-test-id="header-title-wrapper"]')
          .hasText('Showing 1 item');
      });

      test('renders the given singular resource name when resourceName is provided', async function (assert) {
        await render(hbs`
          {{polaris-resource-list
            items=singleItemNoID
            itemComponent=this.itemComponent
            resourceName=(hash singular="product" plural="products")
            showHeader=true
          }}
        `);
        assert
          .dom('[data-test-id="header-title-wrapper"]')
          .hasText('Showing 1 product');
      });
    });

    module('resoureName.plural', function () {
      test('renders default plural resource name when resourceName isn’t provided', async function (assert) {
        await render(hbs`
          {{polaris-resource-list items=itemsNoID itemComponent=this.itemComponent showHeader=true}}
        `);
        assert
          .dom('[data-test-id="header-title-wrapper"]')
          .hasText('Showing 2 items');
      });

      test('renders the given plural resource name when resourceName is provided', async function (assert) {
        await render(hbs`
          {{polaris-resource-list
            items=itemsNoID
            itemComponent=this.itemComponent
            resourceName=(hash singular="product" plural="products")
            showHeader=true
          }}
        `);
        assert
          .dom('[data-test-id="header-title-wrapper"]')
          .hasText('Showing 2 products');
      });
    });
  });

  module('headerTitle', function () {
    test('prints loading text when loading is true', async function (assert) {
      await render(hbs`
        {{polaris-resource-list
          items=singleItemWithID
          itemComponent=this.itemComponent
          bulkActions=bulkActions
          loading=true
        }}
      `);

      assert
        .dom('[data-test-id="header-title-wrapper"]')
        .hasText('Loading items');
    });
  });

  module(
    'bulkActionsAccessibilityLabel',
    {
      beforeEach() {
        setUpAttributeCaptureOnComponent(
          this,
          'polaris-resource-list/bulk-actions',
          BulkActionsComponent,
          'accessibilityLabel',
        );
      },
    },
    function () {
      test('provides the BulkActions with the right accessibilityLabel if there’s 1 item and it isn’t selected', async function (assert) {
        await render(hbs`
        {{polaris-resource-list
          items=singleItemWithID
          itemComponent=this.itemComponent
          bulkActions=bulkActions
        }}
      `);
        assert.strictEqual(this.get('accessibilityLabel'), 'Select item');
      });

      test('provides the BulkActions with the right accessibilityLabel if there’s 1 item and it is selected ', async function (assert) {
        await render(hbs`
        {{polaris-resource-list
          items=singleItemWithID
          itemComponent=this.itemComponent
          bulkActions=bulkActions
          selectedItems=(array "1")
        }}
      `);
        assert.strictEqual(this.get('accessibilityLabel'), 'Deselect item');
      });

      test('provides the BulkActions with the right accessibilityLabel if there are multiple items and they are selected', async function (assert) {
        await render(hbs`
        {{polaris-resource-list
          items=itemsWithID
          itemComponent=this.itemComponent
          bulkActions=bulkActions
          selectedItems=(array "5" "6" "7")
        }}
      `);
        assert.strictEqual(
          this.get('accessibilityLabel'),
          'Deselect all 3 items',
        );
      });

      test('provides the BulkActions with the right accessibilityLabel if there’s multiple items and some or none are selected', async function (assert) {
        await render(hbs`
        {{polaris-resource-list
          items=itemsWithID
          itemComponent=this.itemComponent
          bulkActions=bulkActions
        }}
      `);
        assert.strictEqual(
          this.get('accessibilityLabel'),
          'Select all 3 items',
        );
      });
    },
  );

  module('idForItem()', function () {
    test('generates a key using the index if there’s no idForItem prop and no ID in data', async function (assert) {
      await render(hbs`
        {{polaris-resource-list items=itemsNoID itemComponent=this.shallowItemComponent}}
      `);
      assert.dom('li:first-of-type').hasAttribute('data-test-item-id', '0');
    });

    test('generates a key using the ID if there’s no idForItem prop but there and ID key in the data', async function (assert) {
      await render(hbs`
        {{polaris-resource-list items=itemsWithID itemComponent=this.shallowItemComponent}}
      `);
      assert.dom('li:first-of-type').hasAttribute('data-test-item-id', '5');
    });

    test('generates a key using the idForItem prop callback when one is provided', async function (assert) {
      await render(hbs`
        {{polaris-resource-list
          idForItem=(action idForItem)
          items=itemsWithID
          itemComponent=this.shallowItemComponent
        }}
      `);
      assert
        .dom('li:first-of-type')
        .hasAttribute('data-test-item-id', idForItem(itemsWithID[0]));
    });
  });

  module('onSelectionChange()', function () {
    test('calls onSelectionChange() when an item is clicked', async function (assert) {
      await render(hbs`
        {{polaris-resource-list
          items=itemsWithID
          selectedItems=(array)
          promotedBulkActions=promotedBulkActions
          itemComponent=this.itemComponent
          onSelectionChange=(action (mut wasOnSelectionChangeCalled) true)
        }}
      `);
      await click(
        '.Polaris-ResourceList-Item:first-of-type [data-test-id="larger-selection-area"]',
      );
      assert.ok(this.get('wasOnSelectionChangeCalled'));
    });
  });

  module('header markup', function () {
    test('renders header markup if the list isn’t selectable but the showHeader prop is true', async function (assert) {
      await render(hbs`
        {{polaris-resource-list showHeader=true items=itemsWithID itemComponent=this.itemComponent}}
      `);
      assert.dom('[data-test-id="resource-list-header"]').exists();
    });

    test('does not render when items is empty', async function (assert) {
      await render(hbs`
        {{polaris-resource-list items=(array) itemComponent=this.itemComponent}}
      `);
      assert.dom('[data-test-id="resource-list-header"]').doesNotExist();
    });

    test('renders when sort options are given', async function (assert) {
      await render(hbs`
        {{polaris-resource-list
          sortOptions=sortOptions
          items=itemsWithID
          itemComponent=this.itemComponent
        }}
      `);
      assert.dom('[data-test-id="resource-list-header"]').exists();
    });

    test('renders when an alternateTool is provided', async function (assert) {
      await render(hbs`
        {{polaris-resource-list
          alternateTool=(component "wrapper-element" class="AlternateTool")
          items=itemsWithID
          itemComponent=this.itemComponent
        }}
      `);
      assert.dom('[data-test-id="resource-list-header"]').exists();
    });

    test('renders when bulkActions are given', async function (assert) {
      await render(hbs`
        {{polaris-resource-list
          bulkActions=bulkActions
          items=itemsWithID
          itemComponent=this.itemComponent
        }}
      `);
      assert.dom('[data-test-id="resource-list-header"]').exists();
    });

    test('renders when promotedBulkActions are given', async function (assert) {
      await render(hbs`
        {{polaris-resource-list
          promotedBulkActions=promotedBulkActions
          items=itemsWithID
          itemComponent=this.itemComponent
        }}
      `);
      assert.dom('[data-test-id="resource-list-header"]').exists();
    });

    test('does not render when sort options, bulkActions and promotedBulkActions are not given', async function (assert) {
      await render(hbs`
        {{polaris-resource-list items=itemsWithID itemComponent=this.itemComponent}}
      `);
      assert.dom('[data-test-id="resource-list-header"]').doesNotExist();
    });

    test('renders on non-initial load when items are provided', async function (assert) {
      this.set('items', []);
      await render(hbs`
        {{polaris-resource-list
          bulkActions=bulkActions
          items=items
          itemComponent=this.itemComponent
        }}
      `);
      assert.dom('[data-test-id="resource-list-header"]').doesNotExist();

      this.set('items', itemsWithID);
      assert.dom('[data-test-id="resource-list-header"]').exists({ count: 1 });
    });
  });

  module('filterControl', function () {
    test('renders when exist', async function (assert) {
      await render(hbs`
        {{polaris-resource-list
          items=itemsNoID
          itemComponent=this.shallowItemComponent
          filterControl=(component "wrapper-element" id="test123")
        }}
      `);
      assert.dom('#test123').exists();
    });
  });

  module('emptySearchResult', function () {
    /**
     * Skipping this test since it passes locally but fails on CI for some reason :(
     */
    skip('renders when filterControl exists and items is empty', async function (assert) {
      await render(hbs`
        {{polaris-resource-list
          items=(array)
          itemComponent=this.shallowItemComponent
          filterControl="wrapper-element"
        }}
      `);
      assert.dom('.Polaris-EmptySearchResult').exists();
    });

    test('does not render when filterControl does not exist', async function (assert) {
      await render(hbs`
        {{polaris-resource-list items=(array) itemComponent=this.shallowItemComponent}}
      `);
      assert.dom('.Polaris-EmptySearchResult').doesNotExist();
    });

    test('does not render when items is not empty', async function (assert) {
      await render(hbs`
        {{polaris-resource-list
          items=itemsNoID
          itemComponent=this.shallowItemComponent
          filterControl=(component "wrapper-element" id="test123")
        }}
      `);
      assert.dom('.Polaris-EmptySearchResult').doesNotExist();
    });

    test('does not render when filterControl exists, items is empty, and loading is true', async function (assert) {
      await render(hbs`
        {{polaris-resource-list
          items=(array)
          itemComponent=this.shallowItemComponent
          filterControl=(component "wrapper-element")
        }}
      `);
      assert.dom('.Polaris-EmptySearchResult').doesNotExist();
    });
  });

  module('Sorting', function () {
    test('does not render a sort select if sortOptions aren’t provided', async function (assert) {
      await render(hbs`
        {{polaris-resource-list items=itemsWithID itemComponent=this.itemComponent}}
      `);
      assert.dom('.Polaris-Select').doesNotExist();
    });

    test('renders a sort select if sortOptions are provided', async function (assert) {
      await render(hbs`
        {{polaris-resource-list
          items=itemsWithID
          sortOptions=sortOptions
          itemComponent=this.itemComponent
        }}
      `);
      assert.dom('.Polaris-Select').exists();
    });

    test('does not render a sort select if an alternateTool is provided', async function (assert) {
      await render(hbs`
        {{polaris-resource-list
          items=itemsWithID
          sortOptions=sortOptions
          itemComponent=this.itemComponent
          alternateTool=(component "wrapper-element" class="AlternateTool")
        }}
      `);
      assert.dom('.Polaris-Select').doesNotExist();
    });

    module('Alternate Tool', function () {
      test('does not render if an alternateTool is not provided', async function (assert) {
        await render(hbs`
          {{polaris-resource-list
            items=itemsWithID
            itemComponent=this.itemComponent
          }}
        `);
        assert.dom('.AlternateTool').doesNotExist();
      });

      test('renders if an alternateTool is provided', async function (assert) {
        await render(hbs`
          {{polaris-resource-list
            items=itemsWithID
            itemComponent=this.itemComponent
            alternateTool=(component "wrapper-element" class="AlternateTool")
          }}
        `);
        assert.dom('.AlternateTool').exists();
      });

      test('renders even if sortOptions are provided', async function (assert) {
        await render(hbs`
          {{polaris-resource-list
            items=itemsWithID
            itemComponent=this.itemComponent
            sortOptions=sortOptions
            alternateTool=(component "wrapper-element" class="AlternateTool")
          }}
        `);
        assert.dom('.AlternateTool').exists();
      });
    });

    module(
      'sortOptions',
      {
        beforeEach() {
          setUpAttributeCaptureOnComponent(
            this,
            'polaris-select',
            SelectComponent,
            'options',
          );
        },
      },
      function () {
        test('passes a sortOptions to the Select options', async function (assert) {
          await render(hbs`
          {{polaris-resource-list
            items=itemsWithID
            sortOptions=sortOptions
            itemComponent=this.itemComponent
          }}
        `);
          assert.deepEqual(this.get('options'), sortOptions);
        });
      },
    );

    module(
      'sortValue',
      {
        beforeEach() {
          setUpAttributeCaptureOnComponent(
            this,
            'polaris-select',
            SelectComponent,
            'value',
          );
        },
      },
      function () {
        test('passes a sortValue to the Select value', async function (assert) {
          await render(hbs`
          {{polaris-resource-list
            items=itemsWithID
            sortOptions=sortOptions
            sortValue="sortValue"
            onSortChange=(action (mut dummy))
            itemComponent=this.itemComponent
          }}
        `);
          assert.strictEqual(this.get('value'), 'sortValue');
        });
      },
    );

    module('onSortChange', function () {
      test('calls onSortChange when the Sort Select changes', async function (assert) {
        await render(hbs`
          {{polaris-resource-list
            items=itemsWithID
            onSortChange=(action (mut sortChangeParam))
            sortOptions=sortOptions
            itemComponent=this.itemComponent
          }}
        `);
        find('.Polaris-Select select').value = 'PRODUCT_TITLE_DESC';
        await triggerEvent('.Polaris-Select select', 'change');
        assert.strictEqual(this.get('sortChangeParam'), 'PRODUCT_TITLE_DESC');
      });
    });
  });

  module('loading', function () {
    test('renders a spinner', async function (assert) {
      await render(hbs`
        {{polaris-resource-list
          items=itemsWithID
          sortOptions=sortOptions
          itemComponent=this.itemComponent
          loading=true
        }}
      `);

      // Checking for spinner container here because currently
      // our tests can't render SVGs so the spinner doesn't appear.
      assert.dom('.Polaris-ResourceList__SpinnerContainer').exists();
    });

    test('does not render an <Item /> if loading is true and there are no items', async function (assert) {
      await render(hbs`
        {{polaris-resource-list
          items=(array)
          sortOptions=sortOptions
          itemComponent=this.itemComponent
          loading=true
        }}
      `);

      assert.dom('[data-test-id="item-wrapper"]').doesNotExist();
    });
  });

  module('BulkActions', function () {
    test('renders on initial load when items are selected', async function (assert) {
      await render(hbs`
        {{polaris-resource-list
          items=singleItemWithID
          itemComponent=this.itemComponent
          bulkActions=bulkActions
          selectedItems=(array "1")
        }}
      `);
      assert.dom('[data-test-bulk-actions]').exists({ count: 1 });
    });
  });
});
