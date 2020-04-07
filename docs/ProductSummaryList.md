# ProductSummaryList

The `list-context.product-list` interface is a stance of the `list-context` interfaces, which means its part of a set of special interfaces that enables you to create lists of content that can be edited via Site Editor.

In order to create a list of products, you need to use `product-list-block` and `list-context.product-list` blocks.

## product-list-block

This block is used to specify what variation of `product-summary` to be used to create the list of products, and the `list-context.product-list` you want as follows:

```json
  "product-summary.shelf#demo1": {
    "children": [
      "stack-layout#prodsum",
      "product-summary-name",
      "product-rating-inline",
      "product-summary-space",
      "product-summary-price",
      "product-summary-buy-button"
    ]
  },
  "product-list-block#demo1": {
    "blocks": ["product-summary.shelf#demo1", "list-context.product-list#demo1"]
  },
  "list-context.product-list#demo1": {
    "children": ["slider-layout#demo-products"]
  },
```

`product-summary-block` is also the one that actually performs the GraphQL query that fetches the list of products, so it can receive the following props:

| Prop name              | Type                                   | Description                                                                                                                                                                                                                               | Default value |
| ---------------------- | -------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| `category`             | `String`                               | Category ID of the listed items. For sub-categories, use "/" (e.g. "1/2/3")                                                                                                                                                               | -             |
| `specificationFilters` | `Array({ id: String, value: String })` | Specification Filters of the listed items.                                                                                                                                                                                                | []            |
| `collection`           | `String`                               | Filter by collection.                                                                                                                                                                                                                     | -             |
| `orderBy`              | `Enum`                                 | Ordination type of the items. Possible values: `OrderByTopSaleDESC`, `OrderByReleaseDateDESC`, `OrderByBestDiscountDESC`, `OrderByPriceDESC`, `OrderByPriceASC`, `OrderByNameASC`, `OrderByNameDESC` | `OrderByTopSaleDESC`          |
| `hideUnavailableItems` | `Boolean`                              | Hides items that are unavailable.                                                                                                                                                                                                         | `false`       |
| `maxItems` | `Number`                              | Maximum items to be fetched.                                                                                                                                                                                                         | `10`       |

## list-context.product-list

This is the interface that extends the `list-context` from `vtex.list-context`, and has `"composition": "children"` to enable this list to be composable with other contexts. It should not expect any props to be passed to it and just wraps its children with a `ListContextProvider` so that they have access to the list of `product-summary`s created by `product-list-block`.