import React, { PropsWithChildren } from 'react'
import { ProductSummaryTypes } from 'vtex.product-summary-context'

interface Props {
  product: ProductSummaryTypes.Product
  position?: number
}

/**
 * Wrapper responsible for adding the neccesary data-properties in sponsored products.
 * These data-properties are used by the Activity Flow script to track the product.
 * If the product is not sponsored, it will return the children as is.
/** */
function SponsoredProductWrapper({
  product,
  position,
  children,
}: PropsWithChildren<Props>) {
  const { advertisement, productName, productId } = product
  const isSponsored = !!advertisement?.adId

  if (!isSponsored) return <>{children}</>

  const dataProperties = {
    'data-van-prod-id': productId,
    'data-van-prod-name': productName,
    'data-van-position': position,
    'data-van-aid': advertisement?.adId,
    'data-van-cid': advertisement?.campaignId,
    'data-van-req-id': advertisement?.adRequestId,
    'data-van-res-id': advertisement?.adResponseId,
    'data-van-cpc': advertisement?.actionCost,
  }

  return (
    <div {...dataProperties} data-testid="sponsored-product-wrapper">
      {children}
    </div>
  )
}

export default SponsoredProductWrapper
