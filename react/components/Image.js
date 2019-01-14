import React from 'react'
import PropTypes from 'prop-types'

import productSummary from '../productSummary.css'

/** Image component with 1:1 aspect ratio */
export default function Image({ src, className, width, height }) {
  const resizeSrc = src => {
    //Check of src is already in a size defined by the client
    const isWithMeasures = new RegExp(/[1-9]+-(:?([1-9]+)|(auto))/);
    if (isWithMeasures.exec(src)) {
      return src
    }

    const imageId = src.slice(src.indexOf("/ids/")).split("/")[2]
    const withSuffix = `${imageId}-${width}-${height}`

    return src.replace(imageId, withSuffix)
  }

  return (
    <div
      className={`${className} ${productSummary.aspectRatio} w-100`}
      style={{ backgroundImage: `url(${resizeSrc(src)})` }}
    />
  )
}

Image.defaultProps = {
  width: 'auto',
  height: 'auto',
}

Image.propTypes = {
  /** Image url */
  src: PropTypes.string.isRequired,
  /** Custom classes */
  className: PropTypes.string,
  /** Image width */
  width: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.oneOf(['auto'])
  ]),
  /** Image height */
  height: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.oneOf(['auto'])
  ]),
}
