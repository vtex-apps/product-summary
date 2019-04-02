import React, { FunctionComponent, useContext } from 'react'
import { pathOr, compose, path } from 'ramda'
import PropTypes from 'prop-types'
import { CollectionBadges, DiscountBadge } from 'vtex.store-components'
import classNames from 'classnames'

import ProductSummaryContext from './ProductSummaryContext'
import ImageLoader from './ImageLoader'
import { productShape } from '../utils/propTypes'

import productSummary from '../productSummary.css'

const maybeBadge = ({ listPrice, price, label }) => shouldShow => component => {
  if (shouldShow) {
    return (
      <DiscountBadge listPrice={listPrice} sellingPrice={price} label={label}>
        {component}
      </DiscountBadge>
    )
  }
  return component
}

const maybeCollection = ({ productClusters }) => shouldShow => component => {
  if (shouldShow && productClusters && productClusters.length > 0) {
    const collections = productClusters.map(cl => cl.name)
    return (
      <CollectionBadges collectionBadgesText={collections}>
        {component}
      </CollectionBadges>
    )
  }
  return component
}

const ProductImageContent = ({
  product,
  showBadge,
  badgeText,
  showCollections,
  displayMode,
}) => {
  const {
    productClusters,
    productName: name,
    sku: {
      image: { imageUrl },
    },
  } = product

  const imageClassName = classNames({
    [productSummary.imageNormal]: displayMode !== 'inline',
    [productSummary.imageInline]: displayMode === 'inline',
  })

  const commertialOffer = pathOr(
    {},
    ['sku', 'seller', 'commertialOffer'],
    product
  )

  const withBadge = maybeBadge({
    listPrice: commertialOffer.ListPrice,
    price: commertialOffer.Price,
    label: badgeText,
  })
  const withCollection = maybeCollection({ productClusters })
  const img = <img className={imageClassName} src={imageUrl} alt={name} />

  return compose(
    withBadge(showBadge),
    withCollection(showCollections)
  )(img)
}

ProductImageContent.propTypes = {
  /** Product that owns the informations */
  product: productShape,
  /** Set the discount badge's visibility */
  showBadge: PropTypes.bool,
  /** Text shown on badge */
  badgeText: PropTypes.string,
  /** Defines if the collection badges are shown */
  showCollections: PropTypes.bool,
  /** Display mode of the summary */
  displayMode: PropTypes.string,
}

const ProductImage : FunctionComponent<any> = () => {
  const { product, imageProps } = useContext(ProductSummaryContext)
  return (
    <div className={`${productSummary.imageContainer} db w-100 center`}>
      {path(['sku', 'image', 'imageUrl'], product) ? (
        <ProductImageContent {...imageProps} product={product} />
      ) : (
        <ImageLoader />
      )}
    </div>
  )
}

export default ProductImage
