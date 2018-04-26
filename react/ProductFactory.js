import random from 'lodash/random'

const DEFAULT_PRODUCT = {
  listPrice: 2,
  sellingPrice: 1,
  installments: 1,
  installmentPrice: 1,
  name: 'ProductName',
  url: 'https://www.vtex.com/',
  skuName: 'SkuName',
  brandName: 'BrandName',
  skuId: 12,
}

export function createProduct(customProps) {
  const randomNumber = random(1, 12)
  const imageUrl = require(`../resources/images/imagem-prod-summary${randomNumber}.png`)
  return Object.assign({ imageUrl }, DEFAULT_PRODUCT, customProps)
}
