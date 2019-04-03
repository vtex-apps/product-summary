import { createContext } from 'react'

const ProductSummaryContext = createContext(0)
const ProductSummaryNameContext = createContext(0)
const ProductSummaryPriceContext = createContext(0)
const ProductSummaryBuyButtonContext = createContext(0)

export default ProductSummaryContext

export {
  ProductSummaryNameContext,
  ProductSummaryPriceContext,
  ProductSummaryBuyButtonContext
}
