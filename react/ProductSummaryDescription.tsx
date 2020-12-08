import React from 'react'
import { useProductSummary } from 'vtex.product-summary-context/ProductSummaryContext'
import { useCssHandles } from 'vtex.css-handles'
import { SanitizedHTML } from 'vtex.store-components'

const MAX_SIZE_DESCRIPTION = 120
const CSS_HANDLES = ['description'] as const

function ProductSummaryDescription() {
  const {
    product: { description },
  } = useProductSummary()

  const handles = useCssHandles(CSS_HANDLES)

  if (!description) {
    return null
  }

  const descriptionClasses = `${handles.description} c-muted-2 t-small`

  const descriptionTruncated =
    description.length > MAX_SIZE_DESCRIPTION
      ? `${description.substring(0, MAX_SIZE_DESCRIPTION)}...`
      : description

  return (
    <span className={descriptionClasses}>
      <SanitizedHTML content={descriptionTruncated} />
    </span>
  )
}

export default ProductSummaryDescription
