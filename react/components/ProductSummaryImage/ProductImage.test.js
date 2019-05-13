import React, { Children } from 'react'
import { render, fireEvent } from '@vtex/test-tools/react'
import ProductImage from './ProductImage'
import ProductSummaryContext from '../ProductSummaryContext'

test('should show placeholder on error', () => {
  const productName = 'Ball'
  const mock = {
    product: {
      productName,
      sku: {image: { imageUrl: 'foo'} }
    }
  }

  const { getByAltText, debug } = render(
    <ProductSummaryContext.Provider value={mock}>
      <ProductImage />
    </ProductSummaryContext.Provider>
  )

  const image = getByAltText(productName)
  
  fireEvent.error(image)

  debug()
})