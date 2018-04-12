import React, { Component } from 'react'
import PropTypes from 'prop-types'

class SelectedImage extends Component {
  render() {
    const { image } = this.props
    const { imageUrl, imageText } = image

    return (
      <div className="dn di-ns w-80-ns">
        <img src={imageUrl} alt={imageText} />
      </div>
    )
  }
}

SelectedImage.propTypes = {
  image: PropTypes.object.isRequired,
}

export default SelectedImage
