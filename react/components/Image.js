import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

/** Image component with 1:1 aspect ratio */
export default function Image({ src, className }) {
  return (
    <div
      className={classNames(className, 'vtex-aspect-ratio w-100')}
      style={{ backgroundImage: `url(${src})` }}
    />
  )
}

Image.propTypes = {
  /** Image url */
  src: PropTypes.string.isRequired,
  /** Custom classes */
  className: PropTypes.string,
}
