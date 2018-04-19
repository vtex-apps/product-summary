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

  /** Function that changes the selected image */
  handleThumbnailClick = (image) => {
    this.setState({
      selectedImage: image,
    })
  }

  /** Function that configures the component style */
  configureClassName = () => {
    const { thumbnailSliderOrientation } = this.props
    
    let style = 'vtex-product-image flex w-100 w-50-ns'
    
    if (thumbnailSliderOrientation === HORIZONTAL) {
      style += ' flex-column-reverse'
    }

    return style
  }

  /** Function that configures the properties of the Selected Image nested component */
  configureSelectedImage = () => {
    const { selectedImage } = this.state
    
    return {
      image: selectedImage,
    }
  }

  /** Function that configures the properties of the Thumbnail Slider nested component */
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
    const { images } = this.props

    const className = this.configureClassName()
    const selectedImage = this.configureSelectedImage()
    const thumbnailSlider = this.configureThumbnailSlider()

    return (
      <div className={className}>
        {
          images.length > 1 ? <ThumbnailSlider {...thumbnailSlider} /> : ''
        }
        <SelectedImage {...selectedImage} />
      </div>
    )
  }
}

ProductImage.propTypes = {
  /** Array of images to be passed for the Thumbnail Slider component */
  images: PropTypes.array.isRequired,
  /** Thumbnail Slider orientation */
  thumbnailSliderOrientation: PropTypes.oneOf([ VERTICAL, HORIZONTAL ]),
  /** Maximum number of visible items that should be displayed by the Thumbnail Slider at the same time */
  thumbnailMaxVisibleItems: PropTypes.number,
}

ProductImage.defaultProps = {
  thumbnailSliderOrientation: VERTICAL,
  images: [
    {
      imageUrl: "https://raw.githubusercontent.com/vtex-apps/product-summary/feature/product-image-tests/images/imagem-prod-summary.png",
      imageText: ""
    },
    {
      imageUrl: "https://raw.githubusercontent.com/vtex-apps/product-summary/feature/product-image-tests/images/imagem-prod-summary2.png",
      imageText: ""
    },
    {
      imageUrl: "https://raw.githubusercontent.com/vtex-apps/product-summary/feature/product-image-tests/images/imagem-prod-summary3.png",
      imageText: ""
    },
    {
      imageUrl: "https://raw.githubusercontent.com/vtex-apps/product-summary/feature/product-image-tests/images/imagem-prod-summary4.png",
      imageText: ""
    },
    {
      imageUrl: "https://raw.githubusercontent.com/vtex-apps/product-summary/feature/product-image-tests/images/imagem-prod-summary5.png",
      imageText: ""
    },
    {
      imageUrl: "https://raw.githubusercontent.com/vtex-apps/product-summary/feature/product-image-tests/images/imagem-prod-summary6.png",
      imageText: ""
    },
    {
      imageUrl: "https://raw.githubusercontent.com/vtex-apps/product-summary/feature/product-image-tests/images/imagem-prod-summary7.png",
      imageText: ""
    },
    {
      imageUrl: "https://raw.githubusercontent.com/vtex-apps/product-summary/feature/product-image-tests/images/imagem-prod-summary8.png",
      imageText: ""
    },
    {
      imageUrl: "https://raw.githubusercontent.com/vtex-apps/product-summary/feature/product-image-tests/images/imagem-prod-summary9.png",
      imageText: ""
    },
    {
      imageUrl: "https://raw.githubusercontent.com/vtex-apps/product-summary/feature/product-image-tests/images/imagem-prod-summary10.png",
      imageText: ""
    },
    {
      imageUrl: "https://raw.githubusercontent.com/vtex-apps/product-summary/feature/product-image-tests/images/imagem-prod-summary11.png",
      imageText: ""
    },
    {
      imageUrl: "https://raw.githubusercontent.com/vtex-apps/product-summary/feature/product-image-tests/images/imagem-prod-summary12.png",
      imageText: ""
    },
  ]
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
