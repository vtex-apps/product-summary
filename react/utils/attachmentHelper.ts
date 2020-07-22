// eslint-disable-next-line no-restricted-imports
import { pathOr } from 'ramda'

export const CHOICE_TYPES = {
  SINGLE: 'SINGLE',
  MULTIPLE: 'MULTIPLE',
  TOGGLE: 'TOGGLE',
}

export const getProductPrice = (product: any) =>
  pathOr(0, ['sku', 'seller', 'commertialOffer', 'Price'], product)
