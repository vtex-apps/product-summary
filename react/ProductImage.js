import React, { Component } from 'react'
import PropTypes from 'prop-types'

import ThumbnailSlider from './ThumbnailSlider'
import SelectedImage from './SelectedImage'

import { VERTICAL, HORIZONTAL } from './values/Orientations'

const DEFAULT_SELECTED_IMAGE = 0

/** Product Image component.
 *  Display a list of thumbnail images in a slider and a main image of a product */
class ProductImage extends Component {
  constructor(props) {
    super(props)
    const images = this.props.images
    this.state = {
      selectedImage: images[DEFAULT_SELECTED_IMAGE],
    }
  }

  /** The action that changes the selected image */
  handleThumbnailClick = (image) => {
    this.setState({
      selectedImage: image,
    })
  }

  /** The function that configures the component style */
  configureStyle = () => {
    const { thumbnailSliderOrientation } = this.props
    let style
    switch (thumbnailSliderOrientation) {
      case HORIZONTAL:
        style = 'flex w-100 w-50-ns flex-column-reverse vtex-product-image'
        break
      case VERTICAL:
        style = 'flex w-100 w-50-ns vtex-product-image'
        break
    }
    return style
  }

  /** The function that configures the properties of the Selected Image nested component */
  configureSelectedImage = () => {
    const { selectedImage } = this.state
    return {
      image: selectedImage,
    }
  }

  /** The function that configures the properties of the Thumbnail Slider nested component */
  configureThumbnailSlider = () => {
    const { images, thumbnailSliderOrientation, thumbnailMaxVisibleItems } = this.props
    return {
      images: images,
      onThumbnailClick: this.handleThumbnailClick,
      orientation: thumbnailSliderOrientation,
      maxVisibleItems: thumbnailMaxVisibleItems,
    }
  }

  render() {
    const style = this.configureStyle()
    const selectedImage = this.configureSelectedImage()
    const thumbnailSlider = this.configureThumbnailSlider()

    return (
      <div className={style}>
        <ThumbnailSlider {...thumbnailSlider} />
        <SelectedImage {...selectedImage} />
      </div>
    )
  }
}

ProductImage.propTypes = {
  /** The array of images to be passed for the Thumbnail Slider component */
  images: PropTypes.array.isRequired,

  /** The Thumbnail Slider orientation */
  thumbnailSliderOrientation: PropTypes.oneOf([ VERTICAL, HORIZONTAL ]),

  /** The maximum number of visible items that should be displayed by the Thumbnail Slider at the same time */
  thumbnailMaxVisibleItems: PropTypes.number,
}

ProductImage.defaultProps = {
  /** In the case that the Thumbnail Slider orientation is not defined then vertical orientation will be used as default */
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
