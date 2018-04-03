import React, { Component } from 'react'
import PropTypes from 'prop-types'

class ProductName extends Component {
  render() {
    const { name, skuVariation, brandName, url } = this.props

    return (
      <a href={url} className="f5 gray db tc overflow-hidden no-underline">
        {name} {skuVariation} {brandName && `(${brandName})`}
      </a>
    )
  }
}

ProductName.propTypes = {
  name: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  skuVariation: PropTypes.string,
  brandName: PropTypes.string
}

export default ProductName
