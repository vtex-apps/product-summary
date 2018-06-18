# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [Unreleased]
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
