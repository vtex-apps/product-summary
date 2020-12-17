import React from 'react'
import { render, fireEvent } from '@vtex/test-tools/react'
import { ProductSummaryContext } from 'vtex.product-summary-context'

import ProductImage from './ProductSummaryImage'

test('should show placeholder on error', () => {
  const productName = 'Ball'
  const mock = {
    product: {
      productName,
      sku: { image: { imageUrl: 'foo' } },
    },
  }

  const { getByAltText, getByTestId } = render(
    // @ts-expect-error We are not providing the full context
    <ProductSummaryContext.ProductSummaryProvider value={mock}>
      <ProductImage />
    </ProductSummaryContext.ProductSummaryProvider>
  )

  const image = getByAltText(productName)

  fireEvent.error(image)
  expect(getByTestId('image-placeholder')).toBeDefined()
})
