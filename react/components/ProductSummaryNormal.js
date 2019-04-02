import React from 'react'
import { useChildBlock__unstable } from 'vtex.render-runtime'
import ProductSummaryNormalCustom from './ProductSummaryNormalCustom'
import ProductSummaryNormalLegacy from './ProductSummaryNormalLegacy'

const ProductSummaryNormal = props => {
  const hasCustomProductSummary = !!useChildBlock__unstable({ id: 'unstable--product-summary-layout' })

  return (
    hasCustomProductSummary
      ? <ProductSummaryNormalCustom {...props} />
      : <ProductSummaryNormalLegacy {...props} />
  )
}

ProductSummaryNormal.schema = {
  title: 'editor.product-summary.title',
  description: 'editor.product-summary.description',
}

export default ProductSummaryNormal
