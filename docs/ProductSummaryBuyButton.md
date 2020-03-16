📢 Use this project, [contribute](https://github.com/vtex-apps/product-summary) to it or open issues to help evolve it using [Store Discussion](https://github.com/vtex-apps/store-discussion).

# Product Summary Buy Button

`ProductSummaryBuyButton` is a VTEX Component that renders the buy button.
This Component can be imported and used by any VTEX App.

## Configuration

1. Import the Shelf app to your theme's dependencies on the `manifest.json`, for example:

```json
  dependencies: {
    "vtex.product-summary": "2.x"
  }
```

2. Add `product-summary-buy-button` anywhere inside the `product-summary.shelf`:

```diff
 {
   "product-summary.shelf": {
       "children": [
           "product-summary-image",
           "product-summary-name",
           "product-rating-inline",
           "product-summary-space",
           "product-summary-price",
+          "product-summary-buy-button"
       ]
   },
 }
```

### Props

| Prop name           | Type      | Description                                                                                 | Default value         |
| ------------------- | --------- | ------------------------------------------------------------------------------------------- | --------------------- |
| `isOneClickBuy`     | `Boolean` | Should redirect to checkout after clicking on buy                                           | `false`               |
| `buyButtonText`     | `String`  | Custom buy button text                                                                      |                       |
| `displayBuyButton`  | `Enum`    | Set display mode of buy button (displayButtonAlways, displayButtonHover, displayButtonNone) | `displayButtonAlways` |
| `customToastURL`  | `String`    | Set the link associated with the Toast created when adding an item to your cart.  | `/checkout/#/cart` |
| `buyButtonBehavior` | `Enum` | What will happen when the user clicks on the button. Check the options bellow. | `default`

- Possible values for `buyButtonBehavior`:

| Value | Description |
| --- | --- |
| `default` | It will add to cart if the product has one SKU. It will link to the product page if it has more than one SKU. |
| `alwaysGoToProduct` | It will always link to the product page. |
| `alwaysAddToCart` | It will always add the selected item to cart. Be careful: use this option only if the user is able to select all variations of the product. Example: if the product has Color and Size, you should show the SKU Selector of both variations so the user can select the color and size they want, otherwise the button will add a product that the user was not able to choose, for example, the first Size option. |

## Customization

In order to apply CSS customizations in this and other blocks, follow the instructions given in the recipe on [Using CSS Handles for store customization](https://vtex.io/docs/recipes/style/using-css-handles-for-store-customization).

| CSS Handles |
| --- |
| `buyButtonContainer` |
| `buyButton` |
| `isHidden` |

