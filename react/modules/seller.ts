import { ProductTypes } from 'vtex.product-context'

export function getFirstAvailableSeller(sellers?: ProductTypes.Seller[]) {
  if (!sellers || sellers.length === 0) {
    return
  }

  const availableSeller = sellers.find(
    (seller) => seller.commertialOffer.AvailableQuantity !== 0
  )

  return availableSeller
}
