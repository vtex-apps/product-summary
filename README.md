# VTEX Product Summary

## Description
The VTEX Product Summary summarises the product informations such as name, price and picture.
This is a VTEX app that is used by Dreamstore product.

:loudspeaker: **Disclaimer:** Don't fork this project, use, contribute, or open issue with your feature request

## Release schedule
| Release  | Status              | Initial Release | Maintenance LTS Start | End-of-life | Dreamstore Compatibility
| :--:     | :---:               |  :---:          | :---:                 | :---:       | :---: 
| [1.x]    | **Maintenance LTS** |  2018-08-21     | 2018-11-28            | March 2019  | 1.x
| [2.x]    | **Current Release** |  2018-11-28     |                       |             | 2.x

See our [LTS policy](https://github.com/vtex-apps/awesome-io#lts-policy) for more information.

## Table of Contents
- [Usage](#usage)
  - [Blocks API](#blocks-api)
    - [Configuration](#configuration)
  - [Styles API](#styles-api)
- [Troubleshooting](#troubleshooting)
- [Tests](#tests)

## Usage
This app uses our store builder with the blocks architecture. To know more about Store Builder [click here.](https://help.vtex.com/en/tutorial/understanding-storebuilder-and-stylesbuilder#structuring-and-configuring-our-store-with-object-object)

To use this app you need add it in your dependencies on `manifest.json` file.

```json
  "dependencies": {
    "vtex.product-summary": "2.x"
  }
```

Then, add `product-summary` block into our app theme, as we do in our [Minicart app](https://github.com/vtex-apps/minicart/blob/master/store/blocks.json). 

### Blocks API
This app has an interface that describes which rules must be implemented by a block when you want to use the product-summary.

```json
{
  "product-summary": {
    "component": "index"
  }
}
```

#### Configuration
Through the Storefront, you can change the behavior and interface of product-summary. However, you also can make in your theme app, as Dreamstore does.

| Prop name           | Type       | Description                                                                 |
| ------------------- | ---------- | --------------------------------------------------------------------------- |
| `product`           | `Product`  | Product that owns the informations                                          |
| `showListPrice`     | `Boolean`  | Shows the product list price                                                |
| `isOneClickBuy`     | `Boolean`  | Should redirect to checkout after clicking on buy                           |
| `showLabels`        | `Boolean`  | Set pricing labels' visibility                                              |
| `showInstallments`  | `Boolean`  | Set installments' visibility                                                |
| `showBorders`       | `Boolean`  | Set product's borders visibility                                            |
| `showBadge`         | `Boolean`  | Set the discount badge's visibility                                         |
| `showDescription`   | `Boolean`  | Set product's description visibility                                        |
| `labelSellingPrice` | `String`   | Text of selling price's label                                               |
| `badgeText`         | `String`   | Text shown on badge                                                         |
| `buyButtonText`     | `String`   | Custom buy button text                                                      |
| `displayBuyButton`  | `Enum`     | Set display mode of buy button (displayButtonAlways, displayButtonHover, displayButtonNone) |
| `hideBuyButton`     | `Boolean`  | Hides the buybutton completely                                              |
| `showCollections`   | `Boolean`  | Set collection badges' visibility                                           |
| `displayMode`       | `Enum`     | Set display mode of product summary (normal, small or inline)               |
| `actionOnClick`     | `Function` | Executes when the product is clicked                                        |

Product: 

| Prop name          | Type       | Description                                                                 |
| ------------------ | ---------- | --------------------------------------------------------------------------- |
| `linkText`         | `String!`  | Product's link text                                                         |
| `productName`      | `String!`  | Product's name                                                              |
| `brand`            | `String!`  | Product's brand                                                             |
| `sku`              | `SKU`      | Product's SKU                                                               |
| `buyButtonText`    | `String`   | Custom buy button text                                                      |
| `hideBuyButton`    | `Boolean`  | Hides the buybutton completely                                              |
| `showButtonOnHover`| `Boolean`  | Defines if the button is shown only if the mouse is on the summary          |

Sku:

| Prop name          | Type       | Description                                                                 |
| ------------------ | ---------- | --------------------------------------------------------------------------- |
| `name`             | `String!`  | SKU name                                                                    |
| `itemId`           | `String!`  | SKU id                                                                      |
| `image`            | `Image`    | SKU Image to be shown                                                       |
| `seller`           | `Seller`   | SKU seller                                                                  |

Image:

| Prop name          | Type       | Description                                                                 |
| ------------------ | ---------- | --------------------------------------------------------------------------- |
| `imageUrl`         | `String!`  | Image URL                                                                   |
| `imageTag`         | `String!`  | Image tag as string                                                         |

Seller:

| Prop name                     | Type                 | Description                                            |
| ----------------------------- | -------------------- | ------------------------------------------------------ |
| `commertialOffer`             | `CommertialOffer`    | Seller comertial offer                                 |
| `commertialOffer.Installments`| `Array(Installment)` | Selling Price                                          |
| `commertialOffer.Price`       | `Number`             | List Price                                             |

Instalment:

| Prop name                        | Type       | Description                                                   |
| -------------------------------- | ---------- | ------------------------------------------------------------- |
| `Value`                          | `Number!`  | Installment value                                             |
| `InterestRate`                   | `Number!`  | Interest rate (zero if interest-free)                         |
| `TotalValuePlusInterestRate`     | `Number`   | Calculated total value                                        |
| `NumberOfInstallments`           | `Number!`  | Number of installments                                        |
| `Name`                           | `String`   | Installments offer name                                       |

### Styles API
This app has CSS customization through `CSS Modules`. CSS Modules is a CSS file in which all class names and animation names are scoped locally by default. You can read more about CSS Modules [here](https://github.com/css-modules/css-modules) .

We use it `css-loader` to generate a CSS token on a HTML element. For example, the builder generate a CSS token based on app vendor, name and major version. Like `container` token declared in `ProductSummary`, generate the classname `vtex.product-summary-2-x-container`.

Below, we describe the tokens, their explanation and the component where it is located.

| Token name | Component | Description |
| ---------- | --------- |------------ |
| `container` | [ProductSummaryNormal](https://github.com/vtex-apps/product-summary/blob/master/react/components/ProductSummaryNormal.js), [ProductSummarySmall](https://github.com/vtex-apps/product-summary/blob/master/react/components/ProductSummarySmall.js), [ProductSummaryInline](https://github.com/vtex-apps/product-summary/blob/master/react/components/ProductSummaryInline.js) | The main container of `ProductSummary` |
| `containerNormal` | [ProductSummaryNormal](https://github.com/vtex-apps/product-summary/blob/master/react/components/ProductSummaryNormal.js) | The main container of `ProductSummary` in normal display mode | 
| `containerSmall` | [ProductSummarySmall](https://github.com/vtex-apps/product-summary/blob/master/react/components/ProductSummarySmall.js) | The main container of `ProductSummary` in small display mode | 
| `containerInline`| [ProductSummaryInline](https://github.com/vtex-apps/product-summary/blob/master/react/components/ProductSummaryInline.js) | The main container of `ProductSummary` in inline display mode |
| `element` | [ProductSummaryNormal](https://github.com/vtex-apps/product-summary/blob/master/react/components/ProductSummaryNormal.js), [ProductSummarySmall](https://github.com/vtex-apps/product-summary/blob/master/react/components/ProductSummarySmall.js), [ProductSummaryInline](https://github.com/vtex-apps/product-summary/blob/master/react/components/ProductSummaryInline.js) | The subcontainer of `ProductSummary` |
| `clearLink` | [ProductSummaryNormal](https://github.com/vtex-apps/product-summary/blob/master/react/components/ProductSummaryNormal.js), [ProductSummarySmall](https://github.com/vtex-apps/product-summary/blob/master/react/components/ProductSummarySmall.js), [ProductSummaryInline](https://github.com/vtex-apps/product-summary/blob/master/react/components/ProductSummaryInline.js) | The link container of `ProductSummary`
| `information` | [ProductSummaryNormal](https://github.com/vtex-apps/product-summary/blob/master/react/components/ProductSummaryNormal.js), [ProductSummarySmall](https://github.com/vtex-apps/product-summary/blob/master/react/components/ProductSummarySmall.js), [ProductSummaryInline](https://github.com/vtex-apps/product-summary/blob/master/react/components/ProductSummaryInline.js) | The information container of `ProductSummary` | 
| `imageContainer` | [ProductSummaryNormal](https://github.com/vtex-apps/product-summary/blob/master/react/components/ProductSummaryNormal.js), [ProductSummarySmall](https://github.com/vtex-apps/product-summary/blob/master/react/components/ProductSummarySmall.js), [ProductSummaryInline](https://github.com/vtex-apps/product-summary/blob/master/react/components/ProductSummaryInline.js) | The image container |
| `image` | [ProductImage](https://github.com/vtex-apps/product-summary/blob/master/react/components/ProductImage.js) | The product image |
| `aspectRatio` | [Image](https://github.com/vtex-apps/product-summary/blob/master/react/components/Image.js) | The image aspect ratio | 
| `nameContainer` | [ProductSummaryName](https://github.com/vtex-apps/product-summary/blob/master/react/components/ProductSummaryName.js) | The product name container
| `priceContainer` | [ProductSummaryNormal](https://github.com/vtex-apps/product-summary/blob/master/react/components/ProductSummaryNormal.js), [ProductSummarySmall](https://github.com/vtex-apps/product-summary/blob/master/react/components/ProductSummarySmall.js), [ProductSummaryInline](https://github.com/vtex-apps/product-summary/blob/master/react/components/ProductSummaryInline.js) | The product price container
| `buyButtonContainer` | [ProductSummaryNormal](https://github.com/vtex-apps/product-summary/blob/master/react/components/ProductSummaryNormal.js), [ProductSummarySmall](https://github.com/vtex-apps/product-summary/blob/master/react/components/ProductSummarySmall.js), [ProductSummaryInline](https://github.com/vtex-apps/product-summary/blob/master/react/components/ProductSummaryInline.js) | The buy button container
| `buyButton` | [ProductSummaryBuyButton](https://github.com/vtex-apps/product-summary/blob/master/react/components/ProductSummaryBuyButton.js) | The buy button
| `isHidden` | [ProductSummaryBuyButton](https://github.com/vtex-apps/product-summary/blob/master/react/components/ProductSummaryBuyButton.js) | Style used when buy button is hidden |
| `description` | [ProductSummaryNormal](https://github.com/vtex-apps/product-summary/blob/master/react/components/ProductSummaryNormal.js) | The product description |

To override the default CSS, you need to import `styles` on your manifest:

 ```json
  "builders": {
    "styles": "1.x"
  }
```

 Also, create a `vtex.product-summary.css` file in `styles/css` for your handlers customization.

## Troubleshooting
You can check if others are passing through similar issues [here](https://github.com/vtex-apps/product-summary/issues). Also feel free to [open issues](https://github.com/vtex-apps/product-summary/issues/new) or contribute with pull requests.

## Tests
To execute our tests go to `react/` folder and run `yarn test` 