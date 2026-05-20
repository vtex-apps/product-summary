# Product Summary List

[<i class="fa-brands fa-github"></i> Source code](https://github.com/vtex-apps/product-summary/tree/master/react/components/ProductSummaryAttachmentList)

The Product Summary List app (`list-context.product-list`) creates product lists in VTEX stores. It fetches product data and passes it to the `product-summary.shelf` block, which renders each product summary.

Use this app to build shelves, product carousels, and other storefront sections that display products.

![list-context-example](https://cdn.jsdelivr.net/gh/vtexdocs/dev-portal-content@main/images/vtex-product-summary-productsummarylist-0.png)

## Installation

1. [Install](https://developers.vtex.com/docs/guides/vtex-io-documentation-installing-an-app) the [`product-summary`](https://developers.vtex.com/docs/apps/vtex.product-summary) app in your account by running the following command in your terminal:

  ```bash
  vtex install vtex.product-summary
  ```

## Configuration

1. Open you [Store Theme](https://developers.vtex.com/docs/guides/vtex-io-documentation-store-theme) app in a code editor.
2. Open to [`manifest.json`](https://developers.vtex.com/docs/guides/vtex-io-documentation-manifest) file and add the Product Summary List app (`vtex.product-summary`) under the [`dependencies`](https://developers.vtex.com/docs/guides/vtex-io-documentation-dependencies) field.

  ```json
  "dependencies": {
    "vtex.product-summary": "2.x"
  }
  ```

You can now use the `list-context.product-list` block, which is exported by the `product-summary` app.

## `product-list` block

Use this block to define the `product-summary` variation for creating the product list and the desired `list-context.product-list`, as shown below:

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

## Props

The `list-context.product-list` also runs the GraphQL query that fetches the product list, allowing it to receive the following props:

| Prop name              | Type                                   | Description                                                                                                                                                                                                  | Default value            |
| ---------------------- | -------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------ |
| `category`             | `string`                               | Category ID of the listed items. For subcategories, use `"/"` (example: `"1/2/3"`).                                                                                                                               | -                        |
| `specificationFilters` | `Array({ id: String, value: String })` | Specification filters of the listed items.                                                                                                                                                                   | []                       |
| `collection`           | `string`                               | ID of the product collection to be displayed.                                                                                                                                                                                        | -                        |
| `orderBy`              | `enum`                                 | Sort order for the items. Possible values are: `''`, `OrderByTopSaleDESC`, `OrderByReleaseDateDESC`, `OrderByBestDiscountDESC`, `OrderByPriceDESC`, `OrderByPriceASC`, `OrderByNameASC`, `OrderByNameDESC`. | `OrderByTopSaleDESC`     |
| `hideUnavailableItems` | `boolean`                              | Hides unavailable items when set to `true`.                                                                                                                                                                                     | `false`                  |
| `maxItems`             | `number`                               | Maximum number items to be fetched.                                                                                                                                                                                 | `10`                     |
| `skusFilter`           | [`SkusFilterEnum`](#skusfilterenum)                       | Controls which SKUs are returned for each product. The fewer SKUs that need to be returned, the more efficient your shelf query will be. Possible values are: `FIRST_AVAILABLE`, `ALL_AVAILABLE`, `ALL`.         | `"ALL_AVAILABLE"`        |
| `installmentCriteria`  | [`InstallmentCriteriaEnum`](#installmentcriteriaenum)              | Controls which price is displayed when a product has multiple installment options. Possible values are: `MAX_WITHOUT_INTEREST`, `MAX_WITH_INTEREST`.                                                                                                                | `"MAX_WITHOUT_INTEREST"` |
| `listName`             | `string`                               | Name of the list property in Google Analytics events.                                                                                                                                                        | -                     |
| `preferredSKU`         | [`PreferredSKUEnum`](#preferredskuenum)                     | Defines which SKU is selected in the summary. Possible values are: `FIRST_AVAILABLE`, `LAST_AVAILABLE`, `PRICE_ASC`, `PRICE_DESC`.                                                                                                                                     | `"FIRST_AVAILABLE"`      |

### `SkusFilterEnum`

| Name            | Value             | Description                                                                                                                                                |
| --------------- | ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| First Available | `FIRST_AVAILABLE` | Best performance, ideal if you don't have a SKU selector on your shelf. It returns only the first available SKU for that product in your shelf query. |
| All Available   | `ALL_AVAILABLE`   | It only returns available SKUs. Ideal if you have a SKU selector but want better performance.           |
| All             | `ALL`             | Lowest performance. Returns all SKUs associated with the product, including unavailable ones.                                                             |

### `InstallmentCriteriaEnum`

| Name                     | Value                  | Description                                                       |
| ------------------------ | ---------------------- | ----------------------------------------------------------------- |
| Maximum without interest | `MAX_WITHOUT_INTEREST` | Displays the maximum number of installments with no interest.         |
| Maximum                  | `MAX_WITH_INTEREST`    | Displays the maximum number of installments, including those with interest. |

### `PreferredSKUEnum`

| Name            | Value             | Description                                        |
| --------------- | ----------------- | -------------------------------------------------- |
| First Available | `FIRST_AVAILABLE` | Selects the first available SKU.                   |
| Last Available  | `LAST_AVAILABLE`  | Selects the last available SKU.                    |
| Most Expensive  | `PRICE_DESC`      | Selects the most expensive available SKU.          |

> ⚠️ To override the `PreferredSKU` prop, create a Product specification and assign the value of the SKU you want selected by default for each product. If the specification doesn't exist or the value is empty, the `preferredSKU` prop is used as a fallback.
