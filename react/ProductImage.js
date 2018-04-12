import React, { Component } from 'react'
import PropTypes from 'prop-types'

import ThumbnailSlider from './ThumbnailSlider'
import SelectedImage from './SelectedImage'

import { VERTICAL, HORIZONTAL } from './values/Orientations'

const DEFAULT_SELECTED_IMAGE = 0

class ProductImage extends Component {
  constructor(props) {
    super(props)

    const { images } = this.props

    this.state = {
      selectedImage: images[DEFAULT_SELECTED_IMAGE],
    }
  }

  handleThumbnailClick = (image) => {
    this.setState({
      selectedImage: image,
    })
  }

  configureStyle = () => {
    const { thumbnailSliderOrientation } = this.props
    let style
    switch (thumbnailSliderOrientation) {
      case HORIZONTAL:
        style = 'flex flex-column-reverse w-100 w-50-ns'
        break
      case VERTICAL:
        style = 'flex w-100 w-50-ns'
        break
    }
    return style
  }

  configureThumbnailSlider = () => {
    const { images, thumbnailSliderOrientation } = this.props
    return {
      images: images,
      onThumbnailClick: this.handleThumbnailClick,
      orientation: thumbnailSliderOrientation,
    }
  }

  configureSelectedImage = () => {
    const { selectedImage } = this.state
    return {
      image: selectedImage,
    }
  }

  render() {
    const style = this.configureStyle()
    const thumbnailSlider = this.configureThumbnailSlider()
    const selectedImage = this.configureSelectedImage()

    return (
      <div className={style}>
        <ThumbnailSlider {...thumbnailSlider} />
        <SelectedImage {...selectedImage} />
      </div>
    )
  }
}

ProductImage.propTypes = {
  images: PropTypes.array.isRequired,
  onThumbnailClick: PropTypes.func.isRequired,
  thumbnailSliderOrientation: PropTypes.oneOf([ VERTICAL, HORIZONTAL ]),
}

ProductImage.defaultProps = {
  thumbnailSliderOrientation: VERTICAL,
}

ProductImage.schema = {
  title: 'ProductImage',
  description: 'A simple product image',
  type: 'object',
  properties: {
    thumbnailSliderOrientation: {
      type: 'string',
      title: 'Thumbnail Slider Orientation',
      enum: [ VERTICAL, HORIZONTAL ],
      default: VERTICAL,
    },
  },
}

export default ProductImage
