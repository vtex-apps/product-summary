import React, { Component } from 'react'
import { ExtensionPoint } from 'render'

// FIXME: Delete when we can use true data.
const props = {
  orderForm: {
    orderFormId: '3e33beb9928540099018085fafb87b6b',
    salesChannel: '1',
    seller: '1',
  },
  showListPrice: true,
  showInstallments: true,
  showLabels: true,
  showBadge: true,
  hideBuyButton: false,
  showOnHover: false,
}

export default class GettingStartedIndex extends Component {
  render() {
    return (
      <div className="pv5 flex">
        <div className="ph4">
          <ExtensionPoint id="product-summary" {...props} />
        </div>
        <div className="ph4">
          <ExtensionPoint id="product-summary" {...props} />
        </div>
        <div className="ph4">
          <ExtensionPoint id="product-summary" {...props} />
        </div>
      </div>
    )
  }
}
