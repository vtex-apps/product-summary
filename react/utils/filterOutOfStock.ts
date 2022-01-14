import type { ProductTypes } from 'vtex.product-context'

export function filterOutOfStock(products: ProductTypes.Product[]) {
  return products.filter(
    (product) =>
      product?.items[0]?.sellers[0]?.commertialOffer?.AvailableQuantity
  )
}
