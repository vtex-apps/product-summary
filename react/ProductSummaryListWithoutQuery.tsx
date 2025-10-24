import type { ComponentType, PropsWithChildren } from 'react'
import React, { useMemo } from 'react'
import { ListContextProvider, useListContext } from 'vtex.list-context'
import { ProductListContext } from 'vtex.product-list-context'
import { ExtensionPoint, useTreePath } from 'vtex.render-runtime'

import ProductListEventCaller from './components/ProductListEventCaller'
import type { ProductClickParams } from './ProductSummaryList'
import {
  mapCatalogProductToProductSummary,
  PreferenceType,
} from './utils/normalize'

const { ProductListProvider } = ProductListContext

export const PRODUCT_LIST_PLACEMENT = 'home_shelf'

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
    placement?: string
    afDataAttributes?: Record<string, string>
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
  /**
   * Array of Activity Flow data attributes objects. Each object will be spread directly onto the corresponding section element.
   * @example
   * afDataAttributesList={[
   *   { 'data-af-category': 'electronics', 'data-af-onclick': 'true' },
   *   { 'data-af-category': 'clothing', 'data-af-position': '2' }
   * ]}
   */
  afDataAttributesList?: Array<Record<string, string>>
}>

function List({
  children,
  products,
  ProductSummary,
  listName,
  actionOnProductClick,
  preferredSKU,
  afDataAttributesList = [],
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
            placement={PRODUCT_LIST_PLACEMENT}
            afDataAttributes={afDataAttributesList[index]}
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
          placement={PRODUCT_LIST_PLACEMENT}
          afDataAttributes={afDataAttributesList[index]}
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
    afDataAttributesList,
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
  afDataAttributesList,
}: Props) {
  return (
    <ProductListProvider listName={listName ?? ''}>
      <List
        preferredSKU={preferredSKU}
        products={products}
        listName={listName}
        ProductSummary={ProductSummary}
        actionOnProductClick={actionOnProductClick}
        afDataAttributesList={afDataAttributesList}
      >
        {children}
      </List>
      <ProductListEventCaller />
    </ProductListProvider>
  )
}

export default ProductSummaryListWithoutQuery
