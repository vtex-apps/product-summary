interface SellerDefault {
  sellerDefault: boolean
}

export function getDefaultSeller<T extends SellerDefault>(
  sellers?: T[]
): T | undefined {
  if (!sellers || sellers.length === 0) {
    return
  }

  const defaultSeller = sellers.find((seller) => seller.sellerDefault)

  if (!defaultSeller) {
    return sellers[0]
  }

  return defaultSeller
}
