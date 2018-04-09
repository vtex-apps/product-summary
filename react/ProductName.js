import React, { Component } from 'react'
import PropTypes from 'prop-types'

/**
 * Name component. Show name and relevant SKU information of the Product Summary
 */
class ProductName extends Component {
  render() {
    const { name, skuVariation, brandName } = this.props

    return (
      <div className="f5 gray db tc overflow-hidden no-underline">
        {name} {skuVariation} {brandName && `(${brandName})`}
      </div>
    )
  }
}

/**
 * @type {Object}
 * @property {string} name - The name of the product
 * @property {string} skuVariation - The name of the selected SKU
 * @property {string} brandName - Name of the brand of the product
 */
ProductName.propTypes = {
  name: PropTypes.string.isRequired,
  skuVariation: PropTypes.string,
  brandName: PropTypes.string,
}

export default ProductName
