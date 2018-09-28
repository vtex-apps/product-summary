import './global.css'

import { path } from 'ramda'
import React, { Component } from 'react'
import ContentLoader from 'react-content-loader'
import { isMobile } from 'react-device-detect'
import { FormattedMessage } from 'react-intl'
import { Link } from 'render'
import BuyButton from 'vtex.store-components/BuyButton'
import CollectionBadges from 'vtex.store-components/CollectionBadges'
import DiscountBadge from 'vtex.store-components/DiscountBadge'
import ProductName from 'vtex.store-components/ProductName'
import ProductPrice from 'vtex.store-components/ProductPrice'

import ProductSummaryPropTypes from './propTypes'

/**
 * Product Summary component. Summarizes the product information.
 */
class ProductSummary extends Component {
  static propTypes = ProductSummaryPropTypes

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

  renderImage = () => {
    const { product, showBadge, badgeText, showCollections } = this.props
    const {
      productClusters,
      productName: name,
      sku: {
        image: { imageUrl },
      },
    } = product

    let img = (
      <img className="vtex-product-summary__image" alt={name} src={imageUrl} />
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

  renderImageLoader = () => (
    <ContentLoader
      style={{
        width: '100%',
        height: '100%',
      }}
      height="100%"
      width="100%"
    >
      <rect width="100%" height="100%" />
    </ContentLoader>
  )

  render() {
    const {
      showListPrice,
      showLabels,
      showInstallments,
      buyButtonText,
      hideBuyButton,
      isOneClickBuy,
      product,
    } = this.props

    const showButtonOnHover = this.props.showButtonOnHover && !isMobile
    const showBuyButton =
      !hideBuyButton && (!showButtonOnHover || this.state.isHovering)
    const availability = path(['sku', 'seller', 'commertialOffer', 'AvailableQuantity'], product) || 0
    const isAvailable = (availability > 0)

    return (
      <div
        className="vtex-product-summary tc overflow-hidden center br3 flex flex-column justify-between"
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        <div className="pointer pa3">
          <Link
            className="clear-link"
            page={'store/product'}
            params={{ slug: path(['linkText'], product) }}
          >
            <div className="vtex-product-summary__image-container center db">
              {path(['sku', 'image', 'imageUrl'], product)
                ? this.renderImage()
                : this.renderImageLoader()}
            </div>
            <div className="vtex-product-summary__name-container flex items-center justify-center near-black">
              <ProductName
                name={path(['productName'], product)}
                skuName={path(['sku', 'name'], product)}
                brandName={path(['brand'], product)}
                {...this.props.name}
              />
            </div>
            <div className="vtex-price-container flex flex-column justify-center items-center pv2">
              <ProductPrice
                listPrice={path(['ListPrice'], this.commertialOffer)}
                sellingPrice={path(['Price'], this.commertialOffer)}
                installments={path(['Installments'], this.commertialOffer)}
                showListPrice={showListPrice}
                showLabels={showLabels}
                showInstallments={showInstallments}
              />
            </div>
          </Link>
          <div className="vtex-product-summary__buy-button-container pv2">
            {showBuyButton && (
              <div className="vtex-product-summary__buy-button center">
                <BuyButton
                  available={isAvailable}
                  skuItems={
                    path(['sku', 'itemId'], product) && [
                      {
                        skuId: path(['sku', 'itemId'], product),
                        quantity: 1,
                        seller: 1,
                      },
                    ]
                  }
                  isOneClickBuy={isOneClickBuy}
                >
                  {buyButtonText || <FormattedMessage id="button-label" />}
                </BuyButton>
              </div>
            )}
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

export default ProductSummary
