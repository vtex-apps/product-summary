import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Button from '@vtex/styleguide/lib/Button'
import { FormattedMessage } from 'react-intl'

import ProductName from './ProductName'
import Price from './Price'
import DiscountBadge from './DiscountBadge'

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
    event.ctrlKey ? window.open(this.props.product.url) : window.location.assign(this.props.product.url)
  }

  render() {
    const {
      product,
      showListPrice,
      showLabels,
      showInstallments,
      showBadge,
      badgeText,
      hideDetailsButton,
      hideBuyButton,
      showButtonsOnHover,
    } = this.props

    return (
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
                      <img alt={product.name} src={product.imageUrl} />
                    </DiscountBadge>
                  ) : (
                    <img alt={product.name} src={product.imageUrl} />
                  )
                }
              </div>
              <div className="pv2">
                <ProductName
                  name={product.name}
                  skuName={product.skuName}
                  brandName={product.brandName}
                  referenceCode={product.referenceCode} />
              </div>
              <div className="pv1">
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
            <div className="pt4">
              <div className={`cf ph4 ${(!showButtonsOnHover || (showButtonsOnHover && this.state.isHovering)) ? 'db' : 'dn'}`}>
                {!hideDetailsButton && (
                  <div className={`${(!hideBuyButton && 'fl') || ''}`}>
                    <Button onClick={this.handleClick} block>
                      <FormattedMessage id="details" />
                    </Button>
                  </div>
                )}
                {!hideBuyButton && (
                  // TODO: Use the buy button component
                  <div className={`${(!hideDetailsButton && 'fr') || ''}`}>
                    <Button primary onClick={event => event.stopPropagation()} block>BUY</Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
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
  /** Hides the details button completely */
  hideDetailsButton: PropTypes.bool,
  /** Hides the buy button completely. If active, the button will not be shown in any condition */
  hideBuyButton: PropTypes.bool,
  /** Defines if the button is shown only if the mouse is on the summary */
  showButtonsOnHover: PropTypes.bool,
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
    hideDetailsButton: {
      type: 'boolean',
      title: 'Hides the details button completely',
    },
    hideBuyButton: {
      type: 'boolean',
      title: 'Hides the buy button completely',
    },
    showButtonsOnHover: {
      type: 'boolean',
      title: 'Show the buttons only on hover (if not hidden)',
    },
  },
}

export default ProductSummary
