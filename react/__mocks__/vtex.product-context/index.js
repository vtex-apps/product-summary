import React, { createContext, useContext } from 'react'

const ProductContext = createContext({
  skuSelector: {},
})

export const ProductContextProvider = ({ product, query, ...rest }) => {
  return <ProductContext.Provider value={{ product, query }} {...rest} />
}

export const useProduct = () => useContext(ProductContext)
