import React, { useMemo } from 'react'
import { ExtensionPoint, useTreePath } from 'vtex.render-runtime'
import { useListContext, ListContextProvider } from 'vtex.list-context'
import { ProductListContext } from 'vtex.product-list-context'

import { mapCatalogProductToProductSummary } from './utils/normalize'
import ProductListEventCaller from './components/ProductListEventCaller'

const { ProductListProvider } = ProductListContext

function List({ children, products, ProductSummary, actionOnProductClick }) {
  const { list } = useListContext()
  const { treePath } = useTreePath()

  const newListContextValue = useMemo(() => {
    const componentList =
      products &&
      products.map((product) => {
        const normalizedProduct = mapCatalogProductToProductSummary(product)

        const handleOnClick = () => {
          if (typeof actionOnProductClick === 'function') {
            actionOnProductClick(normalizedProduct)
          }
        }

        if (typeof ProductSummary === 'function') {
          return (
            <ProductSummary
              product={normalizedProduct}
              actionOnClick={handleOnClick}
            />
          )
        }

        return (
          <ExtensionPoint
            id="product-summary"
            key={product.id}
            treePath={treePath}
            product={normalizedProduct}
            actionOnClick={handleOnClick}
          />
        )
      })

    return list.concat(componentList)
  }, [products, treePath, list, ProductSummary, actionOnProductClick])

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
  actionOnProductClick,
}) => {
  return (
    <ProductListProvider>
      <List
        products={products}
        ProductSummary={ProductSummary}
        actionOnProductClick={actionOnProductClick}
      >
        {children}
      </List>
      <ProductListEventCaller />
    </ProductListProvider>
  )
}

export default ProductSummaryListWithoutQuery
