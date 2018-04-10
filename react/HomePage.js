import React, { Component } from 'react'
import { ExtensionPoint } from 'render'

class HomePage extends Component {
  render() {
    return (
      <div className="w-100 h-100">
        <ExtensionPoint id="product-image" />
      </div>
    )
  }
}

export default HomePage