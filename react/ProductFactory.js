import random from 'lodash/random'

const DEFAULT_PRODUCT = {
  productId: '1',
  productName: 'ProductName',
  link: 'https://www.vtex.com/',
  linkText: 'product',
  brand: 'Brand',
  sku: {
    name: 'SkuName',
    referenceId: {
      Value: '321',
    },
    image: {
      imageTag:
        '<img src="" width="#width#" height="#height#" alt="Product-Name" id="" />',
    },
    seller: {
      commertialOffer: {
        Price: 1,
        ListPrice: 2,
        Installments: 1,
        InstallmentPrice: 1,
      },
    },
  },
}

export function createProduct(customProps) {
  const randomNumber = random(1, 12)
  const imageUrl = require(`../resources/images/imagem-prod-summary${randomNumber}.png`)
  const product = {
    ...DEFAULT_PRODUCT,
    ...customProps,
  }
  product.sku.imageUrl = imageUrl

  return product
}
