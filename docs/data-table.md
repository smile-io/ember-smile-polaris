[< Back to Components List](../README.md#components)

## Data table

`polaris-data-table` implements the [Polaris Data table component](https://polaris.shopify.com/components/lists-and-tables/data-table).

### Example

Basic data table (using [ember-array-helper](https://github.com/kellyselden/ember-array-helper)):

```hbs
{{polaris-data-table
  columnContentTypes=(array "text" "numeric")
  headings=(array "Product" "Remaining stock")
  rows=(array (array "Kitten" 5) (array "Puppy" 3))
}}
```

Sortable data table (you are responsible for sorting the `rows` in the action passed into `onSort`):

```hbs
{{polaris-data-table
  columnContentTypes=(array "text" "numeric")
  headings=(array "Product" "Remaining stock")
  rows=rows
  sortable=(array false true)
  defaultSortDirection="descending"
  initialSortColumnIndex=1
  onSort=(action "sortData")
}}
```

Data table with totals and footer:

```hbs
{{polaris-data-table
  columnContentTypes=(array "text" "numeric" "numeric")
  headings=(array "Product" "Remaining stock" "Net sales")
  rows=(array (array "Kitten" 5 "$12,345") (array "Puppy" 3 "$6,789"))
  totals=(array "" 8 "$19,134")
  footerContent="Showing 2 of 2 results"
}}
```

You can also render components in heading, total, row and footer cells by passing either a component definition generated by the `component` helper:

```hbs
{{polaris-data-table
  columnContentTypes=(array "text" "numeric")
  headings=(array "Product" "Remaining stock")
  rows=(array
    (array "Kitten" 5)
    (array
      "Puppy" (component "polaris-text-style" variation="negative" text="3")
    )
  )
}}
```
