import React from 'react'
import { render } from '@vtex/test-tools/react'
import ProductSummaryBuyButton from './ProductSummaryBuyButton'
import { ProductSummaryProvider } from 'vtex.product-summary-context/ProductSummaryContext'

test('basic', () => {
  const value = {
    product: {
      items: [],
    },
    selectedItem: {},
    selectedQuantity: 1,
  }
  const { debug } = render(
    <ProductSummaryProvider value={value}>
      <ProductSummaryBuyButton />
    </ProductSummaryProvider>
  )

  debug()
})
