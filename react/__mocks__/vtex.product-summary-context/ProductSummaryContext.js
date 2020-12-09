import React, { createContext, useContext } from 'react'

const Context = createContext({})

export const ProductSummaryProvider = ({ product, ...rest }) => {
  return <Context.Provider value={{ product }} {...rest} />
}

export const useProductSummary = () => {
  return useContext(Context)
}

export const useProductSummaryDispatch = () => {
  return () => {}
}

export const ProductSummaryContext = {
  ProductSummaryProvider,
  useProductSummary,
  useProductSummaryDispatch,
}
