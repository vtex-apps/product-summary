📢 Use this project, [contribute](https://github.com/vtex-apps/product-summary) to it or open issues to help evolve it using [Store Discussion](https://github.com/vtex-apps/store-discussion).

# Product Summary

Product Summary is an app responsible for summarizing product information (such as name, price and image) in other store blocks, such as the [Shelf](https://vtex.io/docs/components/all/vtex.shelf/) and the [Minicart](https://vtex.io/docs/components/all/vtex.minicart/).

![image](https://user-images.githubusercontent.com/284515/70235170-1a503a80-1741-11ea-952d-07b178995f92.png)

## Configuration

1. Import the `vtex.product-summary` app to your theme's dependencies in the `manifest.json`:

```json
  dependencies: {
    "vtex.product-summary": "2.x"
  }
```

Now, you are able to use all blocks exported by the `product-summary` app. Check out the full list below:

| Block name     | 
| -------------- | 
| `product-summary.shelf` | 
| `product-summary-attachment-list` | 
| `product-summary-brand`         | 
| `product-summary-buy-button` | 
| `product-summary-description` | 
| `product-summary-image` |
| `product-summary-name` | 
| `product-summary-price` | 
| `product-summary-sku-selector` | 
| `product-specification-badges` | 


2. Add the `product-summary.shelf` block to the block that will host the product information, such as the Shelf. Notice that although the block's name refers to the Shelf block, it can and should be used in any block that is able to render product information, such as the Minicart and those found on the [Search Results](https://vtex.io/docs/components/all/vtex.search-result/) page.

```json
    "shelf#home": {
    "blocks": [
      "product-summary.shelf"
    ],
    
```
    
3. Then, based on the product information you desire to have rendered, choose which blocks from the exported list above will be sent as the `product-summary.shelf` children. For example:

```json
    "shelf#home": {
    "blocks": [
      "product-summary.shelf"
    ],
    "product-summary.shelf": {
    "children": [
      "product-summary-name",
      "product-summary-description"
      "product-summary-image",
      "product-summary-price",
      "product-summary-sku-selector",
      "product-summary-buy-button"
    ]
  }
}
```

In order to configure and better understand each of the Product Summary exported blocks, go through their respective documentation in the [Docs](https://github.com/vtex-apps/product-summary/tree/master/docs) folder.

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
