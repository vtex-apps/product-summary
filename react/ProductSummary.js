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

  redirect() {
    window.location.assign(this.props.product.url)
  }

  render() {
    const {
      product,
      showListPrice,
      showLabels,
      showInstallments,
      showBadge,
      disable,
      showOnHover,
    } = this.props

    return (
      <div className="tc pointer"
        onClick={() => this.redirect()}
        onMouseEnter={() => this.onMouseEnter()}
        onMouseLeave={() => this.onMouseLeave()}>
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
              url={product.url} />
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
            <div style={{ display: (!showOnHover || (showOnHover && this.state.isHovering)) ? 'block' : 'none' }}>
              <Button primary
                disabled={disable}>BUY THIS AWESOME PRODUCT</Button>
            </div>
          </div>
        </div>)}
        {!product &&
          <div>No product to be shown...</div>
        }
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
  disable: PropTypes.bool,
  showOnHover: PropTypes.bool,
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
    disable: {
      type: 'boolean',
      title: 'Disable the buy button',
    },
    showOnHover: {
      type: 'boolean',
      title: 'Show the buy button only on hover',
    },
  },
}

export default ProductSummary
