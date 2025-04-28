# Product Summary List

The Product Summary List app (`list-context.product-list`) is an instance of the `list-context` interface, which provides predefined interfaces used to create content lists, such as a product list.

![list-context-example](https://cdn.jsdelivr.net/gh/vtexdocs/dev-portal-content@main/images/vtex-product-summary-productsummarylist-0.png)

To create a product list, you must use the `list-context.product-list` and `product-summary.shelf` blocks.

## product-list-block

This block is used to specify the variation of `product-summary` that should be used to create the product list and the `list-context.product-list` you want, as follows:

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

`list-context.product-list` also runs the GraphQL query that fetches the product list, allowing it to receive the following props:

| Prop name              | Type                                   | Description                                                                                                                                                                                                  | Default value            |
| ---------------------- | -------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------ |
| `category`             | `string`                               | Category ID of the listed items. For subcategories, use "/" (example: "1/2/3").                                                                                                                               | -                        |
| `specificationFilters` | `Array({ id: String, value: String })` | Specification filters of the listed items.                                                                                                                                                                   | []                       |
| `collection`           | `string`                               | Filter by collection.                                                                                                                                                                                        | -                        |
| `orderBy`              | `enum`                                 | Sort type of the items. Possible values are: `''`, `OrderByTopSaleDESC`, `OrderByReleaseDateDESC`, `OrderByBestDiscountDESC`, `OrderByPriceDESC`, `OrderByPriceASC`, `OrderByNameASC`, `OrderByNameDESC`. | `OrderByTopSaleDESC`     |
| `hideUnavailableItems` | `boolean`                              | Hides unavailable items.                                                                                                                                                                                     | `false`                  |
| `maxItems`             | `number`                               | Maximum items to be fetched.                                                                                                                                                                                 | `10`                     |
| `skusFilter`           | [`SkusFilterEnum`](#skusfilterenum)                       | Control SKUs returned for each product in the query. The fewer SKUs that need to be returned, the more efficient your shelf query will be. Possible values are: `FIRST_AVAILABLE`, `ALL_AVAILABLE`, `ALL`.         | `"ALL_AVAILABLE"`        |
| `installmentCriteria`  | [`InstallmentCriteriaEnum`](#installmentcriteriaenum)              | Controls the price that will be displayed when the price has different installment options. Possible values are: `MAX_WITHOUT_INTEREST`, `MAX_WITH_INTEREST`.                                                                                                                | `"MAX_WITHOUT_INTEREST"` |
| `listName`             | `string`                               | Name of the list property in Google Analytics events.                                                                                                                                                        | -                     |
| `preferredSKU`         | [`PreferredSKUEnum`](#preferredskuenum)                     | Controls the SKU that will be selected in the summary. Possible values are: `FIRST_AVAILABLE`, `LAST_AVAILABLE`, `PRICE_ASC`, `PRICE_DESC`.                                                                                                                                     | `"FIRST_AVAILABLE"`      |

### `SkusFilterEnum`:

| Name            | Value             | Description                                                                                                                                                |
| --------------- | ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| First Available | `FIRST_AVAILABLE` | Best performance, ideal if you don't have a SKU selector on your shelf. It returns only the first available SKU for that product in your shelf query. |
| All Available   | `ALL_AVAILABLE`   | Somewhat better performance. It only returns available SKUs, which is ideal if you have a SKU selector but still want better performance.           |
| All             | `ALL`             | Returns all SKUs related to the product. This is the least efficient option.                                                                                       |

### `InstallmentCriteriaEnum`:

| Name                     | Value                  | Description                                                       |
| ------------------------ | ---------------------- | ----------------------------------------------------------------- |
| Maximum without interest | `MAX_WITHOUT_INTEREST` | Displays the maximum installment option with no interest.         |
| Maximum                  | `MAX_WITH_INTEREST`    | Displays the maximum installment option with or without interest. |

### `PreferredSKUEnum`:

| Name            | Value             | Description                                        |
| --------------- | ----------------- | -------------------------------------------------- |
| First Available | `FIRST_AVAILABLE` | Selects the first available SKU it finds.          |
| Last Available  | `LAST_AVAILABLE`  | Selects the last available SKU it finds.           |
| Cheapest        | `PRICE_ASC`       | Selects the cheapest SKU in stock it finds.        |
| Most Expensive  | `PRICE_DESC`      | Selects the most expensive available SKU it finds. |

> ⚠️ To select the SKU that will take precedence over this prop, create a Product (field) specification and assign the value of the desired SKU to be initially set for each product. If the specification doesn't exist or the value is empty, the `preferredSKU` prop will be used as a fallback. For more information, see [Configuring custom images for the SKU Selector](https://developers.vtex.com/docs/guides/vtex-io-documentation-configuring-custom-images-for-the-sku-selector).
