import React from 'react'
import type { CssHandlesTypes } from 'vtex.css-handles'
import {  useCssHandles } from 'vtex.css-handles'
import { ProductSummaryContext } from 'vtex.product-summary-context'

interface Props {
  classes: CssHandlesTypes.CustomClasses<typeof CSS_HANDLES>
}

const { useProductSummary } = ProductSummaryContext

const CSS_HANDLES = ['referenceContainer'] as const

const ProductSummaryReference = ({ classes }:Props) => {
  const { product } = useProductSummary()
  const { handles } = useCssHandles(CSS_HANDLES, { classes })
  const productReference: string = product.productReference ?? ''

  if (!productReference) {
    return null
  }

  return <div className={handles.referenceContainer}>{productReference}</div>
}

export default ProductSummaryReference
