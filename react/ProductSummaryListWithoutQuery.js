import React, { useMemo } from 'react'
import { ExtensionPoint, useTreePath } from 'vtex.render-runtime'
import { useListContext, ListContextProvider } from 'vtex.list-context'
import { ProductListContext } from 'vtex.product-list-context'

import { mapCatalogProductToProductSummary } from './utils/normalize'
import ProductListEventCaller from './components/ProductListEventCaller'

const { ProductListProvider } = ProductListContext

function List({ children, products, ProductSummary }) {
  const { list } = useListContext()
  const { treePath } = useTreePath()

  const newListContextValue = useMemo(() => {
    const componentList =
      products &&
      products.map((product) => {
        const normalizedProduct = mapCatalogProductToProductSummary(product)

        if (typeof ProductSummary === 'function') {
          return <ProductSummary product={normalizedProduct} />
        }

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
  }, [products, treePath, list, ProductSummary])

  return (
    <ListContextProvider list={newListContextValue}>
      {children}
    </ListContextProvider>
  )
}

const ProductSummaryListWithoutQuery = ({
  children,
  products,
  ProductSummary,
}) => {
  return (
    <ProductListProvider>
      <List products={products} ProductSummary={ProductSummary}>
        {children}
      </List>
      <ProductListEventCaller />
    </ProductListProvider>
  )
}

export default ProductSummaryListWithoutQuery
