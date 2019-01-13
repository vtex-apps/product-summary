export const parentPricePerUnit = product => {
  const wholePrice = product.sku.seller.commertialOffer.Price
  const parentPrice = product.addedOptions.reduce((total, { sku }) => 
    total - sku.seller.commertialOffer.Price,
    wholePrice
    )
  return parentPrice / product.quantity
}

export const optionPricePerItem = (option, parent) => 
  option.sku.seller.commertialOffer.Price / parent.quantity