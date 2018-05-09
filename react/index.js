import React, { Component } from 'react'
import { ExtensionPoint } from 'render'

export default class GettingStartedIndex extends Component {
  render() {
    return (
      <div className="pv5 flex justify-center">
        <div className="ph4">
          <ExtensionPoint id="product-summary" />
        </div>
        <div className="ph4">
          <ExtensionPoint id="product-summary" />
        </div>
        <div className="ph4">
          <ExtensionPoint id="product-summary" />
        </div>
      </div>
    )
  }
}
