📢 Use this project, [contribute](https://github.com/vtex-apps/product-summary) to it or open issues to help evolve it using [Store Discussion](https://github.com/vtex-apps/store-discussion).

# Product Summary SKU Name

Product Summary SKU Name is a block exported by the [Product Summary app](https://developers.vtex.com/vtex-developer-docs/docs/vtex-product-summary) responsible for rendering the selected SKU's name.

## Configuration

1. Import the `vtex.product-summary` app to your theme's dependencies in the `manifest.json`:

```json
  "dependencies": {
    "vtex.product-summary": "2.x"
  }
```

2. Add the `product-summary-sku-name` block to your store theme as a child of `product-summary.shelf`. For example:

```diff
   "product-summary.shelf": {
    "children": [
      "product-summary-image",
      "product-summary-name",
+     "product-summary-sku-name",
      "product-summary-attachment-list",
      "product-summary-space",
      "product-summary-column#1"
    ]
  },
```

## Customization

In order to apply CSS customizations in this and other blocks, follow the instructions given in the recipe on [Using CSS Handles for store customization](https://developers.vtex.com/vtex-developer-docs/docs/vtex-io-documentation-using-css-handles-for-store-customization).

| CSS Handles        |
| ------------------ |
| `skuNameContainer` |
