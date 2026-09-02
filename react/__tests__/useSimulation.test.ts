import type { ProductSummaryTypes } from 'vtex.product-summary-context'

import { mergeSellers } from '../hooks/useSimulation'

type Offer = { Price: number; AvailableQuantity: number; priceToken?: string }

// The tests only need the fields `mergeSellers` touches, not a full Seller.
const seller = (sellerId: string, offer: Offer) => {
  const value: unknown = { sellerId, commertialOffer: offer }

  return value as ProductSummaryTypes.Seller
}

const offerOf = (result: ProductSummaryTypes.Seller) => {
  const value: unknown = result.commertialOffer

  return value as Offer
}

describe('mergeSellers', () => {
  it('keeps the signed price when the simulation confirms the indexed price', () => {
    const result = mergeSellers(
      seller('1', { Price: 100, AvailableQuantity: 5, priceToken: 'token' }),
      seller('1', { Price: 100, AvailableQuantity: 3 })
    )

    expect(offerOf(result)).toMatchObject({
      Price: 100,
      AvailableQuantity: 3,
      priceToken: 'token',
    })
  })

  it('drops the signed price when the simulation overwrites the price', () => {
    const result = mergeSellers(
      seller('1', { Price: 100, AvailableQuantity: 5, priceToken: 'token' }),
      seller('1', { Price: 80, AvailableQuantity: 5 })
    )

    expect(offerOf(result).Price).toBe(80)
    expect(offerOf(result)).not.toHaveProperty('priceToken')
  })

  it('drops the signed price when the simulation zeroes the price', () => {
    const result = mergeSellers(
      seller('1', { Price: 100, AvailableQuantity: 5, priceToken: 'token' }),
      seller('1', { Price: 0, AvailableQuantity: 5 })
    )

    expect(offerOf(result)).not.toHaveProperty('priceToken')
    expect(offerOf(result).AvailableQuantity).toBe(0)
  })

  it('is a no-op for offers without a signed price', () => {
    const result = mergeSellers(
      seller('1', { Price: 100, AvailableQuantity: 5 }),
      seller('1', { Price: 80, AvailableQuantity: 5 })
    )

    expect(offerOf(result).Price).toBe(80)
  })
})
