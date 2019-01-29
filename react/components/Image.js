import React from 'react'
import PropTypes from 'prop-types'

import productSummary from '../productSummary.css'

/** Image component with 1:1 aspect ratio */
export default function Image({ src, className, description }) {
  return (
    <div>
      <img className={className} src={src} alt={description} />
    </div>
  )
}

Image.propTypes = {
  /** Image url */
  src: PropTypes.string.isRequired,
  /** Custom classes */
  className: PropTypes.string,
  /** image alt description */
  description: PropTypes.string.isRequired,
}
