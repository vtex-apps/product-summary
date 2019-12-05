📢 Don't fork this project. Use, [contribute](https://github.com/vtex-apps/awesome-io#contributing), or open issues through [Store Discussion](https://github.com/vtex-apps/store-discussion).

# Product Summary

Product Summary summarises the product informations such as name, price and picture.
This is a VTEX app that is used by store theme.

![image](https://user-images.githubusercontent.com/284515/70235170-1a503a80-1741-11ea-952d-07b178995f92.png)

## Configuration

1. Import the vtex.store-component's app to your theme's dependencies in the manifest.json, for example:

```json
  dependencies: {
    "vtex.product-summary": "2.x"
  }
```
2. Add the `product-summary` block. For example:

```json
"product-summary": {
  "props": {
    "isOneClickBuy": false,
    "showBadge": true,
    "badgeText": "OFF",
    "displayBuyButton": "displayButtonHover",
    "showCollections": false,
    "showListPrice": true,
    "showLabels": false,
    "showInstallments": true,
    "showSavings": true
  }
}
```

| Prop name           | Type      | Description                                                                                 |
| ------------------- | --------- | ------------------------------------------------------------------------------------------- |
| `showListPrice`     | `Boolean` | Shows the product list price                                                                |
| `isOneClickBuy`     | `Boolean` | Should redirect to checkout after clicking on buy                                           |
| `showLabels`        | `Boolean` | Set pricing labels' visibility                                                              |
| `showInstallments`  | `Boolean` | Set installments' visibility                                                                |
| `showBorders`       | `Boolean` | Set product's borders visibility                                                            |
| `showBadge`         | `Boolean` | Set the discount badge's visibility                                                         |
| `showDescription`   | `Boolean` | Set product's description visibility                                                        |
| `labelSellingPrice` | `String`  | Text of selling price's label                                                               |
| `labelListPrice`    | `String`  | Text of list price's label                                                                  |
| `badgeText`         | `String`  | Text shown on badge                                                                         |
| `buyButtonText`     | `String`  | Custom buy button text                                                                      |
| `displayBuyButton`  | `Enum`    | Set display mode of buy button (displayButtonAlways, displayButtonHover, displayButtonNone) |
| `hideBuyButton`     | `Boolean` | Hides the buybutton completely                                                              |
| `showCollections`   | `Boolean` | Set collection badges' visibility                                                           |
| `displayMode`       | `Enum`    | Set display mode of product summary (normal, small, inline or inlinePrice)                               |
| `showQuantitySelector`       | `Boolean`    | Set the quantity selector visibility              
|
| `priceAlignLeft`       | `Boolean`    | Set the price to be left aligned              
|

#### Customization

In order to apply CSS customizations in this and other blocks, follow the instructions given in the recipe on [Using CSS Handles for store customization](https://vtex.io/docs/recipes/style/using-css-handles-for-store-customization).

| CSS Handles                | 
| -------------------------- |
| `container`                |
| `containerNormal`          |
| `containerSmall`           |
| `containerInline`          |
| `element`                  |
| `clearLink`                |
| `information`              |
| `imageContainer`           |
| `image`                    |
| `aspectRatio`              |
| `nameContainer`            |
| `priceContainer`           |
| `buyButtonContainer`       |
| `buyButton`                |
| `isHidden`                 |
| `description`              |
| `quantityStepperContainer` |
| `imagePlaceholder`         |
| `column`                   |
| `spacer`                   |
