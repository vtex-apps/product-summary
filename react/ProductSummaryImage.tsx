import React, {useState } from 'react'
import type { PropsWithChildren } from 'react'
import { CollectionBadges, DiscountBadge } from 'vtex.store-components'
import classNames from 'classnames'
import { useDevice } from 'vtex.device-detector'
import { useResponsiveValues } from 'vtex.responsive-values'
import type { ResponsiveValuesTypes } from 'vtex.responsive-values'
import { useCssHandles } from 'vtex.css-handles'
import type { CssHandlesTypes } from 'vtex.css-handles'
import { useProduct } from 'vtex.product-context'
import { Spinner } from 'vtex.styleguide'
import {
  ProductSummaryContext,
  ProductSummaryTypes,
} from 'vtex.product-summary-context'

import ImagePlaceholder from './components/ImagePlaceholder'
import productSummary from './productSummary.css'
import { changeImageUrlSize } from './utils/normalize'
import { imageUrl } from './utils/aspectRatioUtil'



const { useProductSummary } = ProductSummaryContext

const CSS_HANDLES = [
  'image',
  'imageWrapper',
  'imageContainer',
  'product',
  'imagePlaceholder',
  'mainImageHovered',
] as const

const MAX_SIZE = 500
const DEFAULT_SIZE = 300

type ImageLabelMatchCriteria = 'exact' | 'contains'

type MainImageLabel = {
  label?: string
  labelMatchCriteria?: ImageLabelMatchCriteria
}

type HoverImageCriteria = 'label' | 'index'

type HoverImage = {
  label?: string
  index?: number
  criteria?: HoverImageCriteria
  labelMatchCriteria?: ImageLabelMatchCriteria
  lazyLoad?:boolean
}

type GetImageSrcParams = {
  src: string
  width: number
  height: number
  dpi: number
  aspectRatio?: string | number
}

function getImageSrc({
  src,
  width,
  height,
  dpi,
  aspectRatio,
}: GetImageSrcParams) {
  if (width || height) {
    return changeImageUrlSize(src, width * dpi, height * dpi)
  }

  if (aspectRatio) {
    return imageUrl(src, DEFAULT_SIZE, MAX_SIZE, aspectRatio)
  }

  return src
}

type GetHoverImageParams = {
  images: ProductSummaryTypes.SKU['images']
  hoverImage?: HoverImage
  hoverImageLabel?: string
}

function findImageByIndex(
  images: ProductSummaryTypes.SKU['images'],
  index: HoverImage['index']
) {
  if (index === null || index === undefined || Number.isNaN(index)) {
    return null
  }

  return images[index]
}

function getHoverImage({
  images,
  hoverImage,
  hoverImageLabel,
}: GetHoverImageParams) {
  const {
    criteria = 'label',
    label = hoverImageLabel,
    labelMatchCriteria = 'exact',
    index,
  } = hoverImage ?? {}
  
  

  if (criteria === 'label') {
    return findImageByLabel(images, label, labelMatchCriteria)
  }

  if (criteria === 'index') {
    return findImageByIndex(images, index)
  }

  return null
}

type GetStyleParams = {
  width: number
  height: number
  aspectRatio?: string | number
  maxHeight?: string
}

function getStyle({ width, height, aspectRatio, maxHeight }: GetStyleParams) {
  if (width || height) {
    return {
      width: '100%',
      height,
      objectFit: 'contain',
      maxHeight: 'unset',
      maxWidth: width,
    } as React.CSSProperties
  }

  if (aspectRatio || maxHeight) {
    return {
      width: '100%',
      height: '100%',
      objectFit: 'contain',
      maxHeight: maxHeight ?? 'unset',
    } as React.CSSProperties
  }

  return undefined
}

type CollectionWrapperProps = {
  showCollections: boolean
  productClusters: Array<{ name: string }>
}

function CollectionWrapper({
  showCollections,
  productClusters,
  children,
}: PropsWithChildren<CollectionWrapperProps>) {
  if (!showCollections || !productClusters || productClusters.length === 0) {
    return <>{children}</>
  }

  const collections = productClusters.map((cl) => cl.name)

  return (
    <CollectionBadges collectionBadgesText={collections}>
      {children}
    </CollectionBadges>
  )
}

type BadgeWrapperProps = {
  showBadge: boolean
  commertialOffer: { ListPrice: number; Price: number }
  badgeText?: string
}

function BadgeWrapper({
  showBadge,
  commertialOffer,
  badgeText,
  children,
}: PropsWithChildren<BadgeWrapperProps>) {
  if (!showBadge) {
    return <>{children}</>
  }

  return (
    <DiscountBadge
      listPrice={commertialOffer.ListPrice}
      sellingPrice={commertialOffer.Price}
      label={badgeText}
    >
      {children}
    </DiscountBadge>
  )
}

function findImageByLabel(
  images: ProductSummaryTypes.SKU['images'],
  selectedLabel: string | undefined,
  labelMatchCriteria?: ImageLabelMatchCriteria
) {
  if (!selectedLabel) {
    return null
  }

  if (labelMatchCriteria === 'contains') {
    return images.find(({ imageLabel }) => imageLabel?.includes(selectedLabel))
  }

  return images.find(({ imageLabel }) => imageLabel === selectedLabel)
}

