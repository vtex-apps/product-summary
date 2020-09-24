import React from 'react'
import { useCssHandles } from 'vtex.css-handles'
import { useProductSummary } from 'vtex.product-summary-context/ProductSummaryContext'

const CSS_HANDLES = ['skuNameContainer'] as const

const ProductSummarySKUName = () => {
  const { product } = useProductSummary()
  const handles = useCssHandles(CSS_HANDLES)
  const skuName: string = product?.sku?.name ?? ''
  const { productName } = product

  if (!skuName || skuName === productName) {
    return null
  }

  return <div className={handles.skuNameContainer}>{skuName}</div>
}

export default ProductSummarySKUName
