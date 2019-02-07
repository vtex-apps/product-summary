import { pathOr } from 'ramda'

export const CHOICE_TYPES = {
  SINGLE: 'SINGLE',
  MULTIPLE: 'MULTIPLE',
  TOGGLE: 'TOGGLE',
}

export const getProductPrice = (product) => pathOr(0, ['sku', 'seller', 'commertialOffer', 'Price'], product)

export const parentPricePerUnit = product => {
  const wholePrice = getProductPrice(product)
  const parentPrice = product.addedOptions.reduce((total, option) => 
    total - getProductPrice(option),
    wholePrice
    )
  return parentPrice / product.quantity
}

export const optionPricePerItem = (option, parent) => getProductPrice(option) / parent.quantity
