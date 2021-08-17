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
    ?.sort((a, b) => (a.commertialOffer as any).spotPrice - (b.commertialOffer as any).spotPrice)
    .map((seller) => seller.sellerId)[0]
}

type Params = {
  product: ProductSummaryTypes.Product
  inView: boolean
  onComplete: (product: ProductSummaryTypes.Product) => void
  onError: () => void
  priceBehavior: 'async' | 'asyncOnly1P' | 'default'
}

function useSimulation({
  product,
  inView,
  onComplete,
  onError,
  priceBehavior,
}: Params) {
  const items = product.items || []

  const simulationItemsInput = useMemo(() => {
    if (priceBehavior === 'async') {
      return items.map((item) => ({
        itemId: item.itemId,
        sellers: item.sellers.map((seller) => ({ sellerId: seller.sellerId })),
      }))
    }

    return items.map((item) => ({
      itemId: item.itemId,
      sellers: [{ sellerId: '1' }],
    }))
  }, [items, priceBehavior])

  useQuery(QueryItemsWithSimulation, {
    variables: {
      items: simulationItemsInput,
    },
    skip: priceBehavior === 'default' || !inView,
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

        if (priceBehavior === 'async') {
          const sellerDefault = getDefaultSeller(simulationItem.sellers)

          item.sellers = item.sellers.map((seller, simulationIndex) => {
            const sellerSimulation = simulationItem.sellers[simulationIndex]

            return mergeSellers(seller, sellerSimulation, sellerDefault)
          })
        } else {
          const seller1PIndex = item.sellers.findIndex(
            (seller) => seller.sellerId === '1'
          )

          const sellers = Array.from(item.sellers)

          sellers[seller1PIndex] = simulationItem.sellers[0]
          const sellerDefault = getDefaultSeller(sellers)

          item.sellers = item.sellers.map((seller) => {
            if (seller.sellerId !== '1') {
              return !sellerDefault
                ? seller
                : {
                    ...seller,
                    sellerDefault: seller.sellerId === sellerDefault,
                  }
            }

            return mergeSellers(
              seller,
              simulationItem.sellers[0],
              sellerDefault
            )
          })
        }
      })

      mergedProduct.sku = mergedProduct.items.find(
        (item) => item.itemId === mergedProduct.sku.itemId
      ) as ProductSummaryTypes.SingleSKU

      if (mergedProduct.sku.sellers.length > 0) {
        mergedProduct.sku.seller = (mergedProduct.sku.sellers.find(
          (seller) => seller.sellerDefault
        ) ?? mergedProduct.sku.sellers[0]) as ProductSummaryTypes.Seller
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
