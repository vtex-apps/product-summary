import React from 'react'
import { render } from 'test-utils'

import ProductSummary from '../index'

describe('<ProductSummary /> component', () => {
  function renderComponent(customProps) {
    const props = {
      ...customProps,
      runtime: { hints: {} },
      product: {
        linkText: 'linkText',
        productName: 'productName',
        sku: {
          name: 'name',
          itemId: 'itemId',
          image: {
            imageUrl: '',
          },
          seller: {
            sellerId: 'sellerId',
            commertialOffer: {
              Installments: [
                {
                  Value: 1,
                  InterestRate: 1,
                  NumberOfInstallments: 1,
                },
              ],
              Price: 1,
              ListPrice: 1,
            },
          },
        },
        productClusters: [
          {
            name: 'name',
          },
        ],
        quantity: 1,
      },
    }

    return render(<ProductSummary {...props} />)
  }

  it('should be match the snapshot for normal mode', () => {
    const { asFragment } = renderComponent({ displayMode: 'normal' })
    expect(asFragment()).toMatchSnapshot()
  })

  it('should be match the snapshot for small mode', () => {
    const { asFragment } = renderComponent({ displayMode: 'small' })
    expect(asFragment()).toMatchSnapshot()
  })

  it('should be match the snapshot for inline mode', () => {
    const { asFragment } = renderComponent({ displayMode: 'inline' })
    expect(asFragment()).toMatchSnapshot()
  })
})
