import React, { useState } from 'react'
import { pathOr, compose, path } from 'ramda'
import PropTypes from 'prop-types'
import { CollectionBadges, DiscountBadge } from 'vtex.store-components'
import classNames from 'classnames'
import { useDevice } from 'vtex.device-detector'
import { useResponsiveValues } from 'vtex.responsive-values'
import { useCssHandles, applyModifiers } from 'vtex.css-handles'

import { useProductSummary } from 'vtex.product-summary-context/ProductSummaryContext'

import productSummary from '../../productSummary.css'

import { changeImageUrlSize } from '../../utils/normalize'

const CSS_HANDLES = ['image', 'imageContainer']

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

const findHoverImage = (images, hoverImageLabel) => {
  if (!hoverImageLabel) {
    return null
  }
  return images.find(({ imageLabel }) => imageLabel === hoverImageLabel)
}

const Image = ({ src, width, height, onError, alt, className }) => {
  const { isMobile } = useDevice()

  const dpi = window.devicePixelRatio || (isMobile ? 2 : 1)

  const shouldResize = !!(width || height)

  return (
    <img
      src={
        shouldResize ? changeImageUrlSize(src, width * dpi, height * dpi) : src
      }
      style={
        shouldResize
          ? {
              width,
              height,
              maxHeight: 'unset',
              maxWidth: 'unset',
            }
          : null
      }
      alt={alt}
      className={className}
      onError={onError}
    />
  )
}

const ProductImageContent = ({
  product,
  showBadge,
  badgeText,
  showCollections,
  displayMode,
  onError,
  hoverImageLabel,
  width: widthProp,
  height: heightProp,
  hasError,
}) => {
  const { productClusters, productName: name } = product || {}

  const sku = product && product.sku

  const imageUrl = path(['image', 'imageUrl'], sku)
  const images = path(['images'], sku)

  const { isMobile } = useDevice()
  const handles = useCssHandles(CSS_HANDLES)

  const [width, height] = [
    // fallsback to the other remaining value, if not defined
    parseFloat(widthProp || heightProp || 0),
    parseFloat(heightProp || widthProp || 0),
  ]

  if (!sku || hasError) {
    return <ImagePlaceholder width={width} height={height} />
  }

  const legacyImageClasses = classNames({
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

  const imageClassname = classNames(legacyImageClasses, handles.image)

  const hoverImageClassname = classNames(
    'w-100 h-100 dn absolute top-0 left-0 z-999',
    applyModifiers(handles.image, 'hover'),
    legacyImageClasses,
    productSummary.hoverImage
  )

  const legacyContainerClasses = classNames(
    productSummary.imageStackContainer,
    productSummary.hoverEffect
  )

  const containerClassname = classNames(
    'dib relative',
    handles.imageContainer,
    legacyContainerClasses
  )

  const img = (
    <div className={containerClassname}>
      <Image
        src={imageUrl}
        width={width}
        height={height}
        alt={name}
        className={imageClassname}
        onError={onError}
      />
      {hoverImage && !isMobile && (
        <Image
          src={hoverImage.imageUrl}
          width={width}
          height={height}
          alt={name}
          className={hoverImageClassname}
          onError={onError}
        />
      )}
    </div>
  )

  return compose(
    withBadge(showBadge),
    withCollection(showCollections)
  )(img)
}

const ImagePlaceholder = ({ width, height }) => (
  <div style={{ width, height }}>
    <div
      className={`${productSummary.imagePlaceholder} absolute w-100 h-100 contain bg-center`}
      data-testid="image-placeholder"
    />
  </div>
)

const ProductImage = ({
  showBadge,
  badgeText,
  showCollections,
  displayMode,
  hoverImageLabel,
  width: widthProp,
  height: heightProp,
}) => {
  const { product } = useProductSummary()

  const { widthProp: width, heightProp: height } = useResponsiveValues({
    widthProp,
    heightProp,
  })

  const [error, setError] = useState(false)

  const imageClassName = classNames(productSummary.imageContainer, {
    'db w-100 center': displayMode !== 'inline',
  })

  return (
    <div className={imageClassName}>
      <ProductImageContent
        showBadge={showBadge}
        badgeText={badgeText}
        showCollections={showCollections}
        displayMode={displayMode}
        product={product}
        onError={() => setError(true)}
        hoverImageLabel={hoverImageLabel}
        width={width}
        height={height}
        hasError={error}
      />
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
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.object]),
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.object]),
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
