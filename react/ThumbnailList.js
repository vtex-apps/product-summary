import React, { Component } from 'react'
import PropTypes from 'prop-types'

import ThumbnailItem from './ThumbnailItem'

class ThumbnailList extends Component {
  render() {
    const { images, onThumbnailClick } = this.props

    return (
      <div className="absolute dtc dt w-10">
        {
          images.map((image, index) => (
            <ThumbnailItem key={index} image={image} onThumbnailClick={onThumbnailClick} />
          ))
        }
      </div>
    )
  }
}

ThumbnailList.propTypes = {
  /** The array of images to be showed as a list thumbnails */
  images: PropTypes.array.isRequired,
  /** The function that implements the action click of an item of the thumbnails list */
  onThumbnailClick: PropTypes.func,
}

export default ThumbnailList