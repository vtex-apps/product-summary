import type { ProductSummaryTypes } from 'vtex.product-summary-context'

export function getFirstAvailableSeller(
  sellers?: ProductSummaryTypes.Seller[]
) {
  if (!sellers || sellers.length === 0) {
    return
  }

  const availableSeller = sellers.find(
    (seller) => seller.commertialOffer.AvailableQuantity !== 0
  )

  return availableSeller
}
