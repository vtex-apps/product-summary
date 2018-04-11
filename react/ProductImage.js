import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Thumbnail from './Thumbnail'
import Image from './Image'

import { HORIZONTAL, VERTICAL } from './values/Orientations'

const DEFAULT_IMAGE = 0

class ProductImage extends Component {
  constructor(props) {
    super(props)

    const { thumbnails } = this.props

    this.state = {
      selectedThumbnail: thumbnails[DEFAULT_IMAGE],
    }
  }

  handleThumbnailClick = (selectedThumbnail) => {
    this.setState({
      selectedThumbnail,
    })
  }

  getOrientationStyle = (orientation) => {
    let style
    if (orientation === HORIZONTAL) {
      style = 'flex w-50'
    } else if (orientation === VERTICAL) {
      style = 'flex flex-column-reverse w-50'
    }
    return style
  }

  render() {
    const { thumbnails, orientation } = this.props
    const { selectedThumbnail } = this.state

    return (
      <div className={this.getOrientationStyle(orientation)}>
        <Thumbnail thumbnails={thumbnails} onThumbnailClick={this.handleThumbnailClick} orientation={orientation} />
        <Image image={selectedThumbnail} />
      </div>
    )
  }
}

ProductImage.propTypes = {
  thumbnails: PropTypes.array.isRequired,
  orientation: PropTypes.oneOf([ HORIZONTAL, VERTICAL ]),
}

ProductImage.defaultProps = {
  orientation: HORIZONTAL,
}

ProductImage.schema = {
  title: 'ProductImage',
  description: 'A simple product image',
  type: 'object',
  properties: {
    orientation: {
      type: 'string',
      title: 'Orientation',
      enum: [ HORIZONTAL, VERTICAL ],
      default: HORIZONTAL,
    },
  },
}

export default ProductImage
