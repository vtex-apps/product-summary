import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Slider from 'react-slick'

import ThumbnailItem from './ThumbnailItem'

import { HORIZONTAL, VERTICAL } from './values/Orientations'

/** Thumbnail component.
 *  Display a slider with a list of thumbnail images */
class ThumbnailSlider extends Component {
  /** The function to retrieve properties to configure the slider */
  configureSliderSettings = () => {
    const {
      maxItems, orientation,
    } = this.props

    const sliderVertical = (orientation === VERTICAL)

    return {
      speed: 500,
      infinite: false,
      slidesToShow: maxItems || 4,
      vertical: sliderVertical,
      verticalSwiping: sliderVertical,
      responsive: [
        {
          breakpoint: 600,
          settings: {
            dots: true,
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
      </div>
    )
  }
}

ThumbnailSlider.defaultProps = {
  orientation: VERTICAL,
}

ThumbnailSlider.propTypes = {
  images: PropTypes.array.isRequired,
  onThumbnailClick: PropTypes.func.isRequired,
  orientation: PropTypes.oneOf([ VERTICAL, HORIZONTAL ]),
  maxItems: PropTypes.number,
}

export default ThumbnailSlider
