import React, { Component } from 'react'
import PropTypes from 'prop-types'

/** Thumbnail Item Component.
 * Display a thumbnail image with an on click event well defined. */
class ThumbnailItem extends Component {
  /** Function that is called when the thumbnail image is clicked */
  handleClick = (event) => {
    event.preventDefault()
    const { image, onClick } = this.props
    onClick(image)
  }

  render() {
    const { imageUrl, imageText } = this.props.image

    return (
      <a href="#" onClick={this.handleClick}>
        <img className="center" src={imageUrl} alt={imageText} />
      </a>
    )
  }
}

ThumbnailItem.propTypes = {
  /** Image to be displayed */
  image: PropTypes.shape({
    /** URL of the image */
    imageUrl: PropTypes.string.isRequired,
    /** Text that describes the image */
    imageText: PropTypes.string.isRequired,
  }).isRequired,
  /** Function that is called when the thumbnail image is clicked */
  onClick: PropTypes.func.isRequired,
}

export default ThumbnailItem
