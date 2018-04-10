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
      selectedThumbnail: thumbnails[DEFAULT_IMAGE]
    }
  }

  handleThumbnailClick = (selectedThumbnail) => {
    this.setState({
      selectedThumbnail
    })
  }

  render() {
    const { thumbnails, orientation } = this.props
    const { selectedThumbnail } = this.state
    const isHorizontal = orientation === HORIZONTAL

    return (
      // <div className="fl w-50">
      <div>
        {
          isHorizontal ? 
            <div>
              <Thumbnail thumbnails={thumbnails} onThumbnailClick={this.handleThumbnailClick} orientation={orientation} />    
              <Image image={selectedThumbnail} orientation={orientation} />
            </div>
          : 
            <div>
              <Image image={selectedThumbnail} orientation={orientation} />
              <Thumbnail thumbnails={thumbnails} onThumbnailClick={this.handleThumbnailClick} orientation={orientation} />    
            </div>
        }
      </div>
    )  
  }
}

ProductImage.propTypes = {
  orientation: PropTypes.oneOf([ HORIZONTAL, VERTICAL ])
}

ProductImage.defaultProps = {
  orientation: HORIZONTAL
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
      default: HORIZONTAL
    }
  }
}

export default ProductImage