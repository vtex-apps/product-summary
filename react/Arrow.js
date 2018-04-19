import React, { Component } from 'react'
import PropTypes from 'prop-types'

/**
 * Arrow component. It's an overrided component of react-slick that controls
 * the slide transition.
 */
class Arrow extends Component {
  render() {
    const { className, customClassName, style, onClick, color } = this.props
    return (
      <div
        className={`${className} ${customClassName}`}
        style={{ ...style, color: color }}
        onClick={onClick}
      />
    )
  }
}

Arrow.propTypes = {
  /** The css class of the element that is passed by the react-slick parent component. */
  className: PropTypes.string,
  /** The custom css class of the element. */
  customClassName: PropTypes.string,
  /** The custom style of the element. */
  style: PropTypes.object,
  /** Maximum number of items in the shelf. */
  onClick: PropTypes.func,
  /** The color of the arrow icon. Ex: '#F00', 'rgb(255, 0, 0)'. */
  color: PropTypes.string.isRequired,
}

export default Arrow
