import React from 'react'
import { render } from '@vtex/test-tools/react'

import ProductImage from '../ProductSummaryImage'
import ProductSummary from '../ProductSummaryCustom'

describe('<ProductImage /> component', () => {
  it('should render one img element', () => {
    const rawProduct = {
      productId: '123456789',
      linkText: 'linkText',
      productName: 'productName',
      items: [
        {
          itemId: '1',
          name: 'item 1',
          sellers: [
            {
              sellerId: '1',
              commertialOffer: {
                AvailableQuantity: 0,
                Price: 10,
                ListPrice: 7,
              },
            },
          ],
          images: [
            {
              imageUrl: 'image1',
              imageLabel: null,
            },
          ],
        },
      ],
      productClusters: [
        {
          name: 'name',
        },
      ],
      quantity: 1,
    }

    const product = ProductSummary.mapCatalogProductToProductSummary(rawProduct)

    const { container } = render(
      <ProductSummary product={product}>
        <ProductImage />
      </ProductSummary>
    )

    const imgElements = container.getElementsByTagName('img')

    expect(imgElements).toHaveLength(1)
    expect(imgElements[0].getAttribute('src')).toBeTruthy()
    expect(imgElements[0].getAttribute('src')).toContain('image1')
  })

  it('should render svg placeholder and no img element', () => {
    const rawProduct = {
      productId: '123456789',
      linkText: 'linkText',
      productName: 'productName',
      items: [
        {
          itemId: '1',
          name: 'item 1',
          sellers: [
            {
              sellerId: '1',
              commertialOffer: {
                AvailableQuantity: 0,
                Price: 10,
                ListPrice: 7,
              },
            },
          ],
          images: [],
        },
      ],
      productClusters: [
        {
          name: 'name',
        },
      ],
      quantity: 1,
    }

    const product = ProductSummary.mapCatalogProductToProductSummary(rawProduct)

    const { container } = render(
      <ProductSummary product={product}>
        <ProductImage />
      </ProductSummary>
    )

    const imgElements = container.getElementsByTagName('img')

    expect(imgElements).toHaveLength(0)
    const svgElements = container.getElementsByTagName('svg')

    expect(svgElements).toHaveLength(1)
  })

  it('should render custom placeholder img', () => {
    const rawProduct = {
      productId: '123456789',
      linkText: 'linkText',
      productName: 'productName',
      items: [
        {
          itemId: '1',
          name: 'item 1',
          sellers: [
            {
              sellerId: '1',
              commertialOffer: {
                AvailableQuantity: 0,
                Price: 10,
                ListPrice: 7,
              },
            },
          ],
          images: [],
        },
      ],
      productClusters: [
        {
          name: 'name',
        },
      ],
      quantity: 1,
    }

    const placeholder = 'placeholder-image-url'

    const product = ProductSummary.mapCatalogProductToProductSummary(rawProduct)

    const { container } = render(
      <ProductSummary product={product}>
        <ProductImage placeholder={placeholder} />
      </ProductSummary>
    )

    const imgElements = container.getElementsByTagName('img')

    expect(imgElements).toHaveLength(1)
    expect(imgElements[0].src.includes(placeholder)).toBeTruthy()
  })
})
