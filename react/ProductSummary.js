import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'
import { isMobile } from 'react-device-detect'

import BuyButton from '@vtex/buy-button'

import ProductName from './ProductName'
import Price from './Price'
import DiscountBadge from './DiscountBadge'
import { createProduct } from './ProductFactory'

import './summary.css'

/**
 * Product Summary component. Summarizes the product information.
 */
class ProductSummary extends Component {
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

  handleClick = event => {
    if (this.props.product) {
      event.ctrlKey
        ? window.open(this.props.product.link)
        : window.location.assign(this.props.product.link)
    }
  }

  render() {
    const {
      orderForm,
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
        className="vtex-product-summary tc pointer pa3 overflow-hidden center br3 h-100 flex flex-column justify-between"
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        onClick={this.handleClick}>
        <div>
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
          <div className="vtex-price-container flex flex-column justify-center items-center">
            <Price
              listPrice={product.sku.seller.commertialOffer.ListPrice}
              sellingPrice={product.sku.seller.commertialOffer.Price}
              installments={product.sku.seller.commertialOffer.Installments}
              installmentPrice={
                product.sku.seller.commertialOffer.InstallmentPrice
              }
              showListPrice={showListPrice}
              showLabels={showLabels}
              showInstallments={showInstallments}
            />
          </div>
          <div className="vtex-product-summary__buy-button-container pv2">
            {!hideBuyButton &&
              (!showButtonOnHover || this.state.isHovering) && (
              <div className="vtex-product-summary__buy-button center">
                <BuyButton
                  {...orderForm}
                  quantity={1}
                  skuId={product.sku.referenceId.Value}
                  afterClick={event => event.stopPropagation()}>
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

ProductSummary.propTypes = {
  /** Product that owns the informations */
  product: PropTypes.shape({
    /** Product's id */
    productId: PropTypes.string.isRequired,
    /** Product's name */
    productName: PropTypes.string.isRequired,
    /** Product's URL to further details */
    link: PropTypes.string.isRequired,
    /** Product's brand */
    brand: PropTypes.string.isRequired,
    /** Product's SKU */
    sku: PropTypes.shape({
      /** SKU name */
      name: PropTypes.string.isRequired,
      /** SKU reference id */
      referenceId: PropTypes.shape({
        /** Reference id value */
        Value: PropTypes.string.isRequired,
      }),
      /** SKU Image to be shown */
      image: PropTypes.shape({
        /** Image URL */
        imageUrl: PropTypes.string.isRequired,
        /** Image tag as string */
        imageTag: PropTypes.string.isRequired,
      }).isRequired,
      /** SKU seller */
      seller: PropTypes.shape({
        /** Seller comertial offer */
        commertialOffer: PropTypes.shape({
          /** Selling Price */
          Price: PropTypes.number.isRequired,
          /** List Price */
          ListPrice: PropTypes.number.isRequired,
        }).isRequired,
      }).isRequired,
    }).isRequired,
  }),
  /** Order form used in the buy button */
  orderForm: PropTypes.shape({
    /** User's cart id */
    orderFormId: PropTypes.string.isRequired,
    /** Channel */
    salesChannel: PropTypes.string.isRequired,
    /** Which seller is being referenced by the button */
    seller: PropTypes.string.isRequired,
  }),
  /** Shows the product list price */
  showListPrice: PropTypes.bool,
  /** Set pricing labels' visibility */
  showLabels: PropTypes.bool,
  /** Set installments' visibility */
  showInstallments: PropTypes.bool,
  /** Set the discount badge's visibility */
  showBadge: PropTypes.bool,
  /** Text shown on badge */
  badgeText: PropTypes.string,
  /** Custom buy button text */
  buyButtonText: PropTypes.string,
  /** Hides the buy button completely . If active, the button will not be shown in any condition */
  hideBuyButton: PropTypes.bool,
  /** Defines if the button is shown only if the mouse is on the summary */
  showButtonOnHover: PropTypes.bool,
}

ProductSummary.defaultProps = {
  showListPrice: true,
  showInstallments: true,
  showLabels: true,
  showBadge: true,
  hideBuyButton: false,
  showOnHover: false,
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
