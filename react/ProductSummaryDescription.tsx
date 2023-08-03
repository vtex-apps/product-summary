import React from 'react'
import { useCssHandles } from 'vtex.css-handles'
import type { CssHandlesTypes } from 'vtex.css-handles'
import { SanitizedHTML } from 'vtex.store-components'
import { ProductSummaryContext } from 'vtex.product-summary-context'

const { useProductSummary } = ProductSummaryContext

const MAX_SIZE_DESCRIPTION = 120
const CSS_HANDLES = ['description'] as const

interface Props {
  classes?: CssHandlesTypes.CustomClasses<typeof CSS_HANDLES>
  descriptionMaxSize?: number
}

function ProductSummaryDescription({ classes, descriptionMaxSize }: Props) {
  const { handles } = useCssHandles(CSS_HANDLES, { classes })

  const {
    product: { description },
  } = useProductSummary()

  if (!description) {
    return null
  }

  const descriptionClasses = `${handles.description} c-muted-2 t-small`

  const maxSize = descriptionMaxSize ?? MAX_SIZE_DESCRIPTION
  const descriptionTruncated =
    description.length > maxSize
      ? `${description.substring(0, maxSize)}...`
      : description

  return (
    <span className={descriptionClasses}>
      <SanitizedHTML content={descriptionTruncated} />
    </span>
  )
}

export default ProductSummaryDescription
