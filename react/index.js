import PropTypes from 'prop-types'
import { path } from 'ramda'
import React, { Component } from 'react'
import ContentLoader from 'react-content-loader'
import { FormattedMessage } from 'react-intl'
import { Link, withRuntimeContext } from 'render'
import classNames from 'classnames'
import BuyButton from 'vtex.store-components/BuyButton'
import CollectionBadges from 'vtex.store-components/CollectionBadges'
import DiscountBadge from 'vtex.store-components/DiscountBadge'
import ProductName from 'vtex.store-components/ProductName'
import ProductPrice from 'vtex.store-components/ProductPrice'

import { productShape } from './propTypes'
import Image from './components/Image'

import './global.css'

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
    hideBuyButton: false,
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

  get renderImage() {
    const { product, showBadge, badgeText, showCollections } = this.props
    const {
      productClusters,
      productName: name,
      sku: {
        image: { imageUrl },
      },
    } = product

    let img = (
      <Image className="vtex-product-summary__image" alt={name} src={imageUrl} />
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

  get renderImageLoader() {
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

  get renderProductPrice() {

    const {
      showListPrice,
      showLabels,
      showInstallments,
      labelSellingPrice,
      displayMode,
      showBorders
    } = this.props

    const containerClasses = classNames('vtex-product-summary__price-container flex flex-column pv2', {
      'justify-center items-center': displayMode !== 'inline',
      'pv2': !showBorders
    })

    return (
      <div className={containerClasses}>
        <ProductPrice
          className="flex flex-column justify-around"
          listPriceContainerClass="pv1 normal c-muted-2"
          listPriceLabelClass="dib strike"
          listPriceClass="dib ph2 strike t-small-ns"
          sellingPriceContainerClass="pt1 pb3 c-muted-1"
          sellingPriceLabelClass="dib"
          sellingPriceClass="dib ph2 t-heading-4"
          savingsContainerClass="c-muted-2"
          savingsClass="dib"
          interestRateClass="dib pl2"
          installmentContainerClass="c-muted-2"
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

  get renderProductName() {
    const {
      displayMode,
      product,
      name: showFieldsProps
    } = this.props

    const containerClasses = classNames(
      'vtex-product-summary__name-container flex',
      {
        'items-center justify-center': displayMode !== 'inline',
        'justify-left w-100': displayMode === 'inline',
        'pt5 pb3': displayMode === 'small',
        't-mini pv2': displayMode !== 'normal',
        'pt7 pb4': displayMode === 'normal',
      }
    )

    const productName = path(['productName'], product)
    const skuName = path(['sku', 'name'], product)
    const brandName = path(['brand'], product)

    return (
      <div className={containerClasses}>
        <ProductName
          className="vtex-product-name overflow-hidden c-on-base"
          brandNameClass="t-body"
          skuNameClass="t-small"
          loaderClass="pt5 overflow-hidden"
          name={productName}
          skuName={skuName}
          brandName={brandName}
          {...showFieldsProps}
        />
      </div>
    );
  }


  render() {
    const {
      showBorders,
      buyButtonText,
      hideBuyButton,
      isOneClickBuy,
      product,
      displayMode,
      actionOnClick,
      runtime: { hints: { mobile } },
    } = this.props

    const showButtonOnHover = this.props.showButtonOnHover && !mobile
    const showBuyButton =
      !hideBuyButton && (!showButtonOnHover || this.state.isHovering)
    const quantity = path(['sku', 'seller', 'commertialOffer', 'AvailableQuantity'], product) || 0
    const isAvailable = (quantity > 0)

    const classes = classNames('vtex-product-summary overflow-hidden br3 w-100 h-100', {
      'flex flex-column justify-between center tc': displayMode !== 'inline',
      'vtex-product-summary--normal': displayMode === 'normal',
      'vtex-product-summary--small': displayMode === 'small',
      'vtex-product-summary--inline': displayMode === 'inline',
    })

    const buyButtonClasses = classNames(
      'vtex-product-summary__buy-button-container pv3 w-100',
      {
        'dn': displayMode === 'small' || displayMode === 'inline',
        'dn db-ns': displayMode === 'normal',
      }
    )

    const linkClasses = classNames('clear-link flex', {
      'flex-column': displayMode !== 'inline',
    })

    const imageContainerClasses = classNames('vtex-product-summary__image-container db', {
      'w-100 center': displayMode !== 'inline',
      'w-40': displayMode === 'inline',
    })

    const informationClasses = classNames('vtex-product-summary__informations', {
      'w-80 pv3 pl3 pr3 h-100': displayMode === 'inline'
    })

    const elementClasses = classNames('pointer pa2', {
      'bb b--muted-4 ma2': showBorders
    })

    const style = { visibility: showBuyButton ? 'visible' : 'hidden' }

    return (
      <div
        className={classes}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        <div className={elementClasses}>
          <Link
            className={linkClasses}
            page={'store/product'}
            params={{ slug: path(['linkText'], product) }}
            onClick={actionOnClick}
          >
            <div className={imageContainerClasses}>
              {path(['sku', 'image', 'imageUrl'], product)
                ? this.renderImage
                : this.renderImageLoader}
            </div>
            <div className={informationClasses}>
              {this.renderProductName}
              {this.renderProductPrice}
            </div>
          </Link>
          <div className={buyButtonClasses}>
            <div style={style} className="vtex-product-summary__buy-button center mw-100">
              <BuyButton
                available={isAvailable}
                skuItems={
                  path(['sku', 'itemId'], product) && [
                    {
                      skuId: path(['sku', 'itemId'], product),
                      quantity: 1,
                      seller: path(['sku', 'seller', 'sellerId'], product),
                    },
                  ]
                }
                isOneClickBuy={isOneClickBuy}
              >
                {buyButtonText || <FormattedMessage id="button-label" />}
              </BuyButton>
            </div>
          </div>
        </div>
      </div>
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
    hideBuyButton: {
      type: 'boolean',
      title: 'editor.productSummary.hideBuyButton.title',
      default: false,
      isLayout: true,
    },
    showButtonOnHover: {
      type: 'boolean',
      title: 'editor.productSummary.showButtonOnHover.title',
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

ProductSummary.getSchema = ({ hideBuyButton }) => {
  const { showButtonOnHover, ...rest } = defaultSchema.properties
  const nameSchema = ProductName.schema
  return {
    ...defaultSchema,
    properties: {
      ...rest,
      ...(hideBuyButton ? {} : { showButtonOnHover }),
      name: nameSchema,
    },
  }
}

export default withRuntimeContext(ProductSummary)
