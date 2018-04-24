import React, { Component } from 'react'
import PropTypes from 'prop-types'

/**
 * Name component. Show name and relevant SKU information of the Product Summary
 */
class ProductName extends Component {
  render() {
    const { name, referenceCode, skuName, brandName } = this.props

    return (
      <div className="vtex-product-name overflow-hidden">
        <div className="f5">
          {referenceCode} {name}
        </div>
        <div className="f6">
          {skuName} {brandName && `(${brandName})`}
        </div>
      </div>
    )
  }
}

ProductName.propTypes = {
  /** Name of the product */
  name: PropTypes.string.isRequired,
  /** Selected SKU name */
  skuName: PropTypes.string,
  /** Brand name */
  brandName: PropTypes.string,
  /** Reference code of the product */
  referenceCode: PropTypes.string,
}

export default ProductName
