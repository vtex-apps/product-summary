import React from 'react'
import { pathOr, isEmpty } from 'ramda'
import PropTypes from 'prop-types'
import {
  CollectionBadges,
  DiscountBadge,
} from 'vtex.store-components'

import Image from './Image'
import { productShape } from '../utils/propTypes'

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

  const withBagde = img => (
    showBadge ? (
      <DiscountBadge
        listPrice={commertialOffer.ListPrice}
        sellingPrice={commertialOffer.Price}
        label={badgeText}
      >
        {img}
      </DiscountBadge>
    ) : img
  )

  const withCollection = img => {
    if (showCollections && !isEmpty(productClusters)) {
      const collections = productClusters.map(cl => cl.name)

      return (
        <CollectionBadges collectionBadgesText={collections}>
          {img}
        </CollectionBadges>
      )
    }
    return img
  }

  const img = (
    <Image className={productSummary.image} alt={name} src={imageUrl} />
  )

  return withBagde(withCollection(img))
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
