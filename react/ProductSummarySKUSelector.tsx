import React from 'react'
import { SKUSelector } from 'vtex.store-components'
import { useCssHandles } from 'vtex.css-handles'
import type { CssHandlesTypes } from 'vtex.css-handles'
import { ProductSummaryContext } from 'vtex.product-summary-context'
import type { ProductSummaryTypes } from 'vtex.product-summary-context'

import { getFirstAvailableSeller } from './modules/seller'

const { useProductSummary, useProductSummaryDispatch } = ProductSummaryContext

const CSS_HANDLES = ['SKUSelectorContainer'] as const

interface Props {
  classes: CssHandlesTypes.CustomClasses<typeof CSS_HANDLES>
}

function ProductSummarySKUSelector(props: Props) {
  const { handles } = useCssHandles(CSS_HANDLES)
  const dispatch = useProductSummaryDispatch()
  const { product } = useProductSummary()

  const stopBubblingUp: React.MouseEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleSKUSelected = (skuId: string | null) => {
    if (skuId == null) {
      dispatch({
        type: 'SET_PRODUCT_QUERY',
        args: { query: '' },
      })

      return
    }

    const selectedItem =
      product.items &&
      (product.items.find(
        (item) => item.itemId === skuId
      ) as ProductSummaryTypes.SKU)

    const sku = {
      ...selectedItem,
      image: selectedItem.images[0],
      seller:
        getFirstAvailableSeller(selectedItem.sellers) ??
        selectedItem.sellers[0],
    }

    const newProduct = {
      ...product,
      selectedItem,
      sku,
    }

    dispatch({
      type: 'SET_PRODUCT',
      args: { product: newProduct },
    })

    dispatch({
      type: 'SET_PRODUCT_QUERY',
      args: { query: `skuId=${skuId}` },
    })
  }

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <div onClick={stopBubblingUp} className={handles.SKUSelectorContainer}>
      <SKUSelector onSKUSelected={handleSKUSelected} {...props} />
    </div>
  )
}

export default ProductSummarySKUSelector
