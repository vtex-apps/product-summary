import React from 'react'
import { useCssHandles } from 'vtex.css-handles'
import { IOMessage } from 'vtex.native-types'
import { ProductSummaryContext } from 'vtex.product-summary-context'

const { useProductSummary } = ProductSummaryContext

const CSS_HANDLES = ['sponsoredBadgeContainer', 'sponsoredBadge'] as const

function ProductSummarySponsoredBadge() {
  const { product } = useProductSummary()
  const { handles } = useCssHandles(CSS_HANDLES)

  const isSponsored = !!product.advertisement?.adId

  return isSponsored ? (
    <div className={handles.sponsoredBadgeContainer}>
      <div className={handles.sponsoredBadge}>
        <IOMessage id="store/productSummarySponsoredBadge.title" />
      </div>
    </div>
  ) : null
}

ProductSummarySponsoredBadge.schema = {
  title: 'store/productSummarySponsoredBadge.title',
}

export default ProductSummarySponsoredBadge
