# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [Unreleased]
### Changed
- Use `apollo-link-state` into the `ProductQuantityStepper` instead of the `orderFormConsumer`.

## [2.13.1] - 2019-03-14
### Changed
- Use most generic language files.

## [2.13.0] - 2019-03-13

### Added

- Add new type of product summary (inline price).

## [2.12.0] - 2019-02-27

### Changed

- Start using assembly resolvers from `store-graphql`

### Added

- Show assembly options removed from item by user

### Fixed

- Fix tests.

## [2.11.3] - 2019-02-22

### Fixed

- Incorrect click area on product.

### Added

- Add snapshot tests.

### Fixed

- Remove enzyme.

## [2.11.2] - 2019-02-14

## [2.11.1] - 2019-02-14

## [2.11.0] - 2019-02-13

### Added

- Create a API Docs.
- Add the optimistic minicart strategy props to the `BuyButton`.

## [2.10.6] - 2019-02-12

### Fixed

- Remove unused prop `showButtonOnHover`.

## [2.10.5] - 2019-02-11

### Changed

- Remove fixed height in `ProductName` and `ProductPrice`.

## [2.10.4] - 2019-02-11

#### Changed

- Remove fixed width.

## [2.10.3] - 2019-02-08

### Fixed

- Use initialQuantity of item composition to decide what attachment to show

## [2.10.2] - 2019-02-07

### Fixed

- Put the products' quantity selector in a different line of product price to avoid information overlapping.

## [2.10.1] - 2019-02-06

### Fixed

- `ProductSummary` Information uses the whole space.

## [2.10.0] - 2019-02-05

### Added

- Add the product description into the product summary - normal mode.

## [2.9.13] - 2019-02-04

### Fixed

- Buy button types not working properly.
- Display buy button on mobile devices.

### Changed

- Storefront label names when option is only for web devices.

## [2.9.12] - 2019-02-01

### Changed

- Create different components for each display mode (`ProductSummaryNormal`, `ProductSummarySmall` and `ProductSummaryInline`).

## [2.9.11] - 2019-02-01

### Fixed

- Fix misuse of `isEmpty` from `Ramda`.

## [2.9.10] - 2019-01-31

### Fixed

- Add better guard in `ProductImage` when productClusters is empty.

## [2.9.9] - 2019-01-30

### Fixed

- Image container and info size proportion for inline mode
- Make price font smaller if price > 100 in inline mode

## [2.9.8] - 2019-01-30

### Fixed

- Fix `ProductImage` crash with productClusters prop undefined.

## [2.9.7] - 2019-01-30

### Changed

- Extract internal components to better reuse.

## [2.9.6] - 2019-01-29

### Fixed

- Fix styles for inline mode broken by previous wrong rebases
- Remove `blocks.json`

### Changed

- Adapt to use choiceType on assembly options as enums (SINGLE, TOGGLE, MULTIPLE)

## [2.9.5] - 2019-01-28

### Fixed

- Make inline content occupy full width
- While updating item quantity, show spinner over price
- Make price and quantity stepper align on baseline and not center

## [2.9.4] - 2019-01-28

### Fixed

- Render method only rendering the price.

## [2.9.3] - 2019-01-26

### Fixed

- Replace generic html tags to html5 tags for a more semantic approach.

## [2.9.2] - 2019-01-26

- Use `ProductName` as H2 element.

## [2.9.1] - 2019-01-26

### Fixed

- Fix different images size in `ProductSummary`.

## [2.9.0] - 2019-01-26

### Added

- Pass more informations to `BuyButton`.

## [2.8.0] - 2019-01-23

## [2.7.2] - 2019-01-22

### Fixed

- Fix crash when products doesn't exist.

## [2.7.1] - 2019-01-18

### Changed

- Adjust the way to import render-runtime components.

## [2.7.0] - 2019-01-18

### Changed

- Bump vtex.styleguide to 9.x.

## [2.6.0] - 2019-01-18

### Changed

- Update React builder to 3.x

## [2.5.0] - 2019-01-16

### Added

- Quantity stepper for inline mode
- Support for products with attachments (for delivery)

### Changed

- Break index file into smaller components

## [2.4.1] - 2019-01-14

### Fixed

- Remove `undefined` css classes.

## [2.4.0] - 2019-01-09

### Changed

- Bye `pages.json`! Welcome `store-builder`.

## [2.3.3] - 2019-01-04

### Fixed

- Fix price's typography class.

## [2.3.2] - 2018-12-21

### Fixed

- Variable component height.

## [2.3.1] - 2018-12-14

### Changed

- Changed price color.

## [2.3.0] - 2018-12-14

### Added

- Support to CSS modules.

### Changed

- Add messages-builder and move locales to `messages/` folder.

## [2.2.0] - 2018-12-14

### Changed

- Add buy button display option on StoreFront.

## [2.1.2] - 2018-12-12

### Fixed

- Unavailable button layout.

## [2.1.1] - 2018-12-12

### Fixed

- Remove `min-heigth` in `vtex.price` class.

