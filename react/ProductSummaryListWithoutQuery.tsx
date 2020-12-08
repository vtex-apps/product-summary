import React, { useMemo } from 'react'
import type { ComponentType, PropsWithChildren } from 'react'
import { ExtensionPoint, useTreePath } from 'vtex.render-runtime'
import { useListContext, ListContextProvider } from 'vtex.list-context'
import { ProductListContext } from 'vtex.product-list-context'

import { mapCatalogProductToProductSummary } from './utils/normalize'
import ProductListEventCaller from './components/ProductListEventCaller'

const { ProductListProvider } = ProductListContext

type Props = PropsWithChildren<{
  /** Array of products. */
  products?: any[]
  /** Slot of product summary. */
  ProductSummary: ComponentType<{ product: any }>
  /** Name of the list property on Google Analytics events. */
  listName?: string
  /** Callback on product click. */
  actionOnProductClick?: (product: any) => void
}>

function List({
  children,
  products,
  ProductSummary,
  actionOnProductClick,
}: Props) {
  const { list } = useListContext()
  const { treePath } = useTreePath()

  const newListContextValue = useMemo(() => {
    const componentList = products?.map((product) => {
      const normalizedProduct = mapCatalogProductToProductSummary(product)

      if (typeof ProductSummary === 'function') {
        return <ProductSummary product={normalizedProduct} />
      }

      const handleOnClick = () => {
        if (typeof actionOnProductClick === 'function') {
          actionOnProductClick(normalizedProduct)
        }
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

    return list.concat(componentList ?? [])
  }, [products, list, ProductSummary, treePath, actionOnProductClick])

  return (
    <ListContextProvider list={newListContextValue}>
      {children}
    </ListContextProvider>
  )
}

function ProductSummaryListWithoutQuery({
  children,
  products,
  listName,
  ProductSummary,
  actionOnProductClick,
}: Props) {
  return (
    <ProductListProvider listName={listName ?? ''}>
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
