📢 Use this project, [contribute](https://github.com/vtex-apps/product-summary/blob/master/docs/ProductSummaryShelf.md) to it or open issues to help evolve it using [Store Discussion](https://github.com/vtex-apps/store-discussion).

# Product Summary Shelf

The Product Summary Shelf is the main block exported by the [Product Summary app](https://developers.vtex.com/docs/guides/vtex-product-summary). It includes the child blocks required to display the Product Summary component in your store.

![](https://user-images.githubusercontent.com/40380674/96649443-7d21d480-1307-11eb-9100-534fa9e70ca6.png))

## Configuration

1. Import the `vtex.product-summary` app to your theme dependencies in the `manifest.json` file:

```json
  dependencies: {
    "vtex.product-summary": "2.x"
  }
```

2. Add the `product-summary.shelf` block as a child of the [`list-context.product-list` block](https://developers.vtex.com/docs/guides/vtex-product-summary-productsummarylist#product-list-block):

```diff
   "list-context.product-list": {
+     "blocks": ["product-summary.shelf"]
   },
```

3. Declare the `product-summary.shelf` block, passing the desired blocks exported by the Product Summary app to build your Product Summary component. For example:

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

>⚠️ Remember to define the other Product Summary blocks in your theme, otherwise the component will not be displayed.

| Prop name | Type | Description | Default value |
| - | - | - | - |
| `priceBehavior` |  `enum` | Determines whether the component should fetch the most up-to-date price (`async`) or (`default`). Remember to configure the [Search Result](https://vtex.io/docs/components/content-blocks/vtex.search-result@3.79.1/#configuration)'s `simulationBehavior` prop to `skip` and use the Product Price [`product-price-suspense`](https://github.com/vtex-apps/product-price/blob/master/docs/README.md) block to render a loading spinner while the price information is being fetched. | `default` |
| `trackListName` | `boolean` | Determines whether the component should send the list name to the product page when the product summary is clicked. Disabling it will prevent the `productDetail` GTM event sent on the PDP to identify from which list the user navigated. | `true` |
| `sponsoredBadgeLabel` | `String` | The text of the "Sponsored" tag, if applicable. | `"store/sponsored-badge.label"`| 
| `sponsoredBadgePosition` | `enum` | The position of the "Sponsored" tag, if applicable. Possible values are `titleTop`, `containerTopLeft` and `none`. | `"containerTopLeft"`| 
| `arialabel` | `string` | Aria-label to be included for accessibility purposes |  `undefined` |

## Customization

The Product Summary Shelf merely establishes the block structure to render the Product Summary component. Therefore, this block does not have CSS Handles for its specific customization.

Instead, you should use its child block Handles.

<!-- DOCS-IGNORE:start -->

## Contributors ✨

Thanks goes to these wonderful people:

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind are welcome!

<!-- DOCS-IGNORE:end -->


