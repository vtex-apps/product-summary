import React, { useContext } from 'react'

const Context = React.createContext({})

export const ProductSummaryProvider = ({ product, ...rest }: any) => {
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
