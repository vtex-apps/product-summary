import React, { Component } from 'react'
import PropTypes from 'prop-types'

/**
 * Name component. Show name and relevant SKU information of the Product Summary
 */
class ProductName extends Component {
  /**
   * @type {Object}
   * @property {string} name - The name of the product
   * @property {string} url - The url to the product main page
   * @property {string} skuVariation - The name of the selected SKU
   * @property {string} brandName - Name of the brand of the product
   */
  static propTypes = {
    name: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    skuVariation: PropTypes.string,
    brandName: PropTypes.string
  }

  render() {
    const { name, skuVariation, brandName, url } = this.props

    return (
      <a href={url} className="f5 gray db tc overflow-hidden no-underline">
        {name} {skuVariation} {brandName && `(${brandName})`}
      </a>
    )
  }
}

export default ProductName
