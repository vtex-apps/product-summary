import React from 'react'
import type { ProductSummaryTypes } from 'vtex.product-summary-context'

interface ProductSummaryContext {
  product: ProductSummaryTypes.Product
  isLoading: boolean
  isHovering: boolean
  handleItemsStateUpdate: (loading: boolean) => void
}

const ProductSummaryContext = React.createContext<
  ProductSummaryContext | undefined
>(undefined)

const OriginalConsumer = ProductSummaryContext.Consumer

// @ts-expect-error
ProductSummaryContext.Consumer = function WrappedConsumer(props: any) {
  console.error(
    "If you are seeing this, a component it's using ProductSummaryContext from vtex.product-summary, which is deprecated. Please see the issue https://github.com/vtex-apps/store-issues#28 on how to migrate to the new component."
  )

  return <OriginalConsumer {...props} />
}

export default ProductSummaryContext
