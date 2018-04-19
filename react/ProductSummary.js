import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'

import Card from '@vtex/styleguide/lib/Card'
import Button from '@vtex/styleguide/lib/Button'

import ProductName from './ProductName'
import Price from './Price'
import DiscountBadge from './DiscountBadge'
import { createProduct } from './ProductFactory'

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

  handleClick = (event) => {
    if (this.props.product) {
      event.ctrlKey ? window.open(this.props.product.url) : window.location.assign(this.props.product.url)
    }
  }

  render() {
    const {
      showListPrice,
      showLabels,
      showInstallments,
      showBadge,
      badgeText,
      hideBuyButton,
      showButtonOnHover,
    } = this.props

    const product = this.props.product || createProduct()

    return (
      <div className="vtex-product-summary">
        <Card fullWidth>
          <div className="tc pointer"
            onMouseEnter={this.handleMouseEnter}
            onMouseLeave={this.handleMouseLeave}>
            {!product &&
            <div>
              <FormattedMessage id="loading" />
            </div>
            }
            {product && (
              <div>
                <div onClick={this.handleClick}>
                  <div>
                    {
                      showBadge ? (
                        <DiscountBadge
                          listPrice={product.listPrice}
                          sellingPrice={product.sellingPrice}
                          label={badgeText}>
                          <img className="vtex-product-summary__image" alt={product.name} src={product.imageUrl} />
                        </DiscountBadge>
                      ) : (
                        <img className="vtex-product-summary__image" alt={product.name} src={product.imageUrl} />
                      )
                    }
                  </div>
                  <div className="vtex-product-summary__name-container pv5 f4 gray db tc">
                    <ProductName
                      name={product.name}
                      skuName={product.skuName}
                      brandName={product.brandName}
                      referenceCode={product.referenceCode} />
                  </div>
                  <div className="vtex-product-summary__price-container pv1">
                    <Price
                      listPrice={product.listPrice}
                      sellingPrice={product.sellingPrice}
                      installments={product.installments}
                      installmentPrice={product.installmentPrice}
                      showListPrice={showListPrice}
                      showLabels={showLabels}
                      showInstallments={showInstallments} />
                  </div>
                </div>
                <div className="pv2">
                  <div className={`${(!showButtonOnHover || (showButtonOnHover && this.state.isHovering)) ? 'db' : 'dn'}`}>
                    {!hideBuyButton && (
                    // TODO: Use the buy button component
                      <div className="vtex-product-summary__buy-button center">
                        <Button block primary onClick={event => event.stopPropagation()}>BUY</Button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </Card>
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
  /** Shows the product list price */
  showListPrice: PropTypes.bool,
  /** If true, shows the pricing labels. If false, only the numbers will be shown */
  showLabels: PropTypes.bool,
  /** If true, shows the install information */
  showInstallments: PropTypes.bool,
  /** If true, shows the discount badge */
  showBadge: PropTypes.bool,
  /** Text shown on badge */
  badgeText: PropTypes.string,
  /** Hides the buy button completely . If active, the button will not be shown in any condition */
  hideBuyButton: PropTypes.bool,
  /** Defines if the button is shown only if the mouse is on the summary */
  showButtonOnHover: PropTypes.bool,
}

ProductSummary.schema = {
  title: 'Product Summary',
  description: 'The product summary showing the main product informations',
  type: 'object',
  properties: {
    showListPrice: {
      type: 'boolean',
      title: 'Show product\'s list price',
    },
    showLabels: {
      type: 'boolean',
      title: 'Show product\'s prices\' labels (if false, shows only the prices)',
    },
    showInstallments: {
      type: 'boolean',
      title: 'Show product\'s payment installments',
    },
    showBadge: {
      type: 'boolean',
      title: 'Show the discount badge',
    },
    badgeText: {
      type: 'string',
      title: 'Badge\'s text',
    },
    hideBuyButton: {
      type: 'boolean',
      title: 'Hides the buy button completely',
    },
    showButtonOnHover: {
      type: 'boolean',
      title: 'Show the buy button only on hover (if not hidden)',
    },
  },
}

export default ProductSummary
