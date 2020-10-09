import React, { createContext, useContext } from 'react'

const ProductSummaryContext = createContext({})

export const ProductSummaryProvider = ({ product, ...rest }) => {
  return <ProductSummaryContext.Provider value={{ product }} {...rest} />
}

export const useProductSummary = () => {
  return useContext(ProductSummaryContext)
}

export const useProductSummaryDispatch = () => {
  return () => {}
}

export const ProductSummaryConsumer = ProductSummaryContext.Consumer
