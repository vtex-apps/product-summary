import pathOr from 'ramda/src/pathOr'

export const CHOICE_TYPES = {
  SINGLE: 'SINGLE',
  MULTIPLE: 'MULTIPLE',
  TOGGLE: 'TOGGLE',
}

export const getProductPrice = (product: any) =>
  pathOr(0, ['sku', 'seller', 'commertialOffer', 'Price'], product)
