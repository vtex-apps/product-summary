import React, { Component } from 'react'

import Image from './Image'
import Thumbnail from './Thumbnail'

export default class ProductImage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedImage: this.props.product.items.images[0]
    }
  }

  handleClick(image) {
    this.setState({
      selectedImage: image
    })
  }

  render() {
    return (
      <div className="fl w-30">
        <Thumbnail
          images={this.props.product.items.images}
          onClick={this.handleClick.bind(this)} />

        <Image 
          image={this.state.selectedImage} />
      </div>
    )
  }
}