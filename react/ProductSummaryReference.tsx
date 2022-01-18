import React from 'react'
import type { CssHandlesTypes } from 'vtex.css-handles'
import { useCssHandles } from 'vtex.css-handles'
import { ProductSummaryContext } from 'vtex.product-summary-context'

const { useProductSummary } = ProductSummaryContext

const CSS_HANDLES = ['referenceContainer'] as const

interface Props {
  classes: CssHandlesTypes.CustomClasses<typeof CSS_HANDLES>
}

const ProductSummaryReference = ({ classes }: Props) => {
  const { product } = useProductSummary()
  const { handles } = useCssHandles(CSS_HANDLES, { classes })
  const { productReference } = product

  if (!productReference) {
    return null
  }

  return <div className={handles.referenceContainer}>{productReference}</div>
}

export default ProductSummaryReference
