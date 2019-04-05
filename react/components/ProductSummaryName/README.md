# Product Summary Name

## Description

`ProductSummaryName` is a VTEX Component that render the buy button.
This Component can be imported and used by any VTEX App.

:loudspeaker: **Disclaimer:** Don't fork this project; use, contribute, or open issue with your feature request.

## Table of Contents
- [Usage](#usage)
  - [Blocks API](#blocks-api)
  - [Configuration](#configuration)
  - [Styles API](#styles-api)

## Usage

You should follow the usage instruction in the main [README](https://github.com/vtex-apps/product-summary/blob/master/README.md#usage).

Then, add `product-summary-name` block into your app theme, as we do in our [Product Summary app](https://github.com/vtex-apps/product-summary/blob/master/store/blocks.json).

### Blocks API

This component has an interface that describes which rules must be implemented by a block when you want to use the `ProductSummaryName`.

```json
  "product-summary-name": {
    "component": "ProductSummaryName"
  }
```

### Configuration

Through the Storefront, you can change the `ProductSummaryName`'s behavior and interface. However, you also can make in your theme app.

You can find all options available in [Store Components Product Name app](https://github.com/vtex-apps/store-components/blob/master/react/components/ProductName/README.md).

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
.nameContainer {
  margin-top: 10px;
}
```

#### CSS namespaces

Below, we describe the namespaces that are defined in the menu.

| Token name   | Description                                          | Component Source                     |
| ------------ | ---------------------------------------------------- | ------------------------------------ |
| `nameContainer` | The main container of name | [index](/react/components/ProductSummaryName/ProductSummaryName.js) |
