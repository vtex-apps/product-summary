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
        ? window.open(this.props.product.url)
        : window.location.assign(this.props.product.url)
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
        className="vtex-product-summary tc pointer pa3 overflow-hidden"
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}>
        <div>
          <div onClick={this.handleClick}>
            <div className="vtex-product-summary__image-container center">
              {showBadge ? (
                <DiscountBadge
                  listPrice={product.listPrice}
                  sellingPrice={product.sellingPrice}
                  label={badgeText}>
                  <img
                    className="vtex-product-summary__image"
                    alt={product.name}
                    src={product.imageUrl}
                  />
                </DiscountBadge>
              ) : (
                <img
                  className="vtex-product-summary__image"
                  alt={product.name}
                  src={product.imageUrl}
                />
              )}
            </div>
            <div className="vtex-product-summary__name-container flex items-center justify-center near-black">
              <ProductName
                name={product.name}
                skuName={product.skuName}
                brandName={product.brandName}
              />
            </div>
            <div className="vtex-price-container">
              <Price
                listPrice={product.listPrice}
                sellingPrice={product.sellingPrice}
                installments={product.installments}
                installmentPrice={product.installmentPrice}
                showListPrice={showListPrice}
                showLabels={showLabels}
                showInstallments={showInstallments}
              />
            </div>
          </div>
          <div className="pv2">
            <div className="vtex-product-summary__buy-button-container">
              {!hideBuyButton &&
                (!showButtonOnHover || this.state.isHovering) && (
                <div className="vtex-product-summary__buy-button center">
                  <BuyButton
                    {...orderForm}
                    quantity={1}
                    skuId={product.skuId}
                    afterClick={event => event.stopPropagation()}>
                    {buyButtonText || <FormattedMessage id="button-label" />}
                  </BuyButton>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

ProductSummary.propTypes = {
  /** Product that owns the informations */
  product: PropTypes.shape({
    /** Product's list price */
    listPrice: PropTypes.number.isRequired,
    /** Product's selling price */
    sellingPrice: PropTypes.number.isRequired,
    /** Product's image url */
    imageUrl: PropTypes.string.isRequired,
    /** Product's url */
    url: PropTypes.string.isRequired,
    /** Product's name */
    name: PropTypes.string.isRequired,
    /** Product's selected SKU name */
    skuName: PropTypes.string,
    /** Product's brand name */
    brandName: PropTypes.string,
    /** Product's reference code of the product */
    referenceCode: PropTypes.string,
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
