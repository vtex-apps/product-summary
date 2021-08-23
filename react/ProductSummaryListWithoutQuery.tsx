import React, { useMemo } from 'react'
import type { ComponentType, PropsWithChildren } from 'react'
import { ExtensionPoint, useTreePath } from 'vtex.render-runtime'
import { useListContext, ListContextProvider } from 'vtex.list-context'
import { ProductListContext } from 'vtex.product-list-context'

import { mapCatalogProductToProductSummary } from './utils/normalize'
import ProductListEventCaller from './components/ProductListEventCaller'
import type { ProductClickParams } from './ProductSummaryList'

const { ProductListProvider } = ProductListContext

type Props = PropsWithChildren<{
  /** Custom item */
  LastItemSummary?: ComponentType<any>
  /** Array of products. */
  products?: any[]
  /** Slot of product summary. */
  ProductSummary: ComponentType<{
    product: any
    actionOnClick: (
      product: any,
      productClickParams?: ProductClickParams
    ) => void
    listName?: string
    position?: number
  }>
  /** Name of the list property on Google Analytics events. */
  listName?: string
  /** Callback on product click. */
  actionOnProductClick?: (
    product: any,
    productClickParams?: ProductClickParams
  ) => void
}>

function List({
  children,
  products,
  LastItemSummary,
  ProductSummary,
  listName,
  actionOnProductClick,
}: Props) {
  const { list } = useListContext()
  const { treePath } = useTreePath()

  const newListContextValue = useMemo(() => {

    const componentList = products?.map((product, index) => {
      const normalizedProduct = mapCatalogProductToProductSummary(product)
      const position = list.length + index + 1

      const handleOnClick = () => {
        if (typeof actionOnProductClick === 'function') {
          actionOnProductClick(normalizedProduct, {
            position,
          })
        }
      }

      if (typeof ProductSummary === 'function') {
        return (
          <ProductSummary
            key={normalizedProduct.cacheId}
            product={normalizedProduct}
            listName={listName}
            actionOnClick={handleOnClick}
            position={position}
          />
        )
      }

      return (
        <ExtensionPoint
          id="product-summary"
          key={product.cacheId}
          treePath={treePath}
          product={normalizedProduct}
          listName={listName}
          actionOnClick={handleOnClick}
          position={position}
        />
      )
    })

    if(LastItemSummary) {
      componentList?.push(<LastItemSummary />)
    }

    return list.concat(componentList ?? [])
  }, [products, list, ProductSummary, treePath, listName, actionOnProductClick])

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
  LastItemSummary,
  ProductSummary,
  actionOnProductClick,
}: Props) {
  return (
    <ProductListProvider listName={listName ?? ''}>
      <List
        products={products}
        listName={listName}
        LastItemSummary={LastItemSummary}
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
