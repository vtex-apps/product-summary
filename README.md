# VTEX Product Summary

## Description

The VTEX Product Summary summarises the product informations such as name, price and picture.
This is a VTEX app that is used by store theme.

:loudspeaker: **Disclaimer:** Don't fork this project; use, contribute, or open issue with your feature request

## Release schedule

| Release |       Status        | Initial Release | Maintenance LTS Start | End-of-life | Store Compatibility |
| :-----: | :-----------------: | :-------------: | :-------------------: | :---------: | :-----------------: |
|  [2.x]  | **Current Release** |   2018-11-28    |                       |             |         2.x         |
|  [1.x]  | **Maintenance LTS** |   2018-08-21    |      2018-11-28       | March 2019  |         1.x         |

See our [LTS policy](https://github.com/vtex-apps/awesome-io#lts-policy) for more information.

## Table of Contents

- [VTEX Product Summary](#vtex-product-summary)
  - [Description](#description)
  - [Release schedule](#release-schedule)
  - [Table of Contents](#table-of-contents)
  - [Usage](#usage)
    - [Blocks API](#blocks-api)
      - [Configuration](#configuration)
    - [Styles API](#styles-api)
      - [CSS Namespaces](#css-namespaces)
  - [Troubleshooting](#troubleshooting)
  - [Contributing](#contributing)
  - [Tests](#tests)
    - [Travis CI](#travis-ci)

## Usage

This app uses our store builder with the blocks architecture. To know more about Store Builder [click here.](https://help.vtex.com/en/tutorial/understanding-storebuilder-and-stylesbuilder#structuring-and-configuring-our-store-with-object-object)

To use this app or override the default CSS you need import it in your dependencies on `manifest.json` file.

```json
  "dependencies": {
    "vtex.product-summary": "2.x"
  }
```

Then, add `product-summary` block into our app theme, as we do in our [Minicart app](https://github.com/vtex-apps/minicart/blob/master/store/blocks.json).

Now, you can change the behavior of the `product-summary` block that is in the minicart. See an example of how to configure:

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

### Blocks API

When implementing this app as a block, various inner blocks may be available. The following interface lists the available blocks within product summary and describes if they are required or optional.

```json
{
  "product-summary": {
    "component": "index",
    "allowed": ["add-to-list-btn#product-summary"]
  },
  "add-to-list-btn#product-summary": {
    "component": "*"
  }
}
```

This block has as allowed block the `add-to-list-btn#product-summary` one.

#### Configuration

Through the Storefront, you can change the product-summary's behavior and interface. However, you also can make in your theme app, as Store theme does.

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

Also, you can configure the block [add-to-list-btn#product-summary](https://github.com/vtex-apps/wishlist) defined on product-summary.

### Styles API

This app provides some CSS classes as an API for style customization.

To use this CSS API, you must add the `styles` builder and create an app styling CSS file.

1. Add the `styles` builder to your `manifest.json`:

```json
  "builders": {
    "styles": "1.x"
  }
```

2. Create a file called `vtex.product-summary.css` inside the `styles/css` folder. Add your custom styles:

```css
.container {
  margin-top: 10px;
}
```

#### CSS Namespaces

Below, we describe the namespaces that are defined in the product-summary.

| Token name                 | Component                                                                                                                                                                                                                                                                                                                                                                     | Description                                                   |
| -------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------- |
| `container`                | [ProductSummaryNormal](https://github.com/vtex-apps/product-summary/blob/master/react/components/ProductSummaryNormal.js), [ProductSummarySmall](https://github.com/vtex-apps/product-summary/blob/master/react/components/ProductSummarySmall.js), [ProductSummaryInline](https://github.com/vtex-apps/product-summary/blob/master/react/components/ProductSummaryInline.js) | The main container of `ProductSummary`                        |
| `containerNormal`          | [ProductSummaryNormal](https://github.com/vtex-apps/product-summary/blob/master/react/components/ProductSummaryNormal.js)                                                                                                                                                                                                                                                     | The main container of `ProductSummary` in normal display mode |
| `containerSmall`           | [ProductSummarySmall](https://github.com/vtex-apps/product-summary/blob/master/react/components/ProductSummarySmall.js)                                                                                                                                                                                                                                                       | The main container of `ProductSummary` in small display mode  |
| `containerInline`          | [ProductSummaryInline](https://github.com/vtex-apps/product-summary/blob/master/react/components/ProductSummaryInline.js)                                                                                                                                                                                                                                                     | The main container of `ProductSummary` in inline display mode |
| `element`                  | [ProductSummaryNormal](https://github.com/vtex-apps/product-summary/blob/master/react/components/ProductSummaryNormal.js), [ProductSummarySmall](https://github.com/vtex-apps/product-summary/blob/master/react/components/ProductSummarySmall.js), [ProductSummaryInline](https://github.com/vtex-apps/product-summary/blob/master/react/components/ProductSummaryInline.js) | The subcontainer of `ProductSummary`                          |
| `clearLink`                | [ProductSummaryNormal](https://github.com/vtex-apps/product-summary/blob/master/react/components/ProductSummaryNormal.js), [ProductSummarySmall](https://github.com/vtex-apps/product-summary/blob/master/react/components/ProductSummarySmall.js), [ProductSummaryInline](https://github.com/vtex-apps/product-summary/blob/master/react/components/ProductSummaryInline.js) | The link container of `ProductSummary`                        |
| `information`              | [ProductSummaryNormal](https://github.com/vtex-apps/product-summary/blob/master/react/components/ProductSummaryNormal.js), [ProductSummarySmall](https://github.com/vtex-apps/product-summary/blob/master/react/components/ProductSummarySmall.js), [ProductSummaryInline](https://github.com/vtex-apps/product-summary/blob/master/react/components/ProductSummaryInline.js) | The information container of `ProductSummary`                 |
| `imageContainer`           | [ProductSummaryNormal](https://github.com/vtex-apps/product-summary/blob/master/react/components/ProductSummaryNormal.js), [ProductSummarySmall](https://github.com/vtex-apps/product-summary/blob/master/react/components/ProductSummarySmall.js), [ProductSummaryInline](https://github.com/vtex-apps/product-summary/blob/master/react/components/ProductSummaryInline.js) | The image container                                           |
| `image`                    | [ProductImage](https://github.com/vtex-apps/product-summary/blob/master/react/components/ProductImage.js)                                                                                                                                                                                                                                                                     | The product image                                             |
| `aspectRatio`              | [Image](https://github.com/vtex-apps/product-summary/blob/master/react/components/Image.js)                                                                                                                                                                                                                                                                                   | The image aspect ratio                                        |
| `nameContainer`            | [ProductSummaryName](https://github.com/vtex-apps/product-summary/blob/master/react/components/ProductSummaryName.js)                                                                                                                                                                                                                                                         | The product name container                                    |
| `priceContainer`           | [ProductSummaryNormal](https://github.com/vtex-apps/product-summary/blob/master/react/components/ProductSummaryNormal.js), [ProductSummarySmall](https://github.com/vtex-apps/product-summary/blob/master/react/components/ProductSummarySmall.js), [ProductSummaryInline](https://github.com/vtex-apps/product-summary/blob/master/react/components/ProductSummaryInline.js) | The product price container                                   |
| `buyButtonContainer`       | [ProductSummaryNormal](https://github.com/vtex-apps/product-summary/blob/master/react/components/ProductSummaryNormal.js), [ProductSummarySmall](https://github.com/vtex-apps/product-summary/blob/master/react/components/ProductSummarySmall.js), [ProductSummaryInline](https://github.com/vtex-apps/product-summary/blob/master/react/components/ProductSummaryInline.js) | The buy button container                                      |
| `buyButton`                | [ProductSummaryBuyButton](https://github.com/vtex-apps/product-summary/blob/master/react/components/ProductSummaryBuyButton.js)                                                                                                                                                                                                                                               | The buy button                                                |
| `isHidden`                 | [ProductSummaryBuyButton](https://github.com/vtex-apps/product-summary/blob/master/react/components/ProductSummaryBuyButton.js)                                                                                                                                                                                                                                               | Style used when buy button is hidden                          |
| `description`              | [ProductSummaryNormal](https://github.com/vtex-apps/product-summary/blob/master/react/components/ProductSummaryNormal.js)                                                                                                                                                                                                                                                     | The product description                                       |
| `quantityStepperContainer` | [ProductSummaryInlinePrice](https://github.com/vtex-apps/product-summary/blob/master/react/components/ProductSummaryInlinePrice.js)                                                                                                                                                                                                                                           | The quantity stepper container                                |
| `imagePlaceholder`         | [ProductImage](https://github.com/vtex-apps/product-summary/blob/master/react/components/ProductSummaryImage/ProductImage.js)                                                                                                                                                                                                                                           | Product image placeholder class                        |

## Troubleshooting

You can check if others are passing through similar issues [here](https://github.com/vtex-apps/product-summary/issues). Also feel free to [open issues](https://github.com/vtex-apps/product-summary/issues/new) or contribute with pull requests.

## Contributing

Check it out [how to contribute](https://github.com/vtex-apps/awesome-io#contributing) with this project. 

## Tests

To execute our tests go to `react/` folder and run `yarn test`

### Travis CI

[![Build Status](https://travis-ci.org/vtex-apps/product-summary.svg?branch=master)](https://travis-ci.org/vtex-apps/product-summary)
[![Coverage Status](https://coveralls.io/repos/github/vtex-apps/product-summary/badge.svg?branch=master)](https://coveralls.io/github/vtex-apps/product-summary?branch=master)
