import React, { Component } from 'react'
import PropTypes from 'prop-types'

/**
 * Name component. Show name and relevant SKU information of the Product Summary
 */
class ProductName extends Component {
  render() {
    const { name, skuVariation, brandName, url, referenceCode } = this.props

    return (
      <a href={url} className="f5 gray db tc overflow-hidden no-underline">
        {referenceCode} {name} {skuVariation} {brandName && `(${brandName})`}
      </a>
    )
  }
}

ProductName.propTypes = {
  /** Name of the product */
  name: PropTypes.string.isRequired,
  /** Url to product main page */
  url: PropTypes.string.isRequired,
  /** Selected SKU name */
  skuVariation: PropTypes.string,
  /** Brand name */
  brandName: PropTypes.string,
  /** Reference code of the product */
  referenceCode: PropTypes.string,
}

export default ProductName
