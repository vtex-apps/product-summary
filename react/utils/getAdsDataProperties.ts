import { Product } from 'vtex.product-summary-context/react/ProductSummaryTypes'

type GetAdsDataPropertiesArgs = {
  product: Product
  position?: number
  placement?: string
}

const getAdsDataProperties = ({
  product,
  position,
  placement,
}: GetAdsDataPropertiesArgs) => {
  if (!product.advertisement?.adId) return {}

  const {
    productId,
    productName,
    advertisement: { adId, campaignId, adRequestId, adResponseId, actionCost },
  } = product

  return {
    'data-van-prod-id': productId,
    'data-van-prod-name': productName,
    'data-van-position': position,
    'data-van-aid': adId,
    'data-van-cid': campaignId,
    'data-van-req-id': adRequestId,
    'data-van-res-id': adResponseId,
    'data-van-cpc': actionCost,
    'data-van-placement': placement
  }
}

export default getAdsDataProperties
