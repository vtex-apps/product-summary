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

  const imageContentClassName = classNames({
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
  const img = <img className={imageContentClassName} src={imageUrl} alt={name} />

  return compose(
    withBadge(showBadge),
    withCollection(showCollections)
  )(img)
}

const ProductImage : FunctionComponent = (props) => {
  const { product } = useContext(ProductSummaryContext)
  const imageClassName = classNames(productSummary.imageContainer, {
    'db w-100 center': props.displayMode !== 'inline',
  })
  return (
    <div className={imageClassName}>
      {path(['sku', 'image', 'imageUrl'], product) ? (
        <ProductImageContent {...props} product={product} />
      ) : (
        <ImageLoader />
      )}
    </div>
  )
}

ProductImage.propTypes = {
  /** Set the discount badge's visibility */
  showBadge: PropTypes.bool,
  /** Text shown on badge */
  badgeText: PropTypes.string,
  /** Defines if the collection badges are shown */
  showCollections: PropTypes.bool,
  /** Display mode of the summary */
  displayMode: PropTypes.oneOf(['normal', 'inline']),
}

ProductImage.defaultProps = {
  showBadge: true,
  showCollections: false,
  displayMode: 'normal'
}

ProductImage.getSchema = () => {
  return {
    title: 'editor.productSummary.title',
    description: 'editor.productSummary.description',
    type: 'object',
    properties: {
      showBadge: {
        type: 'boolean',
        title: 'editor.productSummary.showBadge.title',
        default: ProductImage.defaultProps.showBadge,
        isLayout: true,
      },
      badgeText: {
        type: 'string',
        title: 'editor.productSummary.badgeText.title',
        isLayout: false,
      },
      showCollections: {
        type: 'boolean',
        title: 'editor.productSummary.showCollections.title',
        default: ProductImage.defaultProps.showCollections,
        isLayout: true,
      },
      displayMode: {
        title: 'editor.productSummary.displayMode.title',
        type: 'string',
        enum: ['normal', 'inline'],
        default: ProductImage.defaultProps.displayMode,
        isLayout: true,
      },
    },
  }
}

export default ProductImage
