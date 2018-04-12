import React, { Component } from 'react'
import PropTypes from 'prop-types'

/** Thumbnail Item Component.
 * Display a thumbnail image with an on click event well defined. */

class ThumbnailItem extends Component {
  /** The function that is called when the thumbnail image is clicked */
  handleClick = (event) => {
    event.preventDefault()
    const { image, onClick } = this.props
    onClick(image)
  }

  render() {
    const { imageUrl, imageText } = this.props.image

    return (
      <a href="#" onClick={this.handleClick}>
        <img src={imageUrl} alt={imageText} />
      </a>
    )
  }
}

ThumbnailItem.propTypes = {
  /** The image to be displayed */
  image: PropTypes.shape({
    /** The URL of the image */
    imageUrl: PropTypes.string.isRequired,
    /** The text that describes the image */
    imageText: PropTypes.string.isRequired,
  }).isRequired,

  /** The function that is called when the thumbnail image is clicked */
  onClick: PropTypes.func.isRequired,
}

export default ThumbnailItem
