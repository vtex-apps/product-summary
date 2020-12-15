/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import PropTypes from 'prop-types'
// eslint-disable-next-line no-restricted-imports
import { compose, pathOr } from 'ramda'
import { CollectionBadges, DiscountBadge } from 'vtex.store-components'
import classNames from 'classnames'
import { useDevice } from 'vtex.device-detector'
import { useResponsiveValues } from 'vtex.responsive-values'
import { useCssHandles, applyModifiers } from 'vtex.css-handles'
import { useProduct } from 'vtex.product-context'
import { useProductSummary } from 'vtex.product-summary-context/ProductSummaryContext'

import ImagePlaceholder from './ImagePlaceholder'
import productSummary from '../../productSummary.css'
import { changeImageUrlSize } from '../../utils/normalize'
import { imageUrl } from '../../utils/aspectRatioUtil'

const CSS_HANDLES = ['image', 'mainImageHovered', 'imageContainer', 'product', 'imagePlaceholder']
const MAX_SIZE = 500
const DEFAULT_SIZE = 300

const getImageSrc = ({ src, width, height, dpi, aspectRatio }) => {
  if (width || height) {
    return changeImageUrlSize(src, width * dpi, height * dpi)
  }

  if (aspectRatio) {
    return imageUrl(src, DEFAULT_SIZE, MAX_SIZE, aspectRatio)
  }

  return src
}

const getStyle = ({ width, height, aspectRatio, maxHeight }) => {
  if (width || height) {
    return {
      width: '100%',
      height,
      objectFit: 'contain',
      maxHeight: 'unset',
      maxWidth: width,
    }
  }

  if (aspectRatio || maxHeight) {
    return {
      width: '100%',
      height: '100%',
      objectFit: 'contain',
      maxHeight: maxHeight || 'unset',
    }
  }

  return undefined
}

const maybeBadge = ({ listPrice, price, label }) => (shouldShow) => (
  component
) => {
  if (shouldShow) {
    return (
      <DiscountBadge listPrice={listPrice} sellingPrice={price} label={label}>
        {component}
      </DiscountBadge>
    )
  }

  return component
}

const maybeCollection = ({ productClusters }) => (shouldShow) => (
  component
) => {
  if (shouldShow && productClusters && productClusters.length > 0) {
    const collections = productClusters.map((cl) => cl.name)

    return (
      <CollectionBadges collectionBadgesText={collections}>
        {component}
      </CollectionBadges>
    )
  }

  return component
}

const findImageByLabel = (images, selectedLabel) => {
  if (!selectedLabel) {
    return null
  }

  return images.find(({ imageLabel }) => imageLabel === selectedLabel)
}

const findImageByIndex = (images, index) => {
  const imageIndex = parseInt(index, 10)

  if (Number.isNaN(imageIndex)) {
    return null
  }

  return images[imageIndex]
}

const Image = ({
  src,
  width,
  height,
  onError,
  alt,
  className,
  aspectRatio,
  maxHeight,
}) => {
  const { isMobile } = useDevice()

  /** TODO: Previously it was as follows :
   * 
  const dpi = window.devicePixelRatio || (isMobile ? 2 : 1)
   *
   * it seems good, because it takes the actual user's screen density
   * into account, but causes images to be re-downloaded if the initial
   * device-based guess was wrong. Has to be looked into */
  const dpi = isMobile ? 2 : 1

  const shouldResize = !!(width || height)

  return (
    <img
      src={getImageSrc({ src, width, height, dpi, aspectRatio })}
      style={getStyle({ width, height, aspectRatio, maxHeight })}
      loading={shouldResize ? 'lazy' : 'auto'}
      alt={alt}
      className={className}
      onError={onError}
    />
  )
}

