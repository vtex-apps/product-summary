📢 Use this project, [contribute](https://github.com/vtex-apps/product-summary) to it or open issues to help evolve it using [Store Discussion](https://github.com/vtex-apps/store-discussion).

# Product Summary

<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->

Product Summary is an app responsible for summarizing product information (such as name, price and image) in other store blocks, such as the [Shelf](https://vtex.io/docs/components/all/vtex.shelf/) and the [Minicart](https://vtex.io/docs/components/all/vtex.minicart/).

![image](https://user-images.githubusercontent.com/284515/70235170-1a503a80-1741-11ea-952d-07b178995f92.png)

## Configuration

1. Import the `vtex.product-summary` app to your theme's dependencies in the `manifest.json`:

```json
  "dependencies": {
    "vtex.product-summary": "2.x"
  }
```

Now, you are able to use all blocks exported by the `product-summary` app. Check out the full list below:

| Block name     | Description | 
| -------------- | ----------- | 
| `product-summary.shelf` | ![https://img.shields.io/badge/-Mandatory-red](https://img.shields.io/badge/-Mandatory-red) Logical block responsible for providing the needed structure, data and context for its child blocks (listed below). 
| `product-summary-attachment-list` | Renders a list for the product [attachments](https://help.vtex.com/tutorial/adding-an-attachment--7zHMUpuoQE4cAskqEUWScU). | 
| `product-summary-brand`         | Renders the product brand. | 
| `product-summary-buy-button` | Renders the Buy Button. Notice that this block should only be configured if your store uses the [Minicart v1](https://github.com/vtex-apps/minicart/blob/383d7bbd3295f06d1b5854a0add561a872e1515c/docs/README.md). If it uses the [Minicart v2](https://vtex.io/docs/components/all/vtex.minicart/), you should configure the [Add To Cart Button](https://vtex.io/docs/components/all/vtex.add-to-cart-button/) instead.  | 
| `product-summary-description` | Renders the product description. | 
| `product-summary-image` | Renders the product image. | 
| `list-context.product-list` | Renders a list of products in the Product Summary. | 
| `product-summary-name` | Renders the product name. | 
| `product-summary-price` | Renders the product price. | 
| `product-summary-sku-selector` | Renders the SKU Selector block. | 
| `product-specification-badges` | Renders badges based on the product specifications. |

2. Add the `product-summary.shelf` block to the block that will host the product information, such as the Shelf. Notice that although the block's name refers to the Shelf block, it can and should be used in any block that is able to render summarizing product information, such as the Minicart and those found on the [Search Results](https://vtex.io/docs/components/all/vtex.search-result/) page.

```json
    "shelf#home": {
    "blocks": [
      "product-summary.shelf"
    ],
    }
```
    
3. Then, based on the product information you desire to have rendered, choose which blocks from the exported list above will be sent as the `product-summary.shelf` children. In a scenario in which we want to display the product name, description, image, price, a SKU selector and then a Buy Button, it would go as follows:

```json
   {
  "shelf#home": {
    "blocks": ["product-summary.shelf"]
  },

  "product-summary.shelf": {
    "children": [
      "product-summary-name",
      "product-summary-description",
      "product-summary-image",
      "product-summary-price",
      "product-summary-sku-selector",
      "product-summary-buy-button"
    ]
  }
}
```

In order to configure and better understand each of the Product Summary exported blocks, go through their respective documentation in the [Docs](https://github.com/vtex-apps/product-summary/tree/master/docs) folder.

## Customization

In order to apply CSS customizations in this and other blocks, follow the instructions given in the recipe on [Using CSS Handles for store customization](https://vtex.io/docs/recipes/style/using-css-handles-for-store-customization).

| CSS Handles                | 
| -------------------------- |
| `aspectRatio`              |
| `buyButton`                |
| `buyButtonContainer`       |
| `clearLink`                |
| `column`                   |
| `container`                |
| `containerNormal`          |
| `containerSmall`           |
| `containerInline`          |
| `description`              |
| `element`                  |
| `image`                    |
| `imageContainer`           |
| `imagePlaceholder`         |
| `information`              |
| `isHidden`                 |
| `nameContainer`            |
| `priceContainer`           |
| `quantityStepperContainer` |
| `spacer`                   |

<!-- DOCS-IGNORE:start -->

## Contributors ✨

Thanks goes to these wonderful people:

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://github.com/gustavopvasconcellos"><img src="https://avatars1.githubusercontent.com/u/49173685?v=4" width="100px;" alt=""/><br /><sub><b>gustavopvasconcellos</b></sub></a><br /><a href="https://github.com/vtex-apps/product-summary/commits?author=gustavopvasconcellos" title="Code">💻</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind are welcome!
<!-- DOCS-IGNORE:end -->
