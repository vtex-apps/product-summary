import {
  Product,
  SponsoredBadgePosition,
} from 'vtex.product-summary-context/react/ProductSummaryTypes'

const shouldShowSponsoredBadge = (
  product: Product,
  position: SponsoredBadgePosition,
  eligiblePosition: SponsoredBadgePosition
) => {
  const isSponsored = !!product?.advertisement?.adId
  const showSponsoredBadge = isSponsored && position === eligiblePosition

  return showSponsoredBadge
}

export default shouldShowSponsoredBadge
