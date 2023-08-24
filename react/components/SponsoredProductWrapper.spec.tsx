import { render, screen } from '@vtex/test-tools/react'
import React from 'react'
import { ProductSummaryTypes } from 'vtex.product-summary-context'

import SponsoredProductWrapper from './SponsoredProductWrapper'

const position = 8
const mockProduct = {
  productName: 'productName',
  productId: 'productId',
} as ProductSummaryTypes.Product

const advertisement = {
  adId: 'adId',
  campaignId: 'campaignId',
  adRequestId: 'adRequestId',
  adResponseId: 'adResponseId',
  actionCost: 0.32,
}

const mockSponsoredProduct = {
  ...mockProduct,
  advertisement,
} as ProductSummaryTypes.Product

const Children = <>Mock Children</>

const setup = (product: ProductSummaryTypes.Product) =>
  render(
    <SponsoredProductWrapper product={product} position={position}>
      {Children}
    </SponsoredProductWrapper>
  )

describe('<SponsoredProductWrapper />', () => {
  it('should render the children', () => {
    setup(mockSponsoredProduct)

    expect(screen.getByText('Mock Children')).toBeInTheDocument()
  })

  describe('when a product is sponsored', () => {
    it('should add the sponsored data properties', () => {
      setup(mockSponsoredProduct)
      const wrapper = screen.getByTestId('sponsored-product-wrapper')

      expect(wrapper.getAttribute('data-van-aid')).toBe('adId')
      expect(wrapper.getAttribute('data-van-cid')).toBe('campaignId')
      expect(wrapper.getAttribute('data-van-req-id')).toBe('adRequestId')
      expect(wrapper.getAttribute('data-van-res-id')).toBe('adResponseId')
      expect(wrapper.getAttribute('data-van-cpc')).toBe('0.32')
      expect(wrapper.getAttribute('data-van-position')).toBe('8')
      expect(wrapper.getAttribute('data-van-prod-id')).toBe('productId')
      expect(wrapper.getAttribute('data-van-prod-name')).toBe('productName')
    })
  })

  describe('when a product is not sponsored', () => {
    it('should not render the wrapper', () => {
      setup(mockProduct)
      const wrapper = screen.queryByTestId('sponsored-product-wrapper')

      expect(wrapper).not.toBeInTheDocument()
    })
  })
})
