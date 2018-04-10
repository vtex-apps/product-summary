import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { HORIZONTAL } from './values/Orientations'

class Image extends Component {
  render() {
    const { image, orientation } = this.props
    const { imageUrl, imageText } = image
    
    const isHorizontal = orientation === HORIZONTAL

    return (
      // <div className={isHorizontal ? 'fl w-80' : 'w-80'}>
      <div>
        <img src={imageUrl} alt={imageText} />
      </div>
    )
  }
}

Image.propTypes = {}

export default Image