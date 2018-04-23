import React, { Component } from 'react'
import PropTypes from 'prop-types'

import ThumbnailSlider from './ThumbnailSlider'
import SelectedImage from './SelectedImage'
import { VERTICAL, HORIZONTAL } from './values/Orientations'

const DEFAULT_SELECTED_IMAGE = 0

/**
 *  Product Image component.
 *  Display a list of thumbnail images in a slider and a main image of a product.
 */
class ProductImage extends Component {
  constructor(props) {
    super(props)
    const images = this.props.images
    this.state = {
      selectedImage: images[DEFAULT_SELECTED_IMAGE],
    }
  }

  /**
   * Function that changes the selected image
   */
  handleThumbnailClick = image => {
    this.setState({
      selectedImage: image,
    })
  }

  render() {
    const { images, thumbnailSliderOrientation, thumbnailMaxVisibleItems } = this.props

    const thubmnailStyleStyle = {
      images: images,
      onThumbnailClick: this.handleThumbnailClick,
      orientation: thumbnailSliderOrientation,
      maxVisibleItems: thumbnailMaxVisibleItems,
    }

    let className = 'vtex-product-image flex w-100 w-50-ns'
    if (thumbnailSliderOrientation === HORIZONTAL) {
      className += ' flex-column-reverse'
    }

    return (
      <div className={className}>
        { images.length > 1 && <ThumbnailSlider {...thubmnailStyleStyle} /> }
        <SelectedImage image={this.state.selectedImage} />
      </div>
    )
  }
}

ProductImage.propTypes = {
  /** Array of images to be passed for the Thumbnail Slider component as a props */
  images: PropTypes.arrayOf(PropTypes.shape({
    /** URL of the image */
    imageUrl: PropTypes.string.isRequired,
    /** Text that describes the image */
    imageText: PropTypes.string.isRequired,
  })).isRequired,
  /** Thumbnail Slider orientation */
  thumbnailSliderOrientation: PropTypes.oneOf([ VERTICAL, HORIZONTAL ]),
  /** Maximum number of visible items that should be displayed by the Thumbnail Slider at the same time */
  thumbnailMaxVisibleItems: PropTypes.number,
}

ProductImage.defaultProps = {
  images: [
    { imageUrl: 'https://raw.githubusercontent.com/vtex-apps/product-summary/master/images/500x500-img-pro1.png', imageText: '' },
    { imageUrl: 'https://raw.githubusercontent.com/vtex-apps/product-summary/master/images/500x500-img-pro2.png', imageText: '' },
    { imageUrl: 'https://raw.githubusercontent.com/vtex-apps/product-summary/master/images/500x500-img-pro3.png', imageText: '' },
    { imageUrl: 'https://raw.githubusercontent.com/vtex-apps/product-summary/master/images/500x500-img-pro4.png', imageText: '' },
    { imageUrl: 'https://raw.githubusercontent.com/vtex-apps/product-summary/master/images/500x500-img-pro5.png', imageText: '' },
    { imageUrl: 'https://raw.githubusercontent.com/vtex-apps/product-summary/master/images/500x500-img-pro6.png', imageText: '' },
    { imageUrl: 'https://raw.githubusercontent.com/vtex-apps/product-summary/master/images/500x500-img-pro7.png', imageText: '' },
    { imageUrl: 'https://raw.githubusercontent.com/vtex-apps/product-summary/master/images/500x500-img-pro8.png', imageText: '' },
    { imageUrl: 'https://raw.githubusercontent.com/vtex-apps/product-summary/master/images/500x500-img-pro9.png', imageText: '' },
    { imageUrl: 'https://raw.githubusercontent.com/vtex-apps/product-summary/master/images/500x500-img-pro10.png', imageText: '' },
    { imageUrl: 'https://raw.githubusercontent.com/vtex-apps/product-summary/master/images/500x500-img-pro11.png', imageText: '' },
    { imageUrl: 'https://raw.githubusercontent.com/vtex-apps/product-summary/master/images/500x500-img-pro12.png', imageText: '' },
    { imageUrl: 'https://raw.githubusercontent.com/vtex-apps/product-summary/master/images/500x500-img-pro13.png', imageText: '' },
    { imageUrl: 'https://raw.githubusercontent.com/vtex-apps/product-summary/master/images/500x500-img-pro14.png', imageText: '' },
    { imageUrl: 'https://raw.githubusercontent.com/vtex-apps/product-summary/master/images/500x500-img-pro15.png', imageText: '' },
    { imageUrl: 'https://raw.githubusercontent.com/vtex-apps/product-summary/master/images/500x500-img-pro16.png', imageText: '' },
    { imageUrl: 'https://raw.githubusercontent.com/vtex-apps/product-summary/master/images/500x500-img-pro17.png', imageText: '' },
    { imageUrl: 'https://raw.githubusercontent.com/vtex-apps/product-summary/master/images/500x500-img-pro18.png', imageText: '' },
    { imageUrl: 'https://raw.githubusercontent.com/vtex-apps/product-summary/master/images/500x500-img-pro19.png', imageText: '' },
    { imageUrl: 'https://raw.githubusercontent.com/vtex-apps/product-summary/master/images/500x500-img-pro20.png', imageText: '' },
    { imageUrl: 'https://raw.githubusercontent.com/vtex-apps/product-summary/master/images/500x500-img-pro21.png', imageText: '' },
    { imageUrl: 'https://raw.githubusercontent.com/vtex-apps/product-summary/master/images/500x500-img-pro22.png', imageText: '' },
    { imageUrl: 'https://raw.githubusercontent.com/vtex-apps/product-summary/master/images/500x500-img-pro23.png', imageText: '' },
    { imageUrl: 'https://raw.githubusercontent.com/vtex-apps/product-summary/master/images/500x500-img-pro24.png', imageText: '' },
  ],
  thumbnailSliderOrientation: VERTICAL,
}

export default ProductImage
