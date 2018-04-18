import React, { Component } from 'react'
import { ExtensionPoint } from 'render'

// FIXME: Delete when we can use true data.
const props = {
  product: {
    listPrice: 200,
    sellingPrice: 170,
    installments: 3,
    installmentPrice: 50,
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSd0cHfPOO0tneOT0AH3UDs7BumkdOVHZtv4DL55dFtInS2q8mi',
    name: 'My product',
    url: 'https://google.com',
    referenceCode: '10125120',
    skuName: 'v2',
    brandName: 'Boticario',
    skuId: 12,
  },
  orderForm: {
    orderFormId: '3e33beb9928540099018085fafb87b6b',
    salesChannel: '1',
    seller: '1',
  },
  showListPrice: true,
  showInstallments: false,
  showLabels: true,
  showBadge: true,
  hideBuyButton: false,
  showOnHover: false,
}

export default class GettingStartedIndex extends Component {
  render() {
    return (
      <div className="center mw5">
        <div className="pv2">
          <ExtensionPoint id="productSummary" {...props} />
        </div>
      </div>
    )
  }
}
