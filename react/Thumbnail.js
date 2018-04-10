import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Slider from 'react-slick'

import ThumbnailItem from './ThumbnailItem'

import { HORIZONTAL } from './values/Orientations'

class Thumbnail extends Component {

  render() {
    const { thumbnails, onThumbnailClick, orientation } = this.props

    const isHorizontal = orientation === HORIZONTAL

    const settings = {
      infinite: false,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
      vertical: isHorizontal,
      verticalSwiping: isHorizontal
    }

    return (
      // <div className={isHorizontal ? 'fl w-20' : ''}>
      <div>
        <Slider {...settings}>
          {
            thumbnails.map((thumbnail) => {
              return (
                <div key={thumbnail.imageUrl}>
                  <ThumbnailItem thumbnail={thumbnail} onClick={onThumbnailClick} />
                </div>
              ) 
            })
          }
        </Slider>
      </div>
    );
  }
}

Thumbnail.propTypes = {}

export default Thumbnail