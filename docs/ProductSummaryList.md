# Product Summary List

The `list-context.product-list` block is an instance of the `list-context` interfaces, meaning that it is a part of a set of special interfaces that enables you to create a products list that can be edited via [Site Editor](https://developers.vtex.com/vtex-developer-docs/docs/vtex-io-documentation-site-editor).

It performs the GraphQL query that fetches the desired list of products for your store. Because of this, it is an essential block when [building a Shelf component for your store](https://developers.vtex.com/vtex-developer-docs/docs/vtex-io-documentation-building-a-shelf). 

![foto-shelf](https://user-images.githubusercontent.com/52087100/70079904-60dc5280-15e4-11ea-8ef6-0aa69cadd61d.png)

## Configuration

1. Add the Product Summary app to your theme's dependencies on the manifest.json, for example:

```
  dependencies: {
    "vtex.product-summary": "2.x"
  }
```

2. Add the `list-context.product-list` block to the store theme template where you desire to display a product list and declare the `product-summary.shelf` in its block list. For example:

```json
{
  "list-context.product-list": {
    "blocks": ["product-summary.shelf"]
  },
```

>ℹ️ Info
>
> Do not forget to check out the [`product-summary.shelf` block documentation](https://vtex.io/docs/components/all/vtex.product-summary@2.77.1/product-summary-shelf/) in order to keep evolving your product list. You can also check out the [Building a Shelf documentation](https://developers.vtex.com/vtex-developer-docs/docs/vtex-io-documentation-building-a-shelf) that teaches how to build a product list for the Shelf component.

| Prop name | Type | Description  | Default value |
| --------- | ---- |------------- | ------------- |
| `category`| `string`| Listed items' category ID. For sub-categories, use `/` (e.g. `1/2/3`). | `undefined` |
| `specificationFilters` | `object` | Listed items' specification filters. For more on this, check out the `specificationFilters` object section below. | `undefined`|
| `collection`| `string` | Listed item's collection ID. | `undefined` |
| `orderBy`   | `enum`   | Items sorting in the list. Possible values are: `OrderByTopSaleDESC`, `OrderByReleaseDateDESC`, `OrderByBestDiscountDESC`, `OrderByPriceDESC`, `OrderByPriceASC`, `OrderByNameASC`, or `OrderByNameDESC`. | `OrderByTopSaleDESC`|
| `hideUnavailableItems` | `boolean`| Whether unavailable items should be hidden from the list (`true`) or not (`false`).  | `false`|
| `maxItems` | `number`   | Maximum number of items to be fetched for the list.      | `10`       |
| `skusFilter` | `enum`   | Controls the number of SKUs fetched in the query for each listed product. Notice the following: the less SKUs needs to be returned, the more performant your product list query will be. Possible values are: `FIRST_AVAILABLE` (most performant, returns only the first SKU available for the product), `ALL_AVAILABLE` (returns all available SKUs), or `ALL` (least performant option, returns all SKUs related to the product being displayed).  | `ALL_AVAILABLE` |
| `installmentCriteria`   | `enum`  | Defines the price to be shown when the product has different installments options. Possible values are: `MAX_WITHOUT_INTEREST` (displays the price with maximum number of installments with no interest applied) or `MAX_WITH_INTEREST` (displayes the price with maximum number of installments, having it interest applied or not). | `MAX_WITHOUT_INTEREST` |

- **`specificationFilters` object**

| Prop name | Type | Description | Default value | 
| --------- | ---- | ----------- | ------------- | 
| `id`  | `string` | Specification filter ID. | `undefined` | 
| `value` | `string` | Specification filter value. | `undefined` | 

## Customization

No CSS Handles are available for this block customization.
