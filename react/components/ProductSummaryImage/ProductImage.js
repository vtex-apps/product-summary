import React, { useState } from 'react'
import { pathOr, compose, path } from 'ramda'
import PropTypes from 'prop-types'
import { CollectionBadges, DiscountBadge } from 'vtex.store-components'
import classNames from 'classnames'
import { useDevice } from 'vtex.device-detector'

import { useProductSummary } from 'vtex.product-summary-context/ProductSummaryContext'

import productSummary from '../../productSummary.css'

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

export const ImagePlaceholder = () => (
  <div className="relative">
    <div
      className={`${productSummary.imagePlaceholder} absolute w-100 h-100 contain bg-center`}
    />
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 512 512"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      data-testid="image-placeholder"
    >
      <rect width="512" height="512" fill="#F2F2F2" />
      <rect
        x="183.857"
        y="180.2"
        width="144.286"
        height="150.474"
        stroke="#CACBCC"
        strokeWidth="2"
      />
      <path d="M183.78 303.688H328.214" stroke="#CACBCC" strokeWidth="2" />
      <path
        d="M205.082 279.563L223.599 240.507L242.116 260.035L269.892 220.979L306.926 279.563H205.082Z"
        stroke="#CACBCC"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M252.225 213.939C252.225 219.822 247.66 224.52 242.114 224.52C236.569 224.52 232.004 219.822 232.004 213.939C232.004 208.057 236.569 203.359 242.114 203.359C247.66 203.359 252.225 208.057 252.225 213.939Z"
        stroke="#CACBCC"
        strokeWidth="2"
      />
    </svg>
  </div>
)

const findHoverImage = (images, hoverImageLabel) => {
  if (!hoverImageLabel) {
    return null
  }
  return images.find(({ imageLabel }) => imageLabel === hoverImageLabel)
}

const ProductImageContent = ({
  product,
  showBadge,
  badgeText,
  showCollections,
  displayMode,
  onError,
  hoverImageLabel,
}) => {
  const {
    productClusters,
    productName: name,
    sku: {
      image: { imageUrl },
      images,
    },
  } = product

  const { isMobile } = useDevice()

  const imageContentClassName = classNames({
    [productSummary.imageNormal]: displayMode !== 'inline',
    [productSummary.imageInline]: displayMode === 'inline',
  })

  // TODO: change ProductSummaryContext to have `selectedSku` field instead of `sku`
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

  const hoverImage = findHoverImage(images, hoverImageLabel)

  const hoverImgClasses = classNames(
    'w-100 h-100 dn absolute top-0 left-0 z-999',
    imageContentClassName,
    productSummary.hoverImage
  )

  const imgStackClasses = classNames(
    'dib relative',
    productSummary.imageStackContainer,
    productSummary.hoverEffect
  )
  const img = (
    <div className={imgStackClasses}>
      <img
        className={imageContentClassName}
        src={imageUrl}
        alt={name}
        onError={onError}
      />
      {hoverImage && !isMobile && (
        <img src={hoverImage.imageUrl} alt={name} className={hoverImgClasses} />
      )}
    </div>
  )

  return compose(
    withBadge(showBadge),
    withCollection(showCollections)
  )(img)
}

const ProductImage = ({
  showBadge,
  badgeText,
  showCollections,
  displayMode,
  hoverImageLabel,
}) => {
  const { product } = useProductSummary()

  const [error, setError] = useState(false)
  const imageClassName = classNames(productSummary.imageContainer, {
    'db w-100 center': displayMode !== 'inline',
  })

  return (
    <div className={imageClassName}>
      {path(['sku', 'image', 'imageUrl'], product) && !error ? (
        <ProductImageContent
          showBadge={showBadge}
          badgeText={badgeText}
          showCollections={showCollections}
          displayMode={displayMode}
          product={product}
          onError={() => setError(true)}
          hoverImageLabel={hoverImageLabel}
        />
      ) : (
        <ImagePlaceholder />
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
  hoverImageLabel: PropTypes.string,
}

ProductImage.defaultProps = {
  showBadge: true,
  showCollections: false,
  displayMode: 'normal',
  hoverImageLabel: '',
}

ProductImage.getSchema = () => {
  return {
    title: 'admin/editor.productSummaryImage.title',
    description: 'admin/editor.productSummaryImage.description',
    type: 'object',
    properties: {
      showBadge: {
        type: 'boolean',
        title: 'admin/editor.productSummary.showBadge.title',
        default: ProductImage.defaultProps.showBadge,
        isLayout: true,
      },
      showCollections: {
        type: 'boolean',
        title: 'admin/editor.productSummary.showCollections.title',
        default: ProductImage.defaultProps.showCollections,
        isLayout: true,
      },
      displayMode: {
        title: 'admin/editor.productSummary.displayMode.title',
        type: 'string',
        enum: ['normal', 'inline'],
        default: ProductImage.defaultProps.displayMode,
        isLayout: true,
      },
      hoverImageLabel: {
        title: 'admin/editor.productSummaryImage.hoverImageLabel.title',
        type: 'string',
        default: '',
        isLayout: false,
      },
    },
  }
}

export default ProductImage
