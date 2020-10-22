📢 Use this project, [contribute](https://github.com/vtex-apps/product-summary/blob/master/docs/ProductSummaryBuyButton.md) to it or open issues to help evolve it using [Store Discussion](https://github.com/vtex-apps/store-discussion).

# Product Summary Custom

Product Summary Custom is a block exported by the Product Summary app responsible for rendering the Product Summary.

![](https://user-images.githubusercontent.com/40380674/96649443-7d21d480-1307-11eb-9100-534fa9e70ca6.png))

## Configuration

1. Add the [Product Summary app](https://vtex.io/docs/components/content-blocks/vtex.product-summary/) to your theme's dependencies on the `manifest.json`, for example:

```json
  dependencies: {
    "vtex.product-summary": "2.x"
  }
```

2. Declare the `product-summary.shelf` block.

```diff
{
+ "product-summary.shelf": {
+    "children": [
+      "product-summary-image",
+      "product-summary-name",
+      "product-rating-inline",
+      "product-summary-space",
+      "product-summary-price",
+      "product-summary-buy-button"
+    ]
+ }
}
```

3. Add the `product-summary.shelf` as a block of another component. The parent block needs to accepts `product-summary.shelf` as a block.

```diff
 {
   "product-summary.shelf": {
      "children": [
        "product-summary-image",
        "product-summary-name",
        "product-rating-inline",
        "product-summary-space",
        "product-summary-price",
        "product-summary-buy-button"
      ]
   },

   "list-context.product-list": {
+     "blocks": ["product-summary.shelf"]
   },
 }
```

### Props

| Prop name      | Type      | Description                                                                                                                                                                                                                                           | Default value                                    |
| -------------- | --------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------ |
| `isPriceAsync` | `boolean` | Whether the client-side will request the simulation API (`true`) or not (`false`). Remeber to set the [`simulationBehavior`](https://github.com/vtex-apps/search-result/blob/33faaa139d636d2ff10bb9a93e77075b31a66d6e/docs/README.md) prop to `skip`. | `false` if you want to use this feature on a PLP |

#### `isPriceAsync` example:

We recommend using the `product-price-suspense` to have a loading spinner while the simulation API is being fetched.

![priceasync](https://user-images.githubusercontent.com/40380674/96735041-85265680-1391-11eb-80e9-2eb35607fd72.gif)

```diff
{
  "store.search": {
    "blocks": [
      "search-result-layout"
    ],
    "props": {
      "context": {
+       "simulationBehavior": "skip"
      }
    }
  },
  "gallery": {
    "blocks": [
      "product-summary.shelf"
    ]
  },
  "search-content": {
    "blocks": [
      "gallery",
      "not-found"
    ]
  },
  "product-summary.shelf": {
    "props": {
+     "isPriceAsync": true
    },
    "children": [
      // other children
+     "product-price-suspense"
    ]
  },
+ "product-price-suspense": {
+   "children": [
+     "product-list-price#summary",
+     "flex-layout.row#selling-price-savings",
+     "product-installments#summary",
+     "add-to-cart-button"
+   ]
+ }
}
```
