import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'

class ProductName extends Component {
  render() {
    const { name, skuVariation, brandName } = this.props

    return (
      <h2 className="f3 ttu-s">
        {name} {skuVariation} {brandName && <Fragment>({brandName})</Fragment>}
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
