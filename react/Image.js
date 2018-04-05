import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Image extends Component {
  render() {
    const { imageUrl, imageText } = this.props.image
    
    return (
      <div className="dtc w-90">
        <img src={imageUrl} alt={imageText} />
      </div>
    )
  }
}

Image.propTypes = {
  /** The image to be showed as a content*/
  image: PropTypes.shape({
    imageUrl: PropTypes.string.isRequired, 
    imageText: PropTypes.string.isRequired
  }).isRequired
}

export default Image