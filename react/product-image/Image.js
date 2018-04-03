import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Image extends Component {
  static propTypes = {
    image: PropTypes.object
  }

  render() {
    const { image } = this.props
    return (
      <div className="fl w-two-thirds">
        <img className="w5" src={image.imageUrl} alt={image.imageText} />
      </div>
    )
  }
}

export default Image;