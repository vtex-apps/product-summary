import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Slider from 'react-slick'

import Arrow from './Arrow'
import Dots from './Dots'
import ThumbnailItem from './ThumbnailItem'

import { HORIZONTAL, VERTICAL } from './values/Orientations'

const MAX_VISIBLE_ITEMS = 4

/** Thumbnail component.
 *  Display a slider with a list of thumbnail images */
class ThumbnailSlider extends Component {
  /** The function that retrieve properties to configure the slider */
  configureSliderSettings = () => {
    const { images, maxVisibleItems, orientation} = this.props
  
    const sliderVertical = (orientation === VERTICAL)

    /** The number of visible slider items should not exceed the number of images, in the case that that condition is not satisfied, 
     * then it must not exceed the maxVisibleItems property. Finnaly, the number of visible slider items should not be greater 
     * than the maximum allowed value that is defined by MAX_VISIBLE_ITEMS */
    const numOfVisivleItems = Math.min(maxVisibleItems, images.length, MAX_VISIBLE_ITEMS)

    return {
      dots: false,
      speed: 500,
      infinite: false,
      arrows: true,
      prevArrow: <Arrow customClassName={sliderVertical ? "vtex-product-image__vertical-arrow-prev" : "vtex-product-image__horizontal-arrow-prev"} color="#000"/>,
      nextArrow: <Arrow customClassName={sliderVertical ? "vtex-product-image__vertical-arrow-next" : "vtex-product-image__horizontal-arrow-next"} color="#000"/>,
      slidesToShow: numOfVisivleItems,
      vertical: sliderVertical,
      verticalSwiping: sliderVertical,
      /** The responsive slider behavior is defined here */
      responsive: [
        /** This should be rendered for all screens with width less than 600px */
        {
          breakpoint: 600,
          settings: {
            arrows: false,
            dots: true,
            appendDots: dots => <Dots color="#000" dots={dots} />,
            slidesToShow: 1,
            vertical: false,
            verticalSwiping: false,
          },
        },
      ],
    }
  }

  render() {
    const { images, onThumbnailClick, orientation } = this.props

    const sliderVertical = (orientation === VERTICAL)
    const sliderSettings = this.configureSliderSettings()

    return (
      <div className={sliderVertical ? 'w-100 w-20-ns' : ''}>
        {
          <Slider {...sliderSettings}>
            {
              images.map((image) => {
                return (
                  <div key={image.imageUrl}>
                    <ThumbnailItem image={image} onClick={onThumbnailClick} />
                  </div>
                )
              })
            }
          </Slider>
        }
      </div>
    )
  }
}

ThumbnailSlider.propTypes = {
  /** The array of images to be rendered as a list of thumbnails */
  images: PropTypes.array.isRequired,
  /** The action that is called when a thumbnail is clicked */
  onThumbnailClick: PropTypes.func.isRequired,
  /** The slider orientation that could be vertical or horizontal */
  orientation: PropTypes.oneOf([ VERTICAL, HORIZONTAL ]),
  /** The maximum number of items that could be displayed by the slider at the same time */
  maxVisibleItems: PropTypes.number,
}

ThumbnailSlider.defaultProps = {
  /** In the case that the orientation is not defined then vertical orientation will be used as default */
  orientation: VERTICAL,
  /** In the case that the max visible items property is not defined than it will assume the value of MAX_VISIBLE_ITEMS */
  maxVisibleItems: MAX_VISIBLE_ITEMS,
}

export default ThumbnailSlider
