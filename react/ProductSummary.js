import React, { Component } from 'react'
import { FormattedMessage } from 'react-intl'
import { isMobile } from 'react-device-detect'
import { Link } from 'render'

import BuyButton from 'vtex.store-components/BuyButton'
import ProductName from 'vtex.store-components/ProductName'
import ProductPrice from 'vtex.store-components/ProductPrice'
import DiscountBadge from 'vtex.store-components/DiscountBadge'

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
  }

  constructor(props) {
    super(props)
    this.state = { isHovering: false }
  }

  handleMouseLeave = () => {
    this.setState({ isHovering: false })
  }

  handleMouseEnter = () => {
    this.setState({ isHovering: true })
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
                  <img
                    className="vtex-product-summary__image"
                    alt={product.productName}
                    src={product.sku.image.imageUrl}
                  />
                </DiscountBadge>
              ) : (
                <img
                  className="vtex-product-summary__image"
                  alt={product.productName}
                  src={product.sku.image.imageUrl}
                />
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
                  <BuyButton skuId={product.sku.itemId}>
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
  title: 'Product Summary',
  description: 'The product summary showing the main product informations',
  type: 'object',
  properties: {
    showListPrice: {
      type: 'boolean',
      title: "Show product's list price",
      default: true,
    },
    showLabels: {
      type: 'boolean',
      title: "Show product's prices' labels",
      default: true,
    },
    showInstallments: {
      type: 'boolean',
      title: "Show product's payment installments",
      default: true,
    },
    showBadge: {
      type: 'boolean',
      title: 'Show the discount badge',
      default: true,
    },
    badgeText: {
      type: 'string',
      title: "Badge's text",
    },
    buyButtonText: {
      type: 'string',
      title: "Custom buy button's text",
    },
    hideBuyButton: {
      type: 'boolean',
      title: 'Hides the buy button completely',
      default: false,
    },
    showButtonOnHover: {
      type: 'boolean',
      title: 'Show the buy button only on hover',
    },
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
