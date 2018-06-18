import React, { Component } from 'react'
import { FormattedMessage } from 'react-intl'
import { isMobile } from 'react-device-detect'
import { Link } from 'render'

import BuyButton from 'vtex.store-components/BuyButton'
import ProductName from 'vtex.store-components/ProductName'
import ProductPrice from 'vtex.store-components/ProductPrice'
import DiscountBadge from 'vtex.store-components/DiscountBadge'
import CollectionBadges from 'vtex.store-components/CollectionBadges'

import { createProduct } from './ProductFactory'
import ProductSummaryPropTypes from './propTypes'

import './global.css'

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
    hideBuyButton: false,
    showOnHover: false,
    isOneClickBuy: false,
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

  renderImage = product => {
    const { productClusters, productName: name, sku: { image: { imageUrl } } } = product

    if (productClusters.length > 0) {
      const collections = productClusters.map(cl => cl.name)

      return (
        <CollectionBadges collectionBadgesText={collections}>
          <img className="vtex-product-summary__image" alt={name} src={imageUrl} />
        </CollectionBadges>
      )
    }

    return (
      <img className="vtex-product-summary__image" alt={name} src={imageUrl} />
    )
  }

  render() {
    const {
      showListPrice,
      showLabels,
      showInstallments,
      showBadge,
      badgeText,
      buyButtonText,
      hideBuyButton,
      isOneClickBuy,
    } = this.props

    const product = this.props.product || createProduct()
    const showButtonOnHover = this.props.showButtonOnHover && !isMobile
    return (
      <div
        className="vtex-product-summary tc overflow-hidden center br3 flex flex-column justify-between"
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}>
        <div className="pointer pa3">
          <Link
            className="clear-link"
            page={'store/product'}
            params={{ slug: product.linkText }}>
            <div className="vtex-product-summary__image-container center db">
              {showBadge ? (
                <DiscountBadge
                  listPrice={product.sku.seller.commertialOffer.ListPrice}
                  sellingPrice={product.sku.seller.commertialOffer.Price}
                  label={badgeText}>
                  {this.renderImage(product)}
                </DiscountBadge>
              ) : (
                this.renderImage(product)
              )}
            </div>
            <div className="vtex-product-summary__name-container flex items-center justify-center near-black">
              <ProductName
                name={product.productName}
                skuName={product.sku.name}
                brandName={product.brand}
              />
            </div>
            <div className="vtex-price-container flex flex-column justify-center items-center pv2">
              <ProductPrice
                listPrice={product.sku.seller.commertialOffer.ListPrice}
                sellingPrice={product.sku.seller.commertialOffer.Price}
                installments={product.sku.seller.commertialOffer.Installments}
                showListPrice={showListPrice}
                showLabels={showLabels}
                showInstallments={showInstallments}
              />
            </div>
          </Link>
          <div className="vtex-product-summary__buy-button-container pv2">
            {!hideBuyButton &&
              (!showButtonOnHover || this.state.isHovering) && (
              <div className="vtex-product-summary__buy-button center">
                <BuyButton skuId={product.sku.itemId} isOneClickBuy={isOneClickBuy}>
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
    },
    showBadge: {
      type: 'boolean',
      title: 'editor.productSummary.showBadge.title',
      default: true,
    },
    badgeText: {
      type: 'string',
      title: 'editor.productSummary.badgeText.title',
    },
    buyButtonText: {
      type: 'string',
      title: 'editor.productSummary.buyButtonText.title',
    },
    hideBuyButton: {
      type: 'boolean',
      title: 'editor.productSummary.hideBuyButton.title',
      default: false,
    },
    showButtonOnHover: {
      type: 'boolean',
      title: 'editor.productSummary.showButtonOnHover.title',
    },
    ...ProductPrice.schema.properties,
  },
}

ProductSummary.getSchema = ({ hideBuyButton }) => {
  const { showButtonOnHover, ...rest } = defaultSchema.properties
  return {
    ...defaultSchema,
    properties: {
      ...rest,
      ...(hideBuyButton ? {} : { showButtonOnHover }),
    },
  }
}

export default ProductSummary
