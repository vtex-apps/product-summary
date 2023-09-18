📢 Use this project, [contribute](https://github.com/vtex-apps/product-summary/blob/master/docs/ProductSummarySponsoredBadge.md) to it or open issues to help evolve it using [Store Discussion](https://github.com/vtex-apps/store-discussion).

# Product Summary Sponsored Badge

`ProductSummarySponsoredBadge` is a block exported by the [Product Summary app](https://developers.vtex.com/vtex-developer-docs/docs/vtex-product-summary) responsible for rendering the "Sponsored" tag in sponsored products.

### Configuration

1. Import the `vtex.product-summary` app to your theme's dependencies in the `manifest.json`:

```json
  dependencies: {
    "vtex.product-summary": "2.x"
  }
```

2. Add the `product-summary-sponsored-badge` block to your store theme as a child of the `product-summary.shelf` block. For example:

```diff
   "product-summary.shelf": {
    "children": [
      "product-summary-image",
      "product-summary-name",
+     "product-summary-sponsored-badge",
      "product-summary-attachment-list",
      "product-summary-space",
      "product-summary-column#1"
    ]
  },
```

## Customization

To apply CSS customizations in this and other blocks, follow the [Using CSS Handles for store customization](https://developers.vtex.com/vtex-developer-docs/docs/vtex-io-documentation-using-css-handles-for-store-customization) guide.

| CSS Handles               |
| ------------------------- |
| `sponsoredBadgeContainer` |
| `sponsoredBadge`          |
