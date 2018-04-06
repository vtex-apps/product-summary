import React, { Component } from 'react'
import Card from '@vtex/styleguide/lib/Card'

import ProductSummary from './ProductSummary'

// FIXME: Delete when we can use true data.
const props = {
  product: {
    listPrice: 200,
    sellingPrice: 150,
    installments: 3,
    installmentPrice: 50,
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSd0cHfPOO0tneOT0AH3UDs7BumkdOVHZtv4DL55dFtInS2q8mi',
    name: 'My product',
    url: 'https://google.com',
  },
  showListPrice: true,
  showInstallments: true,
  showLabels: true,
  showBadge: true,
  disable: true,
  showOnHover: true,
}

export default class GettingStartedIndex extends Component {
  static propTypes = {
  }

  render() {
    return (
      <div className="center mw5">
        <div className="pv2">
          <Card fullWidth>
            <ProductSummary {...props} />
          </Card>
        </div>
      </div>
    )
  }
}
