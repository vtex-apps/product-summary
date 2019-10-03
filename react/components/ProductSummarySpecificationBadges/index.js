import BaseSpecificationBadges from 'vtex.product-specification-badges/BaseSpecificationBadges'
import { useProductSummary } from 'vtex.product-summary-context/ProductSummaryContext'

const ProductSummarySpecificationBadges = ({
  groupName,
  visibleWhen,
  specificationsOptions,
  specificationName,
  displayValue,
  blockClass,
  orientation,
}) => {
  const { product } = useProductSummary()
  return (
    <BaseSpecificationBadges
      product={product}
      visibleWhen={visibleWhen}
      specificationsOptions={specificationsOptions}
      specificationName={specificationName}
      displayValue={displayValue}
      blockClass={blockClass}
      orientation={orientation}
      groupName={groupName}
    />
  )
}

export default ProductSummarySpecificationBadges
