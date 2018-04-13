import React, { Component } from 'react'
import PropTypes from 'prop-types'

/**
 * Dots container. Shows the nav dots of the carousel component;
 */
class Dots extends Component {
  render() {
    const { className, style, dots, color } = this.props

    return (
      <div className={className} >
        <ul className="ma0 pa0" style={{ ...style, color: color || '#000' }}>
          {dots}
        </ul>
      </div>
    )
  }
}

Dots.propTypes = {
  /** The css class of the element. */
  className: PropTypes.string,
  /** The custom style of the element. */
  style: PropTypes.object,
  /** Dots that will be displayed */
  dots: PropTypes.node.isRequired,
  /** Dots color */
  color: PropTypes.string.isRequired,
}

export default Dots
