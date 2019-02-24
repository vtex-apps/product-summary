import { pathOr } from 'ramda'

export const CHOICE_TYPES = {
  SINGLE: 'SINGLE',
  MULTIPLE: 'MULTIPLE',
  TOGGLE: 'TOGGLE',
}

export const getProductPrice = (product) => pathOr(0, ['sku', 'seller', 'commertialOffer', 'Price'], product)

export const parentPricePerUnit = product => {
  const wholePrice = getProductPrice(product)
  const parentPrice = product.assemblyOptions.added.reduce((total, option) => 
    total - option.item.sellingPrice / 100 * option.item.quantity,
    wholePrice
    )
  return parentPrice / product.quantity
}
