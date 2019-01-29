import React from 'react'
import { path } from 'ramda'
import {
  CollectionBadges,
  DiscountBadge,
} from 'vtex.store-components'

import Image from './Image'

import productSummary from '../productSummary.css'

const ProductSummaryImage = ({ product, showBadge, badgeText, showCollections }) => {
  const {
    productClusters,
    productName: name,
    sku: {
      image: { imageUrl },
    },
  } = product

  const commertialOffer = path(['sku', 'seller', 'commertialOffer'], product)

  let img = (
    <Image className={`${productSummary.image}`} alt={name} src={imageUrl} />
  )

  if (showBadge) {
    img = (
      <DiscountBadge
        listPrice={commertialOffer.ListPrice}
        sellingPrice={commertialOffer.Price}
        label={badgeText}
      >
        {img}
      </DiscountBadge>
    )
  }

  if (showCollections && productClusters && productClusters.length > 0) {
    const collections = productClusters.map(cl => cl.name)

    return (
      <CollectionBadges collectionBadgesText={collections}>
        {img}
      </CollectionBadges>
    )
  }

  return img
}

export default ProductSummaryImage