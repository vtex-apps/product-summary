import PropTypes from 'prop-types'
import { path } from 'ramda'
import React, { Component } from 'react'
import ContentLoader from 'react-content-loader'
import { Link, withRuntimeContext } from 'vtex.render-runtime'
import classNames from 'classnames'
import {
  CollectionBadges,
  DiscountBadge,
  ProductName,
  ProductPrice,
} from 'vtex.store-components'

import Image from './components/Image'
import ProductSummaryBuyButton from './components/ProductSummaryBuyButton'
import AttachmentList from './components/AttachmentList'
import ProductQuantityStepper from './components/ProductQuantityStepper'
import displayButtonTypes, {
  getDisplayButtonNames,
  getDisplayButtonValues,
} from './utils/displayButtonTypes'
import { productShape } from './utils/propTypes'
import productSummary from './productSummary.css'

/**
 * Product Summary component. Summarizes the product information.
 */
class ProductSummary extends Component {
  static propTypes = {
    /** Product that owns the informations */
    product: productShape,
    /** Shows the product list price */
    showListPrice: PropTypes.bool,
    /** Should redirect to checkout after clicking on buy */
    isOneClickBuy: PropTypes.bool,
    /** Set pricing labels' visibility */
    showLabels: PropTypes.bool,
    /** Set installments' visibility */
    showInstallments: PropTypes.bool,
    /** Set the borders product's visibility */
    showBorders: PropTypes.bool,
    /** Set the discount badge's visibility */
    showBadge: PropTypes.bool,
    /** Text of selling Price's label */
    labelSellingPrice: PropTypes.string,
    /** Text shown on badge */
    badgeText: PropTypes.string,
    /** Custom buy button text */
    buyButtonText: PropTypes.string,
    /** Defines the display mode of buy button */
    displayBuyButton: PropTypes.oneOf(getDisplayButtonValues()),
    /** Hides the buy button completely . If active, the button will not be shown in any condition */
    hideBuyButton: PropTypes.bool,
    /** Defines if the button is shown only if the mouse is on the summary */
    showButtonOnHover: PropTypes.bool,
    /** Defines if the collection badges are shown */
    showCollections: PropTypes.bool,
    /** Name schema props */
    name: PropTypes.object,
    /** Runtime context */
    runtime: PropTypes.shape({
      hints: PropTypes.shape({
        /** Indicates if is on a mobile device */
        mobile: PropTypes.bool,
      }),
    }),
    /** Display mode of the summary used in the search result */
    displayMode: PropTypes.oneOf([
      'normal',
      'small',
      'inline',
    ]),
    /** Function that is executed when a product is clicked */
    actionOnClick: PropTypes.func,
  }

  static defaultProps = {
    showListPrice: true,
    showInstallments: true,
    showLabels: true,
    showBadge: true,
    showCollections: false,
    displayBuyButton: displayButtonTypes.DISPLAY_ALWAYS.value,
    showOnHover: false,
    isOneClickBuy: false,
    name: {
      showProductReference: false,
      showBrandName: false,
      showSku: false,
    },
    displayMode: 'normal',
    showBorders: false,
  }

  state = {
    isHovering: false,
    isUpdatingItems: false,
  }

  handleMouseLeave = () => {
    this.setState({ isHovering: false })
  }

  handleMouseEnter = () => {
    this.setState({ isHovering: true })
  }

  get commertialOffer() {
    return path(['sku', 'seller', 'commertialOffer'], this.props.product)
  }