const ProductImageContent = ({
  product,
  onError,
  hasError,
  showBadge,
  badgeText,
  hoverImage,
  displayMode,
  mainImageLabel,
  showCollections,
  width: widthProp,
  height: heightProp,
  aspectRatio,
  maxHeight,
}) => {
  const handles = useCssHandles(CSS_HANDLES)
  const { isMobile } = useDevice()
  const { skuSelector: { selectedImageVariationSKU } = {} } = useProduct()

  const { productClusters, productName: name } = product || {}
  const sku = product && product.sku

  const [width, height] = [
    // fallsback to the other remaining value, if not defined
    parseFloat(widthProp || heightProp || 0),
    parseFloat(heightProp || widthProp || 0),
  ]

  const legacyContainerClasses = classNames(
    productSummary.imageStackContainer,
    productSummary.hoverEffect
  )

  const containerClassname = classNames(
    'dib relative',
    handles.imageContainer,
    legacyContainerClasses
  )

  const images = pathOr([], ['images'], sku)
  
  const isLabelCriteria = hoverImage.criteria === "label"

  console.log({ hoverImage })

  const hoverImg = isLabelCriteria ?
    findImageByLabel(images, hoverImage.label) :
    findImageByIndex(images, hoverImage.index)

  const hasHoverImage = hoverImg !== undefined && hoverImg !== null

  let skuImageUrl = pathOr('', ['image', 'imageUrl'], sku)

  if (!skuImageUrl || hasError) {
    return (
      <div className={containerClassname}>
        <ImagePlaceholder cssHandle={handles.productImage} />
      </div>
    )
  }

  if (selectedImageVariationSKU == null && mainImageLabel) {
    const mainImage = findImageByLabel(images, mainImageLabel)

    if (mainImage) {
      skuImageUrl = mainImage.imageUrl
    }
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

  const imageClassname = classNames(legacyImageClasses, handles.image, {
    [handles.mainImageHovered]: hasHoverImage
  })

  const hoverImageClassname = classNames(
    'w-100 h-100 dn absolute top-0 left-0 z-999',
    applyModifiers(handles.image, 'hover'),
    legacyImageClasses,
    productSummary.hoverImage
  )

  const img = (
    <div className={containerClassname}>
      <Image
        src={skuImageUrl}
        width={width}
        height={height}
        aspectRatio={aspectRatio}
        maxHeight={maxHeight}
        alt={name}
        className={imageClassname}
        onError={onError}
      />
      {hoverImg && !isMobile && (
        <Image
          src={hoverImg.imageUrl}
          width={width}
          height={height}
          aspectRatio={aspectRatio}
          maxHeight={maxHeight}
          alt={name}
          className={hoverImageClassname}
          onError={onError}
        />
      )}
    </div>
  )

  return compose(withBadge(showBadge), withCollection(showCollections))(img)
}

const ProductImage = ({
  showBadge,
  badgeText,
  hoverImage,
  displayMode,
  mainImageLabel,
  showCollections,
  width: widthProp,
  height: heightProp,
  maxHeight: maxHeightProp,
  aspectRatio: aspectRatioProp,
}) => {
  const { product } = useProductSummary()

  const {
    widthProp: width,
    heightProp: height,
    aspectRatioProp: aspectRatio,
    maxHeightProp: maxHeight,
  } = useResponsiveValues({
    widthProp,
    heightProp,
    aspectRatioProp,
    maxHeightProp,
  })

  const [error, setError] = useState(false)

  const imageClassName = classNames(productSummary.imageContainer, {
    'db w-100 center': displayMode !== 'inline',
  })

  return (
    <div className={imageClassName}>
      <ProductImageContent
        width={width}
        height={height}
        aspectRatio={aspectRatio}
        maxHeight={maxHeight}
        hasError={error}
        product={product}
        badgeText={badgeText}
        showBadge={showBadge}
        hoverImage={hoverImage}
        displayMode={displayMode}
        onError={() => setError(true)}
        mainImageLabel={mainImageLabel}
        showCollections={showCollections}
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
  mainImageLabel: PropTypes.string,
  hoverImageLabel: PropTypes.string,
  hoverImageIndex: PropTypes.number,
  hoverImageCriteria: PropTypes.oneOf(['index', 'label']),
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.object]),
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.object]),
  hoverImage: PropTypes.oneOf([
    PropTypes.shape({
      criteria: 'index',
      index: PropTypes.number
    }),
    PropTypes.shape({
      criteria: 'label',
      label: PropTypes.string
    }),
  ]),
}

ProductImage.defaultProps = {
  showBadge: true,
  showCollections: false,
  displayMode: 'normal',
  mainImageLabel: '',
  hoverImage: {
    label: '',
    criteria: 'label',
  }
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
      hoverImage: {
        type: "object",
        properties: {
          criteria: {
            enum: [
              "index",
              "label"
            ]
          }
        },
        dependencies: {
          criteria: {
            oneOf: [
              {
                properties: {
                  criteria: {
                    enum: [
                      "index"
                    ]
                  },
                  index: {
                    type: "number"
                  }
                }
              },
              {
                properties: {
                  criteria: {
                    enum: [
                      "label"
                    ]
                  },
                  label: {
                    type: "string"
                  }
                }
              }
            ]
          }
        }
      },
    },
  }
}

export default ProductImage
