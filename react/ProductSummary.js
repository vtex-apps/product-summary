import React, { Component } from 'react'
import PropTypes from 'prop-types'

import ProductName from './ProductName'
import Price from './Price'
import DiscountBadge from './DiscountBadge'

class ProductSummary extends Component {
  render() {
    const imageUrl = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSd0cHfPOO0tneOT0AH3UDs7BumkdOVHZtv4DL55dFtInS2q8mi'
    return (
      <div>
        <DiscountBadge listPrice={200} sellingPrice={20}>
          <img src={imageUrl} />
        </DiscountBadge>
        <ProductName name="google" url="google.com" />
        <Price listPrice={100} sellingPrice={80} />
      </div>
    )
  }
}

ProductSummary.propTypes = {
  product: PropTypes.shape({
    listPrice: PropTypes.number.isRequired,
    sellingPrice: PropTypes.number.isRequired,
    imageUrl: PropTypes.string.isRequired,
  }).isRequired,
}

export default ProductSummary