## [2.1.0] - 2018-12-06

### Fixed

- Unnecessary `BuyButton` rendering.

## [2.0.3] - 2018-12-05

### Fixed

- `BuyButton` position when `ProductPrice` didn't have all fields.

## [2.0.2] - 2018-12-04

### Changed

- Improve padding and font weights
- Update store components version

## [2.0.1] - 2018-12-03

### Fixed

- Update dependencies in `package.json`.

## [2.0.0] - 2018-11-28

### Changed

- Add Design Tokens on Product Summary.

## [1.6.2] - 2018-11-27

### Fixed

- Fix svg warning caused by the `ContentLoader`.

## [1.6.1] - 2018-11-27

### Fixed

- Now, buy button doesn't move the product summary box when is hidden.

## [1.6.0] - 2018-11-26

### Added

- Add the `showBorders` property to the schema.
- Add optional function that runs when a product is clicked.

## [1.5.1] - 2018-11-26

### Fixed

- Buy button not showing on hover's action when this option is active on frontstore.

## [1.5.0] - 2018-11-07

### Added

- Export the `labelSellingPrice` of ProductPrice through the props.

## [1.4.1] - 2018-10-25

### Fixed

- Add sellerId in `BuyButton` component.

## [1.4.0] - 2018-10-02

### Added

- New display modes of the summary (small and inline).

## [1.3.0] - 2018-09-28

## [1.2.0] - 2018-09-28

### Fixed

- Availability verification

## [1.1.0] - 2018-08-31

### Changed

- Update the `store-components` version.

## [1.0.1] - 2018-08-22

### Changed

- Using `ProductName` own schema

## [1.0.0] - 2018-08-21

### Added

- Show product: sku, reference and brand to the schema.

### Changed

- Rename the main file to `index.js`

## [0.8.8] - 2018-08-16

## [0.8.7] - 2018-08-15

## [0.8.6] - 2018-08-15

### Fixed

- Content loader to work on Firefox.

## [0.8.5] - 2018-08-08

### Added

- `ProductSummary` content loader style and logic.

## [0.8.4] - 2018-08-02

### Changed

- button text position
- the default value which indicates if the `CollectionBadges` should be displayed or not.

## [0.8.3] - 2018-07-12

### Fixed

- `BuyButton` passed props.

## [0.8.2] - 2018-7-9

### Added

- Add the `showCollections` property to the schema.

## [0.8.1] - 2018-6-21

### Added

- Prop to set whether or not to show the collection badges.

### Fixed

- Error when `productClusters` were `undefined`.

## [0.8.0] - 2018-6-20

### Added

- Integration with `vtex.store-components/CollectionBadges`

## [0.7.0] - 2018-6-18

### Added

- `isLayout` to schema properties.

## [0.6.0] - 2018-6-11

### Added

- Added isOneClickBuy attribute.
- Add internationalization into `ProductSummary` schema

### Changed

- `ProductSummary` schema to reuse the `ProductPrice` one

## [0.5.1] - 2018-05-29

### Fixed

- Fix `vtex.store-components` dependency.
- Fix Installments property passed to _ProductPrice_ component.

## [0.5.0] - 2018-05-21

### Changed

- Update product price name.
- Update `vtex.storecomponents` dependency version to `1.x`
- Remove `@vtex/buy-button` and `@vtex/product-details` dependencies and use `vtex.storecomponents`.

## [0.4.2] - 2018-05-11

### Changed

- Remove `afterClick` param of BuyButton call.

## [0.4.1] - 2018-05-10

### Changed

- Change dependencies to use the buy button being provided by `vtex.storecomponents` app instead of npm module.

### Fixed

- Move buy button to outside of product page link

## [0.4.0] - 2018-05-09

### Changed

- Update productSummary to get `skuId`, and pass through `BuyButton` component.

## [0.3.1] - 2018-05-08

### Fixed

- Fix Link component params to use `linkText` in a prop slug

## [0.3.0] - 2018-05-07

### Added

- Add the Product Image component which is responsible to display a main image and a list of thumbnail images of a Product.

### Changed

- Use the _Link_ Component from _render_ module.
- Use _Price_, _ProductName_ and _DiscountBadge_ from [npm-storecomponents](https://github.com/vtex-apps/npm-storecomponents).

### Fixed

- Fix components style that was overwritten by the _Link_ Component.

### Removed

- Removed _ProductImage_ Component and it's dependencies.

## [0.2.1] - 2018-04-27

### Fixed

- Fix summary style on mobile screens with the shelf component

## [0.2.0] - 2018-04-26

### Added

- Add the component dynamic schema props to hide the `showButtonOnHover` property if `hideBuyButton` is activated.

### Fixed

- Does not show list price when it is equal to selling price
- Always shows the buy button on mobile if `showButtonOnHover` is activated (smartphones and tablets)

* Add default schema props to the _Product Summary_

## [0.1.0] - 2018-04-24

### Added

- **Component** Create the VTEX Store Component _Product Summary_
