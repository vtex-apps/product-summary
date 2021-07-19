import React from 'react'
import { useCssHandles } from 'vtex.css-handles'
import { ProductSummaryContext } from 'vtex.product-summary-context'

const { useProductSummary } = ProductSummaryContext

const CSS_HANDLES = ['referenceContainer']

const ProductSummaryReference = () => {
  const { product } = useProductSummary()
  const { referenceContainer } = useCssHandles(CSS_HANDLES)
  const productReference: string = product?.productReference ?? ''

  if (!productReference) {
    return null
  }

  return <div className={referenceContainer}>{productReference}</div>
}

export default ProductSummaryReference
