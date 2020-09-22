/* eslint-disable no-console */
import React from 'react'
// eslint-disable-next-line no-restricted-imports
import { path } from 'ramda'
import { useCssHandles } from 'vtex.css-handles'
import { useProductSummary } from 'vtex.product-summary-context/ProductSummaryContext'

const CSS_HANDLES = ['skuNameContainer']

const ProductSummarySKUName = () => {
  const { product } = useProductSummary()
  const handles = useCssHandles(CSS_HANDLES)
  const skuName: string = path(['sku', 'name'], product) ?? ''
  const { productName } = product

  if (!skuName || skuName === productName) {
    return null
  }

  return (
    <div
      className={`${handles.skuNameContainer} flex items-start justify-center pv6`}
    >
      {skuName}
    </div>
  )
}

export default ProductSummarySKUName
