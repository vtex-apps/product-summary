import React from 'react'
import { ListContextProvider } from 'vtex.list-context'

const ProductSummaryListChildren = ({ children, newList }) => (
  <ListContextProvider list={newList}>{children}</ListContextProvider>
)

export default ProductSummaryListChildren
