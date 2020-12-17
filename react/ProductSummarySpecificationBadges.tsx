import React from 'react'
import { ProductSummaryContext } from 'vtex.product-summary-context'
import { BaseSpecificationBadges } from 'vtex.product-specification-badges'

/**
 * @deprecated Use [vtex.product-specifications](https://github.com/vtex-apps/product-specifications) instead.
 */
function ProductSummarySpecificationBadges({
  specificationGroupName,
  visibleWhen,
  specificationsOptions,
  specificationName,
  displayValue,
  orientation,
}: any) {
  const { product } = ProductSummaryContext.useProductSummary()

  return (
    <BaseSpecificationBadges
      product={product}
      visibleWhen={visibleWhen}
      specificationsOptions={specificationsOptions}
      specificationName={specificationName}
      displayValue={displayValue}
      orientation={orientation}
      specificationGroupName={specificationGroupName}
    />
  )
}

ProductSummarySpecificationBadges.schema = {
  ...BaseSpecificationBadges.schema,
  title: 'admin/editor.product-summary-specification-badges.title',
}

export default ProductSummarySpecificationBadges
