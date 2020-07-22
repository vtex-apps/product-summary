import React, { useMemo } from 'react'
import { ExtensionPoint, useTreePath } from 'vtex.render-runtime'
import { useListContext, ListContextProvider } from 'vtex.list-context'
import { ProductListContext } from 'vtex.product-list-context'

import { mapCatalogProductToProductSummary } from './utils/normalize'
import ProductListEventCaller from './components/ProductListEventCaller'

const { ProductListProvider } = ProductListContext

const List = ({ children, products }) => {
  const { list } = useListContext()
  const { treePath } = useTreePath()

  const newListContextValue = useMemo(() => {
    const componentList =
      products &&
      products.map((product) => {
        const normalizedProduct = mapCatalogProductToProductSummary(product)

        return (
          <ExtensionPoint
            id="product-summary"
            key={product.id}
            treePath={treePath}
            product={normalizedProduct}
          />
        )
      })

    return list.concat(componentList)
  }, [products, treePath, list])

  return (
    <ListContextProvider list={newListContextValue}>
      {children}
    </ListContextProvider>
  )
}

const ProductSummaryListWithoutQuery = ({ children, products }) => {
  return (
    <ProductListProvider>
      <List products={products}>{children}</List>
      <ProductListEventCaller />
    </ProductListProvider>
  )
}

export default ProductSummaryListWithoutQuery
