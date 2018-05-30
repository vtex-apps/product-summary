# Product Summary

Product summary is a canonical component that any VTEX store can install. 

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
## Troubleshooting

You can check if others are experiencing similar issues [here](https://github.com/vtex-apps/product-summary/issues). Also feel free to [open issues](https://github.com/vtex-apps/product-summary/issues/new).

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