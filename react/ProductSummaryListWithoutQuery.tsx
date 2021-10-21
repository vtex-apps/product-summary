import React, { useMemo } from 'react'
import type { ComponentType, PropsWithChildren } from 'react'
import { ExtensionPoint, useTreePath } from 'vtex.render-runtime'
import { useListContext, ListContextProvider } from 'vtex.list-context'
import { ProductListContext } from 'vtex.product-list-context'

import {
  mapCatalogProductToProductSummary,
  PreferenceType,
} from './utils/normalize'
import ProductListEventCaller from './components/ProductListEventCaller'
import type { ProductClickParams } from './ProductSummaryList'

const { ProductListProvider } = ProductListContext

type Props = PropsWithChildren<{
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
  /** Logic to enable which SKU will be the selected item */
  preferredSKU?: PreferenceType
}>

function List({
  children,
  products,
  ProductSummary,
  listName,
  actionOnProductClick,
  preferredSKU,
}: Props) {
  const { list } = useListContext()
  const { treePath } = useTreePath()

  const newListContextValue = useMemo(() => {
    const componentList = products?.map((product, index) => {
      const normalizedProduct = mapCatalogProductToProductSummary(
        product,
        preferredSKU
      )

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

    return list.concat(componentList ?? [])
  }, [
    products,
    list,
    preferredSKU,
    ProductSummary,
    treePath,
    listName,
    actionOnProductClick,
  ])

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
  preferredSKU,
}: Props) {
  return (
    <ProductListProvider listName={listName ?? ''}>
      <List
        preferredSKU={preferredSKU}
        products={products}
        listName={listName}
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