  renderImage() {
    const { product, showBadge, badgeText, showCollections } = this.props
    const {
      productClusters,
      productName: name,
      sku: {
        image: { imageUrl },
      },
    } = product

    let img = (
      <Image className={`${productSummary.image}`} alt={name} src={imageUrl} />
    )

    if (showBadge) {
      img = (
        <DiscountBadge
          listPrice={this.commertialOffer.ListPrice}
          sellingPrice={this.commertialOffer.Price}
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

  renderImageLoader() {
    return (
      <ContentLoader
        style={{
          width: '100%',
          height: '100%',
        }}
        width={100}
        height={56}
        preserveAspectRatio="xMinYMin meet"
      >
        <rect width="100%" height="100%" />
      </ContentLoader>
    )
  }

  handleItemsStateUpdate = isLoading => this.setState({ isUpdatingItems: isLoading })

  renderPrice() {
    const {
      showBorders,
      showListPrice,
      showLabels,
      showInstallments,
      labelSellingPrice,
      displayMode,
    } = this.props

    const containerClasses = classNames('flex flex-column', {
      'justify-end items-center': displayMode !== 'inline',
      [`${productSummary.priceContainer} pv5`]: !showBorders,
    })

    return (
      <div className={containerClasses}>
        <ProductPrice
          className="flex flex-column justify-start"
          listPriceContainerClass="pv1 normal c-muted-2"
          listPriceLabelClass="dib strike t-small t-mini"
          listPriceClass="dib ph2 strike t-small-ns t-mini"
          sellingPriceContainerClass="pt1 pb3 c-on-base"
          sellingPriceLabelClass="dib"
          sellingPriceClass="dib ph2 t-heading-5-ns"
          savingsContainerClass="t-small-ns c-muted-2"
          savingsClass="dib"
          interestRateClass="dib pl2"
          installmentContainerClass="t-small-ns c-muted-2"
          listPrice={path(['ListPrice'], this.commertialOffer)}
          sellingPrice={path(['Price'], this.commertialOffer)}
          installments={path(['Installments'], this.commertialOffer)}
          showListPrice={showListPrice}
          showLabels={showLabels}
          showInstallments={showInstallments}
          labelSellingPrice={labelSellingPrice}
        />
      </div>
    )
  }

  renderProductName() {
    const {
      displayMode,
      product,
      showBorders,
      name: showFieldsProps,
    } = this.props

    const containerClasses = classNames(
      'flex items-start',
      {
        'justify-center': displayMode !== 'inline',
        'justify-left w-100': displayMode === 'inline',
        'pv5': displayMode === 'small',
        't-mini pb2': displayMode !== 'normal',
        'pv6': displayMode === 'normal',
        [productSummary.nameContainer]: !showBorders,
        'pb6': showBorders,
      }
    )

    const productName = path(['productName'], product)
    const skuName = path(['sku', 'name'], product)
    const brandName = path(['brand'], product)

    const brandNameClasses = classNames('t-body', {
      't-mini': displayMode !== 'normal',
    })

    return (
      <div className={containerClasses}>
        <ProductName
          className="overflow-hidden c-on-base"
          brandNameClass={brandNameClasses}
          skuNameClass="t-small"
          loaderClass="pt5 overflow-hidden"
          name={productName}
          skuName={skuName}
          brandName={brandName}
          {...showFieldsProps}
        />
      </div>
    )
  }

  render() {
    const {
      actionOnClick,
      product,
      displayMode,
      displayBuyButton,
      isOneClickBuy,
      buyButtonText,
      showBorders,
      runtime,
    } = this.props

    const classes = classNames(`${productSummary.container} overflow-hidden br3 h-100`, {
      'flex flex-column justify-between center tc': displayMode !== 'inline',
      [`${productSummary.containerNormal}`]: displayMode === 'normal',
      [`${productSummary.containerSmall}`]: displayMode === 'small',
      [`${productSummary.containerInline} w-100`]: displayMode === 'inline',
    })

    const linkClasses = classNames(`${productSummary.clearLink} flex`, {
      'flex-column': displayMode !== 'inline',
    })

    const imageContainerClasses = classNames(`${productSummary.imageContainer} db`, {
      'w-100 center': displayMode !== 'inline',
      'w-40': displayMode === 'inline',
    })

    const informationClasses = classNames(`${productSummary.information}`, {
      'w-80 pb2 pl3 pr3 h-100': displayMode === 'inline',
    })

    const elementClasses = classNames(`${productSummary.element} pointer ph2 pt3 pb4 flex flex-column`, {
      'bb b--muted-4 mh2 mt2': showBorders,
    })

    const priceWrapperClasses = classNames({
      'flex justify-between items-center': displayMode === 'inline',
    })

    const buyButtonProps = {
      product,
      displayMode,
      displayBuyButton,
      isOneClickBuy,
      buyButtonText,
      runtime,
      isHovering: this.state.isHovering,
    }

    return (
      <section
        className={classes}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        <article className={elementClasses}>
          <Link
            className={linkClasses}
            page={'store.product'}
            params={{ slug: path(['linkText'], product) }}
            onClick={actionOnClick}
          >
            <div className={imageContainerClasses}>
              {path(['sku', 'image', 'imageUrl'], product)
                ? this.renderImage()
                : this.renderImageLoader()}
            </div>
            <div className={informationClasses}>
              {this.renderProductName()}
              <AttachmentList product={product} />
              <div className={priceWrapperClasses}>
                {displayMode === 'inline' && (
                  <ProductQuantityStepper
                    product={product}
                    onUpdateItemsState={this.handleItemsStateUpdate}
                  />
                )}
                {this.renderPrice()}
              </div>
            </div>
          </Link>
          <ProductSummaryBuyButton {...buyButtonProps} />
        </article>
      </section>
    )
  }
}

const defaultSchema = {
  title: 'editor.productSummary.title',
  description: 'editor.productSummary.description',
  type: 'object',
  properties: {
    isOneClickBuy: {
      type: 'boolean',
      title: 'editor.productSummary.isOneClickBuy.title',
      default: false,
      isLayout: true,
    },
    showBadge: {
      type: 'boolean',
      title: 'editor.productSummary.showBadge.title',
      default: true,
      isLayout: true,
    },
    badgeText: {
      type: 'string',
      title: 'editor.productSummary.badgeText.title',
      isLayout: false,
    },
    buyButtonText: {
      type: 'string',
      title: 'editor.productSummary.buyButtonText.title',
      isLayout: false,
    },
    displayBuyButton: {
      title: 'editor.productSummary.displayBuyButton.title',
      type: 'string',
      enum: getDisplayButtonValues(),
      enumNames: getDisplayButtonNames(),
      default: displayButtonTypes.DISPLAY_ALWAYS.value,
      isLayout: true,
    },
    showCollections: {
      type: 'boolean',
      title: 'editor.productSummary.showCollections.title',
      default: false,
      isLayout: true,
    },
    ...ProductPrice.schema.properties,
  },
}

ProductSummary.getSchema = ({ displayBuyButton }) => {
  const nameSchema = ProductName.schema
  return {
    ...defaultSchema,
    properties: {
      ...defaultSchema.properties,
      ...displayBuyButton,
      name: nameSchema,
    },
  }
}

export default withRuntimeContext(ProductSummary)
