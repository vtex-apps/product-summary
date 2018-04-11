import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Image extends Component {
  render() {
    const { image } = this.props
    const { imageUrl, imageText } = image

    return (
      <div className="w-80">
        <img src={imageUrl} alt={imageText} />
      </div>
    )
  }
}

Image.propTypes = {
  image: PropTypes.object.isRequired,
}

export default Image
