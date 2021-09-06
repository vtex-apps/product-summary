import { useProduct, useProductDispatch } from 'vtex.product-context'
import type { ProductTypes } from 'vtex.product-context'
import { ProductSummaryContext } from 'vtex.product-summary-context'
import type { ProductSummaryTypes } from 'vtex.product-summary-context'
import { useCallback } from 'react'

const { useProductSummaryDispatch } = ProductSummaryContext

function useSetProduct() {
  const { selectedItem: currentSelectedItem } = useProduct() ?? {}
  const productSummaryDispatch = useProductSummaryDispatch()
  const productDispatch = useProductDispatch()

  return useCallback(
    (product: ProductSummaryTypes.Product) => {
      const newSelectedItem =
        currentSelectedItem &&
        product.items.find((item) => item.itemId === currentSelectedItem.itemId)

      productSummaryDispatch({
        type: 'SET_PRODUCT',
        args: { product },
      })

      productDispatch?.({
        type: 'SET_PRODUCT',
        args: { product: (product as unknown) as ProductTypes.Product },
      })

      productDispatch?.({
        type: 'SET_SELECTED_ITEM',
        args: { item: (newSelectedItem as unknown) as ProductTypes.Item },
      })
    },
    [currentSelectedItem, productSummaryDispatch, productDispatch]
  )
}

export default useSetProduct
