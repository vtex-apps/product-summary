import type { ProductTypes } from 'vtex.product-context'

export function getDefaultSeller(sellers?: ProductTypes.Seller[]) {
  if (!sellers || sellers.length === 0) {
    return
  }

  const defaultSeller = sellers.find((seller) => seller.sellerDefault)

  if (!defaultSeller) {
    return sellers[0]
  }

  return defaultSeller
}
