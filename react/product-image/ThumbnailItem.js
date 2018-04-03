import React, { Component } from 'react';

export default class ThumbnailItem extends Component {
  handleClick() {
    this.props.onClick(this.props.image)
  }

  render() {
    const { image } = this.props
    return (
      <div>
        <img className="w3"
          src={image.imageUrl} 
          alt={image.imageText} 
          onClick={this.handleClick.bind(this)} />
      </div>
    )
  }
}

export default ThumbnailItem;