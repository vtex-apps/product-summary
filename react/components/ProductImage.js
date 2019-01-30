import React from 'react'
import { pathOr, isEmpty, compose } from 'ramda'
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

  const maybeBadge = condition => component => {
    if (condition) {
      return (
        <DiscountBadge
          listPrice={commertialOffer.ListPrice}
          sellingPrice={commertialOffer.Price}
          label={badgeText}
        >
          {component}
        </DiscountBadge>
      )
    }
    return component
  }

  const maybeCollection = condition => component => {
    if (condition) {
      const collections = productClusters.map(cl => cl.name)
      return (
        <CollectionBadges collectionBadgesText={collections}>
          {component}
        </CollectionBadges>
      )
    }
    return component
  }

  const img = (<Image className={productSummary.image} alt={name} src={imageUrl} />)

  return compose(maybeBadge(showBadge), maybeCollection(showCollections && !isEmpty(productClusters)))(img)
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
