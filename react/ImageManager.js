import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Image from './Image'
import MagnifyingImage from './MagnifyingImage'
import ThumbnailList from './ThumbnailList'

const FIRST_ELEMENT = 0

class ImageManager extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedImage: this.props.images[FIRST_ELEMENT]
    }
  }

  handleThumbnailClick(image) {
    this.setState({
      selectedImage: image
    })
  }
  
  render() {
    const { images, zoom, thumbnail, thumbnailPosition } = this.props
    const { selectedImage } = this.state

    return (
      <div className="ma1 w-50 dt dt--fixed">
        { thumbnail ? <ThumbnailList position={thumbnailPosition} images={images} onThumbnailClick={this.handleThumbnailClick.bind(this)} /> : '' }
        { zoom ? <MagnifyingImage image={selectedImage} /> : <Image image={selectedImage} /> }
      </div>
    )
  }
}

ImageManager.propTypes = {
  /** The array of images to be used in ThumbnailList */
  images: PropTypes.array.isRequired,
  /** Boolean attribute that defines if the selected image will have zoom action on mouse hover or not*/
  zoom: PropTypes.bool,
  /** Boolean attribute that defines if the image component will have a thumbnails list or not */
  thumbnail: PropTypes.bool,
}

export default ImageManager