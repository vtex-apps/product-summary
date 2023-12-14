import {
  Product,
  SponsoredBadgePosition,
} from 'vtex.product-summary-context/react/ProductSummaryTypes'

const shouldShowSponsoredBadge = (
  product: Product,
  position: SponsoredBadgePosition,
  eligiblePositions: SponsoredBadgePosition[]
) => {
  const isSponsored = !!product?.advertisement?.adId
  const showSponsoredBadge = isSponsored && eligiblePositions.includes(position)

  return showSponsoredBadge
}

export default shouldShowSponsoredBadge
