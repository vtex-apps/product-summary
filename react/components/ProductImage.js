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

const maybeBadge = ({ listPrice, price, label }) => shouldShow => component => {
  if (shouldShow) {
    return (
      <DiscountBadge
        listPrice={listPrice}
        sellingPrice={price}
        label={label}
      >
        {component}
      </DiscountBadge>
    )
  }
  return component
}

const maybeCollection = ({ productClusters }) => shouldShow => component => {
  if (shouldShow && !isEmpty(productClusters)) {
    const collections = productClusters.map(cl => cl.name)
    return (
      <CollectionBadges collectionBadgesText={collections}>
        {component}
      </CollectionBadges>
    )
  }
  return component
}

const ProductImage = ({ product, showBadge, badgeText, showCollections }) => {
  const {
    productClusters,
    productName: name,
    sku: {
      image: { imageUrl },
    },
  } = product

  const commertialOffer = pathOr({}, ['sku', 'seller', 'commertialOffer'], product)

  const withBadge = maybeBadge({ listPrice: commertialOffer.ListPrice, price: commertialOffer.Price, label: badgeText })
  const withCollection = maybeCollection({ productClusters })
  const img = (<Image className={productSummary.image} alt={name} src={imageUrl} />)

  return compose(withBadge(showBadge), withCollection(showCollections))(img)
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