interface ImageProps {
  src: string
  width: number
  height: number
  onError: () => void
  alt: string
  className: string
  aspectRatio?: string | number
  maxHeight?: string
  lazy?: boolean
  setIsLoaded:(flag:boolean)=> void
  
}


function Image({
  src,
  width,
  height,
  onError,
  alt,
  className,
  aspectRatio,
  maxHeight,
  lazy,
  setIsLoaded
}: ImageProps) {
  const { isMobile } = useDevice()

  
  const dpi = isMobile ? 2 : 1

  const shouldResize = !!(width || height)

  if(lazy){
    return (
      <img
        lazy-src={getImageSrc({ src, width, height, dpi, aspectRatio })}
        style={getStyle({ width, height, aspectRatio, maxHeight })}
        // @ts-expect-error This property exists in HTML
        loading={shouldResize ? 'lazy' : 'auto'}
        alt={alt}
        className={className}
        onError={onError}
        onLoader={()=>setIsLoaded(true)}
      />
    )

  }

  return (
    <img
      src={getImageSrc({ src, width, height, dpi, aspectRatio })}
      style={getStyle({ width, height, aspectRatio, maxHeight })}
      // @ts-expect-error This property exists in HTML
      loading={shouldResize ? 'lazy' : 'auto'}
      alt={alt}
      className={className}
      onError={onError}
      onMouseOver={(event)=>{
        setIsLoaded(false) as void
        const lazyImg = (event.target as HTMLImageElement).parentElement?.children[1]
        const srcValue = lazyImg?.getAttribute("lazy-src")
        if(srcValue){
          lazyImg?.removeAttribute("lazy-src")
          lazyImg?.setAttribute("src",srcValue as string)
        } 
      }}
      
      
    />
  )
}

interface Props {
  /**
   * Set the discount badge's visibility
   * @default true
   */
  showBadge?: boolean
  /** Text shown on badge */
  badgeText?: string
  /**
   * Display mode of the summary
   * @default "normal"
   */
  displayMode?: 'normal' | 'inline'
  /**
   * @default ""
   */
  mainImageLabel?: string | MainImageLabel
  /**
   * @default ""
   * @deprecated
   * Use hoverImage instead
   */
  hoverImageLabel?: string
  hoverImage?: HoverImage
  /**
   * Defines if the collection badges are shown
   * @default false
   */
  showCollections?: boolean
  placeholder?: string
  width?: ResponsiveValuesTypes.ResponsiveValue<number | string>
  height?: ResponsiveValuesTypes.ResponsiveValue<number | string>
  aspectRatio?: ResponsiveValuesTypes.ResponsiveValue<string | number>
  maxHeight?: ResponsiveValuesTypes.ResponsiveValue<string>
  classes?: CssHandlesTypes.CustomClasses<typeof CSS_HANDLES>
}

