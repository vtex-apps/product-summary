# ProductSummaryList

The `list-context.product-list` interface is a instance of the `list-context` interfaces, which means its part of a set of special interfaces that enables you to create lists of content that can be edited via Site Editor.

In order to create a list of products, you need to use the `list-context.product-list` block and a `product-summary.shelf`.

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
  "list-context.product-list#demo1": {
    "blocks": ["product-summary.shelf#demo1"],
    "children": ["slider-layout#demo-products"]
  },
```

`list-context.product-list` is also responsible for performing the GraphQL query that fetches the list of products, so it can receive the following props:

| Prop name              | Type                                   | Description                                                                                                                                                                                                                               | Default value |
| ---------------------- | -------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| `category`             | `String`                               | Category ID of the listed items. For sub-categories, use "/" (e.g. "1/2/3")                                                                                                                                                               | -             |
| `specificationFilters` | `Array({ id: String, value: String })` | Specification Filters of the listed items.                                                                                                                                                                                                | []            |
| `collection`           | `String`                               | Filter by collection.                                                                                                                                                                                                                     | -             |
| `orderBy`              | `Enum`                                 | Ordination type of the items. Possible values: `OrderByTopSaleDESC`, `OrderByReleaseDateDESC`, `OrderByBestDiscountDESC`, `OrderByPriceDESC`, `OrderByPriceASC`, `OrderByNameASC`, `OrderByNameDESC` | `OrderByTopSaleDESC`          |
| `hideUnavailableItems` | `Boolean`                              | Hides items that are unavailable.                                                                                                                                                                                                         | `false`       |
| `maxItems` | `Number`                              | Maximum items to be fetched.                                                                                                                                                                                                         | `10`       |
| `skusFilter`               | `SkusFilterEnum`                 | Control SKUs returned for each product in the query. The less SKUs needed to be returned, the more performant your shelf query will be.                                                                                                    | `"ALL_AVAILABLE"` |
| `installmentCriteria`               | `InstallmentCriteriaEnum`                 | ControlControl what pricee to be shown when price has different installments options.                                                                                                    | `"MAX_WITHOUT_INTEREST"` |

For `SkusFilterEnum`:

| Name | Value | Description |
| ---- | ----- | ----------- |
| First Available | `FIRST_AVAILABLE` | Most performant, ideal if you do not have a SKU selector in your shelf. Will return only the first available SKU for that product in your shelf query. |
| All Available | `ALL_AVAILABLE` | A bit better performace, will only return SKUs that are available, ideal if you have a SKU selector but still want a better performance. |
| All | `ALL` | Returns all SKUs related to that product, least performant option. |

For `InstallmentCriteriaEnum`:

| Name | Value | Description |
| ---- | ----- | ----------- |
| Maximum without interest | `MAX_WITHOUT_INTEREST` | Will display price with maximum value before interest. |
| Maximum with interest | `MAX_WITH_INTEREST` | Will display price with maximum value after interest applied. |
