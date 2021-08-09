import { useMemo } from 'react'
import { useQuery } from 'react-apollo'
import type { ProductSummaryTypes } from 'vtex.product-summary-context'
import { QueryItemsWithSimulation } from 'vtex.store-resources'

import clone from '../utils/clone'

const mergeSellers = (
  sellerA: ProductSummaryTypes.Seller,
  sellerB: ProductSummaryTypes.Seller,
  sellerDefault?: string
) => {
  sellerA.commertialOffer = {
    ...sellerA.commertialOffer,
    ...sellerB.commertialOffer,
  }

  // Deal with withoutPriceFulfillment cases
  if (sellerA.commertialOffer.Price === 0) {
    sellerA.commertialOffer.AvailableQuantity = 0
  }

  if (!sellerDefault) {
    return sellerA
  }

  return {
    ...sellerA,
    sellerDefault: sellerA.sellerId === sellerDefault,
  }
}

const getDefaultSeller = (sellers: ProductSummaryTypes.Seller[]) => {
  const sellersWithStock = sellers.filter(
    (seller) => seller.commertialOffer.AvailableQuantity !== 0
  )

  return sellersWithStock
    ?.sort((a, b) => a.commertialOffer.Price - b.commertialOffer.Price)
    .map((seller) => seller.sellerId)[0]
}

type Params = {
  product: ProductSummaryTypes.Product
  inView: boolean
  onComplete: (product: ProductSummaryTypes.Product) => void
  onError: () => void
  priceBehavior: 'async' | 'default'
}

function useSimulation({
  product,
  inView,
  onComplete,
  onError,
  priceBehavior,
}: Params) {
  const items = product.items || []

  const simulationItemsInput = useMemo(
    () =>
      items.map((item) => ({
        itemId: item.itemId,
        sellers: item.sellers.map((seller) => ({
          sellerId: seller.sellerId,
        })),
      })),
    [items]
  )

  useQuery(QueryItemsWithSimulation, {
    variables: {
      items: simulationItemsInput,
    },
    skip: priceBehavior !== 'async' || !inView,
    ssr: false,
    onError,
    onCompleted: (response) => {
      if (!response) {
        return
      }

      const simulationItems = response.itemsWithSimulation

      const mergedProduct = clone(product) as ProductSummaryTypes.Product

      mergedProduct.items.forEach((item, itemIndex) => {
        const simulationItem = simulationItems[itemIndex]

        const sellerDefault = getDefaultSeller(simulationItem.sellers)

        item.sellers = item.sellers.map((seller, simulationIndex) => {
          const sellerSimulation = simulationItem.sellers[simulationIndex]

          return mergeSellers(seller, sellerSimulation, sellerDefault)
        })
      })

      mergedProduct.sku = mergedProduct.items.find(
        (item) => item.itemId === mergedProduct.sku.itemId
      ) as ProductSummaryTypes.SingleSKU

      if (mergedProduct.sku.sellers.length > 0) {
        mergedProduct.sku.seller = mergedProduct.sku.sellers.find(
          (seller) => seller.sellerDefault
        ) as ProductSummaryTypes.Seller
      } else {
        mergedProduct.sku.seller = {
          // @ts-expect-error We are not providing the full type
          commertialOffer: { Price: 0, ListPrice: 0 },
        }
      }

      mergedProduct.sku.image = product.sku.image

      onComplete(mergedProduct)
    },
  })
}

export default useSimulation
