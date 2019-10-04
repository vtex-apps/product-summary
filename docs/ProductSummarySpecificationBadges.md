# VTEX Product Summary Specification Badges

Use this component to show badges based on your product specifications inside your product summary block.

### Configuration

This component must be configured to be able to display the specifications properly. Its props can be configured via `blocks.json` and they are:

| Prop name                | Type                                                      | Description                                                                                                                                                                                                                                                                             | Default value |
| ------------------------ | --------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| `specificationGroupName` | `String`                                                  | The name of the specification group in which the desired specifications are                                                                                                                                                                                                             | ""            |
| `specificationName`      | `String`                                                  | Pass the name of the specification you want to target. If left empy, will target all of the group                                                                                                                                                                                       | ""            |
| `visibleWhen`            | `String`                                                  | Pass this if you want the specification to be displayed only if it has this exact value. If left empty, the badge will be showed regardless of the specification value.                                                                                                                 | ""            |
| `displayValue`           | `SPECIFICATION_NAME` or `SPECIFICATION_VALUE` or `string` | Choose the value that will appear if the specification condition is met and the badge will be showed. Pass `SPECIFICATION_NAME` if you want to display the specification name. Pass `SPECIFICATION_VALUE` if you want to display its value. Pass any other custom string to display it. | `null`        |
| `specificationsOptions`  | `Object<string, Option>`                                  | Pass this if you want to control the conditions to show certain specifications. The key to each object entry should be the specification name and the value should be an object in the `Option` format                                                                                  | `null`        |
| `orientation`            | `vertical` or `horizontal`                                | Determines if the group of specifications are showed horizontally or vertically                                                                                                                                                                                                         | `vertical`    |
| `blockClass`             | `string`                                                  | Allows to pass a custom name to be added to component css classes                                                                                                                                                                                                                       | `null`        |

`Option` type:
| Prop name | Type | Description | Default value |
| --------- | -------- | ------------------------------------------------ | ------------- |
| `visibleWhen` | `string` | Pass this if you want this option to be applied when the specification has the exactly same value as specified in `visibleWhen`. If left empty, the badge will be showed regardless of the specification value. | `null` |
| `displayValue` | `SPECIFICATION_NAME` or `SPECIFICATION_VALUE` or `string` | Choose the value that will appear if the option condition is met and the badge will be showed. Pass `SPECIFICATION_NAME` if you want to show the specification name. Pass `SPECIFICATION_VALUE` if you want to show its value. Pass any other custom string to show it. | `null` |

Important note:
All products come with a default `allSpecifications` group, that is a group that combines all specifications in your product. If you manually create another group and add a specification in it, this specification will also appear in the `allSpecifications` group. So, if you want to apply your conditions to all specification, regardless of group, you must pass the value `allSpecifications`.

### Example 1

Let's say your product has this specification groups:

```
// specificationGroups array
[
    {
      name: 'Group',
      specifications: [
        {
          name: 'On Sale',
          values: ['True'],
        },
      ],
    },
    {
      name: 'Group 2',
      specifications: [
        {
          name: 'Demo',
          values: ['True'],
        },
        {
          name: 'PromoExclusion',
          values: ['1'],
        }
      ],
    },
    {
      name: 'allSpecifications',
      specifications: [
        {
          name: 'On Sale',
          values: ['True'],
        },
        {
          name: 'Demo',
          values: ['True'],
        },
        {
          name: 'PromoExclusion',
          values: ['1'],
        },
      ],
    },
  ]
```

If you want to display all specifications with the value `True`, you could then pass:

```
"product-summary-specification-badges": {
    "props": {
      "specificationGroupName": "allSpecifications",
      "displayValue": "SPECIFICATION_NAME",
      "visibleWhen": "True"
    }
  },
```

In this case, it will appear the `On Sale` and `Demo` badges (because you passed the `SPECIFICATION_NAME` in `displayValue`).

### Example 2

Using the specification groups from example 1, we can get the same result with the specificationOptions prop:

```
  "product-summary-specification-badges": {
    "props": {
      "specificationGroupName": "allSpecifications",
      "specificationsOptions": {
        "On Sale": {
          "displayValue": "SPECIFICATION_NAME",
          "visibleWhen": "True"
        },
        "Demo": {
          "displayValue": "SPECIFICATION_NAME",
          "visibleWhen": "True"
        },
      }
    }
  },
```

### Example 3

```
// specificationGroups array
[
    {
      name: 'Group',
      specifications: [
        {
          name: 'On Sale',
          values: ['True'],
        },
      ],
    },
    {
      name: 'Group 2',
      specifications: [
        {
          name: 'Demo',
          values: ['True'],
        },
        {
          name: 'PromoExclusion',
          values: ['1'],
        }
      ],
    },
    {
      name: 'allSpecifications',
      specifications: [
        {
          name: 'On Sale',
          values: ['True'],
        },
        {
          name: 'Demo',
          values: ['My Cool Value'],
        },
        {
          name: 'PromoExclusion',
          values: ['1'],
        },
      ],
    },
  ]
```

If you want to show the value for the `Demo` specification, you could pass:

```
  "product-summary-specification-badges": {
    "props": {
      "specificationGroupName": "allSpecifications",
      "specificationsOptions": {
        "On Sale": {
          "displayValue": "SPECIFICATION_NAME",
          "visibleWhen": "True"
        },
        "Demo": {
          "displayValue": "SPECIFICATION_VALUE",
        },
      }
    }
  },
```

Final result: will appear the `On Sale` badge and a badge with `My Cool Value`.

Note the use of `SPECIFICATION_VALUE` in `displayValue` and the lack of `visibleWhen` in `Demo`.

### Example 4

Using the example given in example 3.

To show a custom string you could do:

```
  "product-summary-specification-badges": {
    "props": {
      "specificationGroupName": "allSpecifications",
      "specificationsOptions": {
        "On Sale": {
          "displayValue": "SPECIFICATION_NAME",
          "visibleWhen": "True"
        },
        "Demo": {
          "displayValue": "SPECIFICATION_VALUE",
        },
        "PromoExclusion": {
          "displayValue": "Cool Promo",
        }
      }
    }
  },
```

Final result: will appear the `On Sale` badge, a badge with `My Cool Value` and a badge with the string `Cool Promo`.

Note the usage of a custom value in the `displayValue` config.

### Usage tip

You can use our `stack-layout` to show the badges over your product image for example.

```
  "product-summary.shelf": {
    "children": [
      "product-summary-add-to-list-button",
      "stack-layout#prodsum",
      "product-summary-name",
      "product-rating-inline",
      "product-summary-space",
      "product-summary-price",
      "product-identifier.summary",
      "product-summary-buy-button"
    ]
  },

  "stack-layout#prodsum": {
    "children": [
      "product-summary-image",
      "product-summary-specification-badges"
    ]
  },

  "product-summary-specification-badges": {
    "props": {
      "specificationGroupName": "Group",
      "specificationName": "On Sale",
      "visibleWhen": "True",
      "displayValue": "SPECIFICATION_NAME"
    }
  },
```

### CSS API

| CSS class        | Description                                 |
| ---------------- | ------------------------------------------- |
| `groupContainer` | Container that wrapps the whole badge group |
| `badgeContainer` | Container for each badge                    |
| `badgeText`      | Text displayed inside badge                 |

Note: each badge also receives a class `badgeContainer` with its specification name slug appended to it.
Example: on specification `On Sale` the badge will also have the class `badgeContainer--on-sale`.
