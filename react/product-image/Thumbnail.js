import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ThumbnailItem from './ThumbnailItem';

export default class Thumbnail extends Component {  
  static propTypes = {
    images: PropTypes.object,
    onClick: PropTypes.func
  }
  
  render() {
    const { images, onClick } = this.props
    return (
      <div className="fl w-third">
        {
          images.map((image, index) => (
            <ThumbnailItem
              key={index}
              image={image}
              onClick={onClick}
            />
          ))
        }
      </div>
    )
  }
}