# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [Unreleased]
### Changed
- import product search query directly.
- Improve performance of ProductSummaryList by memoing data.

## [2.51.4] - 2020-02-13
### Fixed
- Remove `skuId` from query string if no SKU is selected.

## [2.51.3] - 2020-02-11
### Changed
- Only display `mainImageLabel` image if no image variant sku is selected.

## [2.51.2] - 2020-02-10
### Removed
-  `containerRef` from `ProductSummary` since it doesn't need it anymore.

## [2.51.1] - 2020-02-07
### Fixed
- Missing error handling logic for productSearch query.

## [2.51.0] - 2020-02-06
### Added
- `ProductSummaryList` component.

## [2.50.2] - 2020-02-05

## [2.50.1] - 2020-01-23

## [2.50.0] - 2020-01-23
### Added
- Allow `product-bookmark`.

## [2.49.0] - 2020-01-14 [YANKED]

## [2.48.1] - 2020-01-10
### Fixed
- Add missing `nameContainer` CSS handle.

## [2.48.0] - 2020-01-07
### Added
- `mainImageLabel` prop to `ProductSummaryImage`

## [2.47.0] - 2020-01-02
### Added
- `containerRef` prop to the `product-summary`.

## [2.46.2] - 2019-12-05

## [2.46.1] - 2019-11-25

## [2.46.0] - 2019-11-19
### Added
- `add-to-cart-button` to the allowed list for product-summary.shelf interface.

## [2.45.1] - 2019-11-19
### Added
- `brandId` on the propTypes.

## [2.45.0] - 2019-11-11
### Added
- Allow `rich-text` and `flex-layout` inside `product-summary.shelf`.

## [2.44.1] - 2019-11-11

## [2.44.0] - 2019-11-11
### Added
- Support for priceRange product resolver.

## [2.43.4] - 2019-11-04
### Fixed
- Make product image fit its container.

## [2.43.3] - 2019-11-01
### Fixed
- Fixed lazy prop on ProductSummaryImage.

## [2.43.2] - 2019-10-31
### Added
- New CSS handles.

## [2.43.1] - 2019-10-28
### Changed
- `ProductSummaryName` line height.

## [2.43.0] - 2019-10-24
### Added
- `showDiscountValue` to ProductSummaryPrice.

## [2.42.2] - 2019-10-24
### Changed
- Temporarily disable `showSavings`.

## [2.42.1] - 2019-10-24
### Changed
- Add `data-testid` to `ProductSummaryBuyButton` to make it easier to test the component.

## [2.42.0] - 2019-10-24
### Added
- Allow `product-teaser.summary` on `product-summary-column`.

## [2.41.0] - 2019-10-23
### Changed
- Images not visible and with `width`/`height` props set are set to `lazy`.

## [2.40.0] - 2019-10-23
### Added
- `showSavings` to ProductSummaryPrice.

## [2.39.0] - 2019-10-23
### Added
- Prop `buyButtonBehavior` to `ProductSummaryBuyButton`.
- `ProductSummarySKUSelector` component.

## [2.38.1] - 2019-10-22
### Fixed
- Pixel event when updating item quantity.

## [2.38.0] - 2019-10-21
### Added
- CSS handle to `ProductSummaryName`.

## [2.37.3] - 2019-10-17
### Changed
- Set max-width of `300px` to `ProductSummary` component.

## [2.37.2] - 2019-10-15
### Added
- ImagePlaceholder to flexible `product-sumary-image`.

## [2.37.1] - 2019-10-14
### Fixed
- Fixes issue where the image placeholder was getting huge.

## [2.37.0] - 2019-10-11
### Added
- `width` and `height` props on `product-summary-image`.

### Fixed
- `BuyButton`adding to cart when the product has more than one SKU.

## [2.36.0] - 2019-10-08
### Added
- Create `product-summary-specification-badges`.

## [2.35.1] - 2019-09-20
### Fixed
- Cleans up some dependencies--uses `debounce` library in favour of `lodash/debounce`.

## [2.35.0] - 2019-09-19
### Added
- `customToastURL` prop to be passed down into `BuyButton`.

## [2.34.5] - 2019-09-13
### Fixed
- Add missing pricing messages

## [2.34.4] - 2019-08-30
### Fixed
- Flexible component titles.

## [2.34.3] - 2019-08-29

## [2.34.2] - 2019-08-29

## [2.34.1] - 2019-08-28
### Fixed
- Protect against empty arrays in parsing from catalog function.

## [2.34.0] - 2019-08-27
### Added
- `product-summary-quantity` to the shelf's allowed array

## [2.33.0] - 2019-08-20
### Added
- `ProductSummaryBrand` component

## [2.32.2] - 2019-08-09
### Fixed
- Interaction with the quantity input in the minicart was trigerring the link.

## [2.32.1] - 2019-08-09
### Fixed
- Fix styles issues with overflows.

