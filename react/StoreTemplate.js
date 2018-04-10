import React, { Component } from 'react'
import PropTypes from 'prop-types'

class StoreTemplate extends Component {

  render() {
    return (
      <div>
        <div>{this.props.children}</div>
      </div>
    )
  }
}

StoreTemplate.propTypes = {
  children: PropTypes.element
}

export default StoreTemplate