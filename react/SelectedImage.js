import React, { Component } from 'react'
import PropTypes from 'prop-types'

/** 
 * Selected Image component.
 * Display an image.
 */
class SelectedImage extends Component {
  render() {
    const { imageUrl, imageText } = this.props.image
    const className = "dn di-ns w-80-ns"

    return (
      <div className={className}>
        <img className={className} src={imageUrl} alt={imageText} />
      </div>
    )
  }
}

SelectedImage.propTypes = {
  /** Image to be displayed */
  image: PropTypes.shape({
    /** URL of the image */
    imageUrl: PropTypes.string.isRequired,
    /** Text that describes the image */
    imageText: PropTypes.string.isRequired,
  }).isRequired,
}

export default SelectedImage
