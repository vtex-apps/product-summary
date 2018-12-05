import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { withRuntimeContext } from 'render'

const MOBILE_SIZE = 200
const DESKTOP_SIZE = 500

import withDimensions from './withDimensions'
/** Image component with 1:1 aspect ratio */
/** TODO use a generic approach to resize images in Dreamstore */
class Image extends Component {

  resizeUrl = src => {
    //Check of src is already in a size defined by the client
    const isWithMeasures = new RegExp(/[1-9]+-(:?([1-9]+)|(auto))/)
    if (isWithMeasures.exec(src)) {
      return src
    }

    const { width: deviceWidth } = this.props

    const imageId = src.slice(src.indexOf('/ids/')).split('/')[2]
    const idSuffix = `${imageId}-${deviceWidth}-auto`

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

export default withDimensions(Image)
