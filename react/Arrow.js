import React, { Component } from 'react'
import PropTypes from 'prop-types'

/**
 * Arrow component. 
 * It's an overrided component of react-slick that controls the slide transition.
 */
class Arrow extends Component {
  render() {
    const { className, customClassName, style, onClick, color } = this.props
    return (
      <div
        className={`${className} ${customClassName}`}
        style={{ ...style }}
        onClick={onClick}
      />
    )
  }
}

Arrow.propTypes = {
  /** Css class of the element that is passed by the react-slick parent component. */
  className: PropTypes.string,
  /** Custom css class of the element. */
  customClassName: PropTypes.string,
  /** Custom style of the element. */
  style: PropTypes.object,
  /** Maximum number of items in the shelf. */
  onClick: PropTypes.func,
}

export default Arrow
