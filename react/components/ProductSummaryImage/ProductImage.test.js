import React, { Children } from 'react'
import { render, fireEvent } from '@vtex/test-tools/react'
import ProductImage from './ProductImage'
import { useProductSummary } from 'vtex.product-summary-context/ProductSummaryContext'

test('should show placeholder on error', () => {
  const productName = 'Ball'
  const mock = {
    product: {
      productName,
      sku: { image: { imageUrl: 'foo' } },
    },
  }

  const { getByAltText, getByTestId } = render(
    <ProductSummaryContext.Provider value={mock}>
      <ProductImage />
    </ProductSummaryContext.Provider>
  )

  const image = getByAltText(productName)

  fireEvent.error(image)
  expect(getByTestId('image-placeholder')).toBeDefined()
})
