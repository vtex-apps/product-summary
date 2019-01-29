import React from 'react'
import { pathOr } from 'ramda'
import PropTypes from 'prop-types'
import {
  CollectionBadges,
  DiscountBadge,
} from 'vtex.store-components'

import Image from './Image'
import { productShape } from './utils/propTypes'

import productSummary from '../productSummary.css'

const ProductImage = ({ product, showBadge, badgeText, showCollections }) => {
  const {
    productClusters,
    productName: name,
    sku: {
      image: { imageUrl },
    },
  } = product

  const commertialOffer = pathOr({}, ['sku', 'seller', 'commertialOffer'], product)

  let img = (
    <Image className={productSummary.image} alt={name} src={imageUrl} />
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

ProductImage.propTypes = {
  /** Product that owns the informations */
  product: productShape,
  /** Set the discount badge's visibility */
  showBadge: PropTypes.bool,
  /** Text shown on badge */
  badgeText: PropTypes.string,
  /** Defines if the collection badges are shown */
  showCollections: PropTypes.bool,
}

export default ProductImage
