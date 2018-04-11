import React, { Component } from 'react'
import PropTypes from 'prop-types'

class ThumbnailItem extends Component {
  handleClick = (event) => {
    event.preventDefault()
    const { thumbnail, onClick } = this.props
    onClick(thumbnail)
  }

  render() {
    const { thumbnail } = this.props
    const { imageUrl, imageText } = thumbnail

    return (
      <a href="#" onClick={this.handleClick}>
        <img src={imageUrl} alt={imageText} />
      </a>
    )
  }
}

ThumbnailItem.propTypes = {}

export default ThumbnailItem