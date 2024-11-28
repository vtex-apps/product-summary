# Product Summary Image

`product-summary-image` is a block exported by the [Product Summary app](https://developers.vtex.com/docs/guides/vtex-product-summary) that renders the product image.

![foto-product-summary-image](https://cdn.jsdelivr.net/gh/vtexdocs/dev-portal-content@main/images/vtex-product-summary-productsummaryimage-0.png)

## Configuration

1. Import the `vtex.product-summary` app to your theme dependencies in the `manifest.json`:

```json
  "dependencies": {
    "vtex.product-summary": "2.x"
  }
```

2. Add the `product-summary-image` block as a child of the `product-summary.shelf` block:

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
    },
```
3. Then, declare the `product-summary-image` and configure its behavior using the props stated below.

```json
    "product-summary-image": {
      "props": {
        "showBadge": true,
        "height": 220
      }
    }
}
```

| Prop name | Type | Description | Default value |
| - | - | - | - |
| `showBadge` | `boolean` |                                                                                                                                                       Determines whether a discount badge is displayed on the product image. Setting it to `true` displays the badge if applicable, while `false` hides it. | `true` |
| `badgeText` | `string` | Specify the text to be displayed on the discount badge (if the badge is configured to be shown in the product image). |  `undefined`  |
| `showCollections` | `boolean` | ![https://img.shields.io/badge/-Deprecated-red](https://img.shields.io/badge/-Deprecated-red) Determines whether collection badges, if available, will be displayed (`true`) or not (`false`).<br><br> This prop is deprecated. Use the [Product Highlights] component instead. | `false` |
| `displayMode` | `enum` | Defines the Product Summary Image display mode. Possible values are: `normal` and `inline`. | `normal` |
| `placeholder` | `string` | Defines the Product Summary Image placeholder image. | `undefined` |
| `mainImageLabel`  | `string` | Matches the value defined in the `imageLabel` field from the Admin Catalog. When matched, it determines which product image will be used as the main image displayed in the Product Summary component. | `undefined` |
| `hoverImageLabel` | `string` |  ![https://img.shields.io/badge/-Deprecated-red](https://img.shields.io/badge/-Deprecated-red) Text value that matches the value defined in the `imageLabel` field from the Admin Catalog. When matched, it determines which product image will be displayed when the user hovers over the product. If you set a label and no match is found, no image will be displayed during hover.<br><br> This prop is deprecated. Use the `hoverImage` prop instead.| `undefined` |
| `hoverImage` | `object` | Defines the criteria that should determine the hover image based on the product images in the Admin Catalog. | `undefined` |
| `width` | `object` | Defines the Product Summary Image width. | `undefined` |
| `height` | `object` | Defines the Product Summary Image height. | `undefined` |
| `aspectRatio` | `object` | Defines the aspect ratio of the Product Summary Image, determining whether the image should be displayed in a square, portrait, landscape, or another format. The prop value should follow the [standard aspect ratio notation](https://en.wikipedia.org/wiki/Aspect_ratio_(image)), which consists of two numbers separated by a colon. For example, you can use `1:1` for a square format or `3:4` for an upright portrait. This prop will not work if the `width` or `height` props are configured. | `undefined` |
| `maxHeight` | `object` | Sets the maximum height for the Product Summary Image. This prop will only work if the `width` or `height` props are configured. | `undefined` |
| `fetchpriority` | `string` | Sets the fetch priority hint to (`'high'`, `'low'`, `'auto'`, or `'byPosition'`). Choose `'byPosition'` to adjust the image fetch priority based on its rendering position within search results or lists. This prioritization optimizes performance by ensuring images are fetched based on their relevance in the context.  | `'byPosition'` |

- `mainImageLabel` object:

| Prop name | Type | Description | Default value |
| - | - | - | - |
| `label` | `string` | Matches the text value with the value defined in the `imageLabel` field from the Admin Catalog. When matched, it determines which product image will be displayed as the main image in the Product Summary component.  If you set a label and no match is found, the main image of the product will be shown instead. | `undefined` |
| `labelMatchCriteria` | `enum` | Specifies the criteria for searching the image `label` value. It determines whether the image label should match exactly as provided or if it just needs to contain the substring anywhere in the image `label`. Possible values are: `exact` (finds the image that matches exactly the string entered in the `label` field) and `contains` (finds the first image that includes the substring entered in the `label` field). | `exact` |


- `hoverImage` object:

| Prop name | Type | Description | Default value |
| - | - | - | - |
| `criteria` | `enum` | Defines the criteria that should determine the hover image based on the product images from the Admin Catalog. Possible values are: `label` (the hover image will be the one that matches the `label` value) and `index` (the hover image will be the one with the same `index` value). | `label` |
| `label` | `string` | Determines the text string to match the desired image's `label` value. No image will be displayed during the hover if no match is found. *Caution*: This prop should only be used when the `criteria` prop is set to `label`. |  `undefined`  |
| `labelMatchCriteria` |  `enum`  | Defines the criteria for searching the image `label` value, determining whether the image label should match exactly as provided or just need to contain the substring anywhere in the image `label`. Possible values are: `exact` (finds the image that matches exactly the string entered the `label` field) and `contains` (finds the first image that includes the substring entered the `label` field). *This prop should only be used when the `criteria` prop is set to `label`*. | `exact` |
| `index` | `number` | Index number to match with the desired images. No image will be displayed during hover if no match is found. *This prop should only be used when the `criteria` prop is set to `index`*. | `undefined` |

- `width` object:

| Prop name | Type | Description | Default value |
| - | - | - | - |
| `desktop` | `number` | Image width for desktop users. | `undefined` |
| `mobile`  | `number` | Image width for mobile users. | `undefined` |

-  `height` object:

| Prop name | Type | Description | Default value |
| - | - | - | - |
| `desktop` | `number` | Image height for desktop users. |  `undefined` |
| `mobile`  | `number` | Image height for mobile users. | `undefined` |

- `aspectRatio` object:

| Prop name | Type | Description | Default value |
| - | - | - | - |
| `desktop` | `string` | Image aspect ratio for desktop users. | `undefined` |
| `mobile`  | `string` | Image aspect ratio for mobile users. | `undefined` |

- `maxHeight` object:

| Prop name | Type | Description | Default value |
| - | - | - | - |
| `desktop` | `string` | Image maximum height for desktop users. |  `undefined` |
| `mobile`  | `string` | Image maximum height for mobile users. | `undefined` |

The `width`, `height`, `aspectRatio`, and `maxHeight` props use the [responsive values logic](https://github.com/vtex-apps/responsive-values#vtexresponsive-values).

## Customization

To apply CSS customizations to this and other blocks, please see the [Using CSS handles for store customization](https://developers.vtex.com/docs/guides/vtex-io-documentation-using-css-handles-for-store-customization) guide.

| CSS handles |
| - |
| `hoverImage` |
| `hoverEffect` |
| `imageContainer` |
| `imageInline` |
| `imageNormal` |
| `imageStackContainer` |
| `mainImageHovered` |
