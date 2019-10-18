# Product Summary Name

## Description

`ProductSummarySKUSelector` is a VTEX Component that renders the product's name.
This Component can be imported and used by any VTEX App.

:loudspeaker: **Disclaimer:** Don't fork this project; use, contribute, or open issue with your feature request.

## Table of Contents
- [Usage](#usage)
  - [Blocks API](#blocks-api)
  - [Configuration](#configuration)
  - [Styles API](#styles-api)

## Usage

You should follow the usage instruction in the main [README](https://github.com/vtex-apps/product-summary/blob/master/README.md#usage).

Then, add `product-summary-sku-selector` block into your app theme, as we do in our [Product Summary app](https://github.com/vtex-apps/product-summary/blob/master/store/blocks.json).

### Blocks API

This component has an interface that describes which rules must be implemented by a block when you want to use the `ProductSummarySKUSelector`.

```json
  "product-summary-sku-selector": {
    "component": "ProductSummarySKUSelector"
  }
```

### Configuration

You can't configure anything of this component through Site Etor at the moment, only using the block of it.

You can find all options available in [Store Components SKU Selector app](https://github.com/vtex-apps/store-components/blob/master/docs/SKUSelector.md).

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
.SKUSelectorContainer {
  margin-top: 10px;
}
```

#### CSS namespaces

Below, we describe the namespaces that are defined in the menu.

| Token name   | Description                                          | Component Source                     |
| ------------ | ---------------------------------------------------- | ------------------------------------ |
| `SKUSelectorContainer` | The main container of SKUSelector | [index](/react/components/ProductSummarySKUSelector/index.js) |
