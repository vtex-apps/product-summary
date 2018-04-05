import React, { Component } from 'react'
import PropTypes from 'prop-types'

class MagnifyingImage extends Component {
  render() {
    const { imageUrl, imageText } = this.props.image
    
    return (
      <div className="dtc w-90">
        In development...
      </div>
    )
  }
}

MagnifyingImage.propTypes = {
  /** The image to be showed as a content*/
  image: PropTypes.shape({
    imageUrl: PropTypes.string.isRequired, 
    imageText: PropTypes.string.isRequired
  }).isRequired
}

export default MagnifyingImage