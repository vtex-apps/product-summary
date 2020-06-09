📢 Use this project, [contribute](https://github.com/vtex-apps/product-summary) to it or open issues to help evolve it using [Store Discussion](https://github.com/vtex-apps/store-discussion).

# Product Summary Buy Button

Product Summary Buy Button is a block exported by the Product Summary app responsible for rendering a buy button in the Product Summary Shelf block.

![](https://user-images.githubusercontent.com/52087100/76864047-38006600-683f-11ea-8a4e-74dc91712984.png)

## Configuration

1. Add the [Product Summary app](https://vtex.io/docs/components/content-blocks/vtex.product-summary/) to your theme's dependencies on the `manifest.json`, for example:

```json
  dependencies: {
    "vtex.product-summary": "2.x"
  }
```

2. Add the `product-summary-buy-button` block as a children of the `product-summary.shelf` block:

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

3. Then, declare the `product-summary-buy-button` and configure its behavior using the props stated below.

```json
{
  "product-summary-buy-button": {
    "props": {
      "isOneClickBuy": false
    }
  }
}
```

### Props

| Prop name           | Type      | Description                                                                                 | Default value         |
| ------------------- | --------- | ------------------------------------------------------------------------------------------- | --------------------- |
| `isOneClickBuy`     | `Boolean` | Whether the user should be redirected to Checkout after clicking on the Buy Button (`true`) or not (`false`) | `false` |
| `buyButtonText`     | `String`  | Custom text that overwrites the default Buy Button text                                     | `undefined`           |
| `displayBuyButton`  | `Enum`    | Sets the Buy Button display mode by defining whether it will always be displayed (`displayButtonAlways`), only displayed on hover (`displayButtonHover`) or if it will be hidden for users (`displayButtonNone`) | `displayButtonAlways` |
| `customToastURL`    | `String`  | Defines a redirect link to the Toast displayed when an item is added to your cart. | `/checkout/#/cart` |
| `buyButtonBehavior` | `Enum`    | Sets the Buy Button behavior when it is clicked on. You can choose between the following scenarios: <ul><li>`alwaysGoToProduct` - Redirect users to the product page;</li><li>`default` - Redirect users to the Product Page when there are several SKUs available. In scenarios in which there is only one SKU available, it will be add to the cart ;</li><li>`alwaysAddToTheCart` - Always add the selected SKU to the cart. When choosing this option, be careful: use it only if there are SKU Selectors for each product variation, so users can properly select their desired SKU. </li></ul> | `default` |

## Customization

In order to apply CSS customizations in this and other blocks, follow the instructions given in the recipe on [Using CSS Handles for store customization](https://vtex.io/docs/recipes/style/using-css-handles-for-store-customization).

| CSS Handles |
| --- |
| `buyButtonContainer` |
| `buyButton` |
| `isHidden` |

