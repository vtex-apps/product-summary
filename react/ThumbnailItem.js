import React, { Component } from 'react'
import PropTypes from 'prop-types'

class ThumbnailItem extends Component {
  handleClick(event) {
    event.preventDefault()

    const { image, onThumbnailClick } = this.props

    if (onThumbnailClick) {
      onThumbnailClick(image)
    }
  }

  render() {
    const { image, onThumbnailClick } = this.props
    const { imageUrl, imageText } = image
    
    return (
      <div className="dtr w3">
        <a href="#" className="dim">
          <img src={imageUrl} alt={imageText} onClick={this.handleClick.bind(this)} />
        </a>
      </div>
    )
  }
}

ThumbnailItem.propTypes = {
  /** The image to be showed as a thumbnail */
  image: PropTypes.shape({
    imageUrl: PropTypes.string.isRequired, 
    imageText: PropTypes.string.isRequired
  }).isRequired,
  /** The function that implements the action click of the thumbnail */
  onThumbnailClick: PropTypes.func,
}

export default ThumbnailItem