import BaseSpecificationBadges from 'vtex.product-specification-badges/BaseSpecificationBadges'
import { useProductSummary } from 'vtex.product-summary-context/ProductSummaryContext'

const ProductSummarySpecificationBadges = ({
  groupName,
  conditions,
  blockClass,
  orientation
}) => {
  const { product } = useProductSummary()
  return (
    <BaseSpecificationBadges
      product={product}
      conditions={conditions}
      blockClass={blockClass}
      orientation={orientation}
      groupName={groupName}
    />
  )
}

export default ProductSummarySpecificationBadges
