import React from 'react'
import { useCssHandles } from 'vtex.css-handles'
import type { CssHandlesTypes } from 'vtex.css-handles'
import { ProductSummaryContext } from 'vtex.product-summary-context'

const { useProductSummary } = ProductSummaryContext

const CSS_HANDLES = ['skuNameContainer'] as const

interface Props {
  classes: CssHandlesTypes.CustomClasses<typeof CSS_HANDLES>
}

const ProductSummarySKUName = ({ classes }: Props) => {
  const { product } = useProductSummary()
  const { handles } = useCssHandles(CSS_HANDLES, { classes })
  const skuName: string = product?.sku?.name ?? ''
  const { productName } = product

  if (!skuName || skuName === productName) {
    return null
  }

  return <div className={handles.skuNameContainer}>{skuName}</div>
}

export default ProductSummarySKUName
