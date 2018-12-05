import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { withRuntimeContext } from 'render'

const MOBILE_SIZE = 200
const DESKTOP_SIZE = 500

/** Image component with 1:1 aspect ratio */
class Image extends Component {

  resizeUrl = src => {
    //Check of src is already in a size defined by the client
    const resized = /[1-9]+-(:?([1-9]+)|(auto))/
    if (resized.exec(src)) {
      return src
    }

    const { runtime: { hints: { mobile } } } = this.props

    const imageId = src.slice(src.indexOf('/ids/')).split('/')[2]
    const idSuffix = imageId + (mobile ? `-${MOBILE_SIZE}-auto` : `-${DESKTOP_SIZE}-auto`)

    return src.replace(imageId, idSuffix)
  }

  render() {
    const { src, className } = this.props

    return (
      <div
        className={classNames(className, 'vtex-aspect-ratio w-100')}
        style={{ backgroundImage: `url(${this.resizeUrl(src)})` }}
      />
    )
  }
}

Image.propTypes = {
  /** Image url */
  src: PropTypes.string.isRequired,
  /** Custom classes */
  className: PropTypes.string,
}

export default withRuntimeContext(Image)
