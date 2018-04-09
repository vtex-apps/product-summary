import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Button from '@vtex/styleguide/lib/Button'

import ProductName from './ProductName'
import Price from './Price'
import DiscountBadge from './DiscountBadge'

class ProductSummary extends Component {
  constructor(props) {
    super(props)
    this.state = { isHovering: false }
  }

  onMouseLeave() {
    this.setState({ isHovering: false })
  }

  onMouseEnter() {
    this.setState({ isHovering: true })
  }

  redirect(event) {
    event.ctrlKey ? window.open(this.props.product.url) : window.location.assign(this.props.product.url)
  }

  render() {
    const {
      product,
      showListPrice,
      showLabels,
      showInstallments,
      showBadge,
      hideBuyButton,
      showButtonOnHover,
    } = this.props

    return (
      <div className="tc pointer"
        onClick={event => this.redirect(event)}
        onMouseEnter={() => this.onMouseEnter()}
        onMouseLeave={() => this.onMouseLeave()}>
        {!product &&
          <div>Loading...</div>
        }
        {product && (<div>
          <div>
            {
              (showBadge) ? (
                <DiscountBadge
                  listPrice={product.listPrice}
                  sellingPrice={product.sellingPrice}>
                  <img src={product.imageUrl} />
                </DiscountBadge>
              ) : (
                <img src={product.imageUrl} />
              )
            }
          </div>
          <div className="pv2">
            <ProductName
              name={product.name}
              skuVariation={product.skuVariation}
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

          <div className="pv2">
            <div style={{ display: (!showButtonOnHover || (showButtonOnHover && this.state.isHovering)) ? 'block' : 'none' }}>
              {!hideBuyButton && <Button primary onClick={event => event.stopPropagation()}>BUY THIS AWESOME PRODUCT</Button>}
            </div>
          </div>
        </div>)}
      </div>
    )
  }
}

ProductSummary.propTypes = {
  product: PropTypes.shape({
    listPrice: PropTypes.number.isRequired,
    sellingPrice: PropTypes.number.isRequired,
    imageUrl: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }),
  showListPrice: PropTypes.bool,
  showLabels: PropTypes.bool,
  showInstallments: PropTypes.bool,
  showBadge: PropTypes.bool,
  hideBuyButton: PropTypes.bool,
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
    hideBuyButton: {
      type: 'boolean',
      title: 'Hides the buy button',
    },
    showButtonOnHover: {
      type: 'boolean',
      title: 'Show the buy button only on hover',
    },
  },
}

export default ProductSummary