## [2.32.0] - 2019-08-06
### Added
- Prop `hoverImageLabel` to `product-summary-image`.
- Created function to normalize product-summary and use it uniformly in other components.

## [2.31.0] - 2019-08-01
### Added
- Allow product-teaser.summary.

## [2.30.0] - 2019-07-26
### Changed
- Add capability to show assembly options of assembly options.

## [2.29.2] - 2019-07-23
### Changed
- Use private function provided by BuyButton component to normalize its props.

## [2.29.1] - 2019-07-17

## [2.29.0] - 2019-07-10
### Added
- Prop to show muted state.

## [2.28.0] - 2019-07-08
### Changed
- Uses link with product id instead of `/p` only

## [2.27.0] - 2019-07-04
### Deprecated

- `ProductSummaryContext`.

### Changed

- Use `vtex.product-summary-context` instead of local context.

### Added

- `product-identifier` as allowed block.

## [2.26.2] - 2019-07-03

## [2.26.1] - 2019-07-03

## [2.26.0] - 2019-07-02

### Changed

- Uses product id to link to product page

## [2.25.1] - 2019-06-27

### Fixed

- Build assets with new builder hub.

## [2.25.0] - 2019-06-10

### Added

- Missing interface to handle Wishlist button when using `product-summary.shelf`.

### Fixed

- Add `product-rating-inline` to `product-summary-column`.

## [2.24.2] - 2019-06-04

### Changed

- Updated `vtex.pixel-manager`.

## [2.24.1] - 2019-05-28

### Added

- ProductSummaryPrice content properties to `contentSchemas.json`.

## [2.24.0] - 2019-05-28

### Added

- List and Selling price range feature to `ProductSummaryPrice`.

## [2.23.1] - 2019-05-27

### Changed

- Use absolute path for definitions in `interfaces.json`.

## [2.23.0] - 2019-05-27

### Added

- Send cart events to Pixel Manager when updating quantity of product.

## [2.22.0] - 2019-05-27

### Added

- `contentSchemas.json` for definition of content properties.
- i18n content edition support through CMS.

## [2.21.0] - 2019-05-21

### Fixed

- Include `labelListPrice` prop in `productSummaryPrice`.

## [2.20.3] - 2019-05-14

### Fixed

- ProductQuantityStepper was sending undefined seller param to updateItems mutation.

## [2.20.2] - 2019-05-13

### Fixed

- Show `ImagePlaceholder` when the image cannot be fetched (e.g.: offline).

## [2.20.1] - 2019-05-09

### Fixed

- Attachment related messages had IDs like storefront props and were not showing properly after message scope change.

## [2.20.0] - 2019-05-08

### Added

- Add a `imagePlaceholder` CSS handler.

## [2.19.2] - 2019-04-30

### Fixed

- Fix `ProductImage` product evaluation.

## [2.19.1] - 2019-04-30

### Fixed

- Do not render `ProductPrice` when selling price is zero.
- Remove content loader from `ProductImage` and put a placeholder when the product has no image.

## [2.19.0] - 2019-04-29

### Fixed

- Interfaces to inject the `wishlist` plugins.
- `inlinePrice` height to fit its parent's height.

## [2.18.1] - 2019-04-26

### Changed

- Rename `product-summary.unstable--flex` to `product-summary.shelf`

## [2.18.0] - 2019-04-25

### Added

- Allow `product-rating-inline` in `product-summary.unstable--flex`.

## [2.17.0] - 2019-04-24

### Changed

- Scope Messages

## [2.16.0] - 2019-04-15

## [2.15.3-beta] - 2019-04-15

## [2.15.2] - 2019-04-08

### Fixed

- Legacy should use attachment list component from legacy.

## [2.15.1] - 2019-04-08

### Fixed

- Rename interface `_` to `product-summary-space` to prevent conflict.

## [2.15.0] - 2019-04-08

### Added

- Added new experimental `product-summary.unstable--flex`, under an `unstable--` flag.

## [2.14.5] - 2019-04-01

### Fixed

- Product shape prop-types.

## [2.14.4] - 2019-04-01

### Changed

- Use `cartIndex` to correctly update items quantity on cart.

## [2.14.3] - 2019-03-28

### Fixed

- Replace `background-image` for `img` on Image component.

## [2.14.2] - 2019-03-28

### Added

- Add tachyons class `w-100` to `ProductSummaryNormal` container.

## [2.14.1] - 2019-03-27

### Fixed

- Remove spread on `getSchema` that was crashing site editor.

### Added

- Add tests.
- Add interface to inject the `wish-list` plugin in the normal mode.
- Add `showQuantitySelector` props to set the quantity selector visibility in the inline mode.

## [2.14.0] - 2019-03-21

## [2.12.1-hkignore] - 2019-03-11

### Changed

- Use Apollo local state managment into the `ProductQuantityStepper` instead of the `orderFormConsumer`.

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
