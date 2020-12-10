import React, { createContext, useContext } from 'react'

const ProductContext = createContext({
  skuSelector: {},
})

export const ProductContextProvider = ({ product, query, ...rest }: any) => {
  return <ProductContext.Provider value={{ product, query }} {...rest} />
}

export const useProduct = () => useContext(ProductContext)

export const useProductDispatch = () => null
