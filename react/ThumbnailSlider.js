import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Slider from 'react-slick'

import Arrow from './Arrow'
import Dots from './Dots'

import ThumbnailItem from './ThumbnailItem'

import { HORIZONTAL, VERTICAL } from './values/Orientations'

/** Thumbnail component.
 *  Display a slider with a list of thumbnail images */
class ThumbnailSlider extends Component {
  /** The function that retrieve properties to configure the slider */
  configureSliderSettings = () => {
    const { maxVisibleItems, orientation } = this.props

    /** Boolean value to indicates if the orientation is vertical or not */
    const sliderVertical = (orientation === VERTICAL)

    /** The arrow style that should be rendered if the slider orientation is vertical */
    const verticalArrowStyle = {
      'position': 'relative',
      'margin': 'auto',
      'transform': 'rotate(90deg)',
      'left': '0px',
      'right': '0px',
      'z-index': '999',
    }

    return {
      dots: false,
      speed: 500,
      infinite: false,

      arrows: true,
      prevArrow: <Arrow customStyle={sliderVertical ? verticalArrowStyle : { 'left': '0px', 'z-index': '999' }} color="#000" />,
      nextArrow: <Arrow customStyle={sliderVertical ? verticalArrowStyle : { 'right': '0px', 'z-index': '999' }} color="#000" />,

      slidesToShow: maxVisibleItems || 4,

      vertical: sliderVertical,
      verticalSwiping: sliderVertical,

      /** The responsive slider behavior is defined here */
      responsive: [

        /** This should be rendered for all screens with width less than to 600px */
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
}

export default ThumbnailSlider
