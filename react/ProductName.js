import React, { Component } from 'react'
import PropTypes from 'prop-types'

class ProductName extends Component {
  render() {
    const { name, skuVariation, brandName } = this.props

    return (
      <h2 className="f3 ttu">
        {name} {skuVariation} {brandName && `(${brandName})`}
      </h2>
    )
  }
}

ProductName.propTypes = {
  name: PropTypes.string.isRequired,
  skuVariation: PropTypes.string,
  brandName: PropTypes.string
}

export default ProductName