function ProductImage({
  showBadge = true,
  badgeText,
  displayMode = 'normal',
  mainImageLabel = '',
  hoverImageLabel = '',
  hoverImage,
  showCollections = false,
  placeholder,
  width: widthProp,
  height: heightProp,
  aspectRatio: aspectRatioProp,
  maxHeight: maxHeightProp,
  classes,
}: Props) {
  const { product } = useProductSummary()
  const { handles, withModifiers } = useCssHandles(CSS_HANDLES, { classes })
  
  const [isLoaded,setIsLoaded] = useState(true)
  
  
  

  const [error, setError] = useState(false)
  const onError = () => setError(true)
  

  const { isMobile } = useDevice()
  const productContext = useProduct() ?? {}
  const { skuSelector: { selectedImageVariationSKU } = {} } = productContext

  const { productClusters, productName: name } = product ?? {}
  const sku = product?.sku

  const {
    widthProp: responsiveWidth,
    heightProp: responsiveHeight,
    aspectRatioProp: aspectRatio,
    maxHeightProp: maxHeight,
  } = useResponsiveValues({
    widthProp,
    heightProp,
    aspectRatioProp,
    maxHeightProp,
  })
  const images = sku?.images ?? []

  !hoverImage?.lazyLoad ?? false
  
    const selectedHoverImage = getHoverImage({
    images,
    hoverImage,
    hoverImageLabel,
  })
  
  
  
  

  const imageClassName = classNames(
    // legacy class
    productSummary.imageContainer,
    handles.imageWrapper,
    {
      'db w-100 center': displayMode !== 'inline',
    }
  )

  const [width, height] = [
    // fallsback to the other remaining value, if not defined
    // @ts-expect-error There's no problem passing type number to parseFloat
    parseFloat(responsiveWidth ?? responsiveHeight ?? 0),
    // @ts-expect-error There's no problem passing type number to parseFloat
    parseFloat(responsiveHeight ?? responsiveWidth ?? 0),
  ]

  const legacyContainerClasses = classNames(
    productSummary.imageStackContainer,
    !isMobile && productSummary.hoverEffect
  )

  const containerClassname = classNames(
    'dib relative',
    handles.imageContainer,
    legacyContainerClasses
  )

  let skuImageUrl = sku?.image?.imageUrl ?? ''

  const shouldDisplayPlaceholder = !skuImageUrl || error

  if (!placeholder && shouldDisplayPlaceholder) {
    return (
      <div className={imageClassName}>
        <div className={containerClassname}>
          <ImagePlaceholder cssHandle={handles.imagePlaceholder} />
        </div>
      </div>
    )
  }
  

  
  

  if (selectedImageVariationSKU == null && mainImageLabel) {
    const mainImage =
      typeof mainImageLabel === 'string'
        ? findImageByLabel(images, mainImageLabel)
        : findImageByLabel(
            images,
            mainImageLabel.label,
            mainImageLabel.labelMatchCriteria
          )

    if (mainImage) {
      skuImageUrl = mainImage.imageUrl
    }
  }

  const legacyImageClasses = classNames({
    [productSummary.imageNormal]: displayMode !== 'inline',
    [productSummary.imageInline]: displayMode === 'inline',
  })

  // TODO: change ProductSummaryContext to have `selectedSku` field instead of `sku`
  const commertialOffer = product.sku?.seller?.commertialOffer ?? {}

  const imageClassname = classNames(legacyImageClasses, handles.image, {
    [handles.mainImageHovered]: Boolean(selectedHoverImage),
  })

  const hoverImageClassname = classNames(
    'w-100 h-100 dn absolute top-0 left-0 z-999',
    withModifiers('image', 'hover'),
    legacyImageClasses,
    !isMobile && productSummary.hoverImage
  )
  
  
  
  

  return (
    <div className={imageClassName}>
      <CollectionWrapper
        showCollections={showCollections}
        productClusters={productClusters}
      >
        <BadgeWrapper
          showBadge={showBadge}
          commertialOffer={commertialOffer}
          badgeText={badgeText}
        >
          <div className={containerClassname}>
            <Image
              src={
                shouldDisplayPlaceholder ? (placeholder as string) : skuImageUrl
              }
              width={width}
              height={height}
              aspectRatio={aspectRatio}
              maxHeight={maxHeight}
              alt={name}
              className={imageClassname}
              onError={onError}
              lazy={false}
              setIsLoaded={setIsLoaded}
            />
            { !isLoaded &&
            <span className={productSummary.containerSpinner}>
              <Spinner color="currentColor" size={20} />
            </span>
            }
            {selectedHoverImage && !isMobile && (
              <Image
                lazy={hoverImage?.lazyLoad}
                src={selectedHoverImage.imageUrl}
                width={width}
                height={height}
                aspectRatio={aspectRatio}
                maxHeight={maxHeight}
                alt={name}
                className={hoverImageClassname}
                onError={onError}
                setIsLoaded={setIsLoaded}
              />
            )}
          </div>
        </BadgeWrapper>
      </CollectionWrapper>
    </div>
  )
}

ProductImage.schema = {
  title: 'admin/editor.productSummaryImage.title',
  description: 'admin/editor.productSummaryImage.description',
  type: 'object',
  properties: {
    showBadge: {
      type: 'boolean',
      title: 'admin/editor.productSummary.showBadge.title',
      default: true,
      isLayout: true,
    },
    showCollections: {
      type: 'boolean',
      title: 'admin/editor.productSummary.showCollections.title',
      default: false,
      isLayout: true,
    },
    displayMode: {
      title: 'admin/editor.productSummary.displayMode.title',
      type: 'string',
      enum: ['normal', 'inline'],
      default: 'normal',
      isLayout: true,
    },
    hoverImageLabel: {
      title: 'admin/editor.productSummaryImage.hoverImageLabel.title',
      description:
        'admin/editor.productSummaryImage.hoverImageLabel.description',
      type: 'string',
      default: '',
      isLayout: false,
    },
    hoverImage: {
      type: 'object',
      properties: {
        criteria: {
          title: 'admin/editor.productSummaryImage.hoverImage.criteria.title',
          enum: ['index', 'label'],
        },

      },
      dependencies: {
        criteria: {
          oneOf: [
            {
              properties: {
                criteria: {
                  enum: ['index'],
                },
                index: {
                  title:
                    'admin/editor.productSummaryImage.hoverImage.criteria.index',
                  type: 'number',
                },
              },
            },
            {
              properties: {
                criteria: {
                  enum: ['label'],
                },
                label: {
                  title:
                    'admin/editor.productSummaryImage.hoverImage.criteria.label',
                  type: 'string',
                },
                labelMatchCriteria: {
                  title:
                    'admin/editor.productSummaryImage.hoverImage.criteria.matchCriteria',
                  widget: {
                    'ui:widget': 'radio',
                  },
                  type: 'string',
                  enum: ['exact', 'contains'],
                  default: 'exact',
                },
              },
            },
          ],
        },
      },
    },
  },
}

export default ProductImage
