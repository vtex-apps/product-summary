# Product Summary Image

`product-summary-image` is a block exported by the Product Summary app that renders the product's image.

![foto product-summary-image](https://user-images.githubusercontent.com/52087100/79134289-d5d64a80-7d83-11ea-84e6-a5a237acfae1.png)

## Configuration

:warning: The `product-summary-image` is exported by the Product Summary app. Therefore, in order to configure it as a block, you must first follow the configuration instructions given in the [**Product Summary main documentation**](https://vtex.io/docs/components/all/vtex.product-summary@2.53.0/).

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
  "product-summary-image": {
    "props": {
      "showBadge": true,
      "height": 220
    }
  }
}
```

| Prop name         | Type      | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Default value |
| `showBadge`       | `boolean` | Whether a discount badge (if there is any) will be displayed on the product's image (`true`) or not (`false`)                                                                                                                                                                                                                                                                                                                                                                               | `true`        |
| `badgeText`       | `string`  | Text displayed on the discount badge (in case the badge is configured to be displayed on the image).                                                                                                                                                                                                                                                                                                                                                                                        | `undefined`   |
| `showCollections` | `boolean` | Whether collection badges (if there are any) will be displayed (`true`) or not (`false`).                                                                                                                                                                                                                                                                                                                                                                                                   | `false`       |
| `displayMode`     | `enum`    | Defines the Product Summary Image display mode. Possible values are: `normal` and `inline`.                                                                                                                                                                                                                                                                                                                                                                                                 | `normal`      |
| `placeholder`     | `string`  | Defines the Product Summary Image placeholder image.                                                                                                                                                                                                                                                                                                                                                                                                                                        | `undefined`   |
| `mainImageLabel`  | `string`  | Text value that matches the value defined in the `imageLabel` field from the admin's Catalog. Once matched, it defines which product image will be the main image displayed in the Product Summary component. If you set a label and no match is found, the main image of the product will be shown instead.                                                                                                                                                                                | `undefined`   |
| `hoverImage`      | `object`  | The criteria that will be used to match the hover image in the product images list from the admin's Catalog.                                                                                                                                                                                                                                                                                                                                                                                | `undefined`   |
| `width`           | `object`  | Defines the Product Summary Image width.                                                                                                                                                                                                                                                                                                                                                                                                                                                    | `undefined`   |
| `height`          | `object`  | Defines the Product Summary Image height.                                                                                                                                                                                                                                                                                                                                                                                                                                                   | `undefined`   |
| `aspectRatio`     | `object`  | Aspect ratio of the Product Summary Image. It defines whether the image should be displayed in a square, portrait, landscape or in another format. The prop value should follow the [common aspect ratio notation](<https://en.wikipedia.org/wiki/Aspect_ratio_(image)>), which gives two numbers separated by a colon. For example: `1:1` for a square format or `3:4` for an upright portrait. Note that this prop won't work if you've already configured the `width` or `height` props. | `undefined`   |
| `maxHeight`       | `object`  | Defines the Product Summary Image max height. Note that this prop won't work if you've already configured the `width` or `height` props.                                                                                                                                                                                                                                                                                                                                                    | `undefined`   |

- `hoverImage` object:

| Prop name  | Type     | Description                                                                                                                                                                                                                                                                                                                | Default value |
| ---------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| `criteria` | `enum`   | The criteria that will be used to match the hover image in the product images list from the admin's Catalog. Possible values are: `label` and `index`.                                                                                                                                                                     | `label`       |
| `label`    | `string` | If `criteria` is set to `label` this will be the value that matches the value defined in the `imageLabel` field from the admin's Catalog. Once matched, it defines which product image will be displayed when the user is hovering. If you set a label and no match is found, no image will be displayed during the hover. | `undefined`   |
| `index`    | `number` | Works the same as `label` but only when `criteria` is set to `index`.                                                                                                                                                                                                                                                      | `undefined`   |

- `width` object:

| Prop name | Type     | Description                          | Default value |
| --------- | -------- | ------------------------------------ | ------------- |
| `desktop` | `number` | Image width for desktop users.       | `undefined`   |
| `mobile`  | `number` | Image width for mobile device users. | `undefined`   |

- `height` object:

| Prop name | Type     | Description                           | Default value |
| --------- | -------- | ------------------------------------- | ------------- |
| `desktop` | `number` | Image height for desktop users.       | `undefined`   |
| `mobile`  | `number` | Image height for mobile device users. | `undefined`   |

- `aspectRatio` object:

| Prop name | Type     | Description                                 | Default value |
| --------- | -------- | ------------------------------------------- | ------------- |
| `desktop` | `number` | Image aspect ratio for desktop users.       | `undefined`   |
| `mobile`  | `number` | Image aspect ratio for mobile device users. | `undefined`   |

- `maxHeight` object:

| Prop name | Type     | Description                                   | Default value |
| --------- | -------- | --------------------------------------------- | ------------- |
| `desktop` | `number` | Image maximum height for desktop users.       | `undefined`   |
| `mobile`  | `number` | Image maximum height for mobile device users. | `undefined`   |

The `width`, `height`, `aspectRatio` and `maxHeight` props use the [responsive values logic](https://github.com/vtex-apps/responsive-values#vtexresponsive-values).

## Customization

In order to apply CSS customization to this and other blocks, follow the instructions given in the recipe on [Using CSS Handles for store customization](https://vtex.io/docs/recipes/style/using-css-handles-for-store-customization).

| CSS Handles           |
| --------------------- |
| `imageContainer`      |
| `imageNormal`         |
| `imageInline`         |
| `imageStackContainer` |
| `hoverImage`          |
| `hoverEffect`         |
