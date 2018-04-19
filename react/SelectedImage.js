import React, { Component } from 'react'
import PropTypes from 'prop-types'

/** Selected Image component.
 *  Display an image */
class SelectedImage extends Component {
  render() {
    const { imageUrl, imageText } = this.props.image

    return (
      <div className="dn di-ns w-80-ns">
        <img src={imageUrl} alt={imageText} />
      </div>
    )
  }
}

SelectedImage.propTypes = {
  /** The image to be displayed */
  image: PropTypes.shape({
    /** The URL of the image */
    imageUrl: PropTypes.string.isRequired,
    /** The text that describes the image */
    imageText: PropTypes.string.isRequired,
  }).isRequired,
}

export default SelectedImage
