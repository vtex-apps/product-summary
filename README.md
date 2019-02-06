# Product Summary

Product summary is a canonical component that any VTEX store can install. 

## Release schedule
| Release  | Status              | Initial Release | Maintenance LTS Start | End-of-life | Dreamstore Compatibility
| :--:     | :---:               |  :---:          | :---:                 | :---:       | :---: 
| [1.x]    | **Maintenance LTS** |  2018-08-21     | 2018-11-28            | March 2019  | 1.x
| [2.x]    | **Current Release** |  2018-11-28     |                       |             | 2.x

## Continuous Integrations 

### Travis CI 
[![Build Status](https://travis-ci.org/vtex-apps/product-summary.svg?branch=master)](https://travis-ci.org/vtex-apps/product-summary)

### Running Tests

To run the test suit, type the following in the terminal, inside the folder `react`

```sh
$ npm t     # this
$ yarn test # or this one
```

To update the tests snapshots use

```sh
$ npm t -- -u  # like this
$ yarn test -u # or this
```

### Blocks API

#### Configuration
| Prop name          | Type       | Description                                                                 |
| ------------------ | ---------- | --------------------------------------------------------------------------- |
| `product`          | `Product`  | Product that owns the informations                                          |
| `showListPrice`    | `Boolean`  | Shows the product list price                                                |
| `isOneClickBuy`    | `Boolean`  | Should redirect to checkout after clicking on buy                           |
| `showLabels`       | `Boolean`  | Set pricing labels' visibility                                              |
| `showInstallments` | `Boolean`  | Set installments' visibility                                                |
| `showBadge`        | `Boolean`  | Set the discount badge's visibility                                         |
| `badgeText`        | `String`   | Text shown on badge                                                         |
| `buyButtonText`    | `String`   | Custom buy button text                                                      |
| `hideBuyButton`    | `Boolean`  | Hides the buybutton completely                                              |
| `showButtonOnHover`| `Boolean`  | Defines if the button is shown only if the mouse is on the summary          |


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

## Troubleshooting
You can check if others are passing through similar issues [here](https://github.com/vtex-apps/product-summary/issues). Also feel free to [open issues](https://github.com/vtex-apps/product-summary/issues/new) or contribute with pull requests.
