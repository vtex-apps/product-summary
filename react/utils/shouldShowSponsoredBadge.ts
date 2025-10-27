import {
  Product,
  SponsoredBadgePosition,
} from 'vtex.product-summary-context/react/ProductSummaryTypes'

interface NewAdvertisement {
  eventParameters?: string
}

const shouldShowSponsoredBadge = (
  product: Product,
  position: SponsoredBadgePosition,
  eligiblePosition: SponsoredBadgePosition
) => {
  const isSponsored =
    !!product?.advertisement?.adId ||
    !!(product.advertisement as NewAdvertisement)?.eventParameters
  const showSponsoredBadge = isSponsored && position === eligiblePosition

  return showSponsoredBadge
}

export default shouldShowSponsoredBadge
