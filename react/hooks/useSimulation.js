import { useMemo } from 'react'
import { useQuery } from 'react-apollo'
import itemsWithSimulationQuery from 'vtex.store-resources/QueryItemsWithSimulation'

import clone from '../utils/clone'

const mergeSellers = (sellerA, sellerB) => {
  sellerA.commertialOffer = {
    ...sellerA.commertialOffer,
    ...sellerB.commertialOffer,
  }

  // Deal with withoutPriceFulfillment cases
  if (sellerA.commertialOffer.Price === 0) {
    sellerA.commertialOffer.AvailableQuantity = 0
  }

  return sellerA
}

const useSimulation = ({
  product,
  inView,
  onComplete,
  onError,
  isPriceAsync,
}) => {
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

  useQuery(itemsWithSimulationQuery, {
    variables: {
      items: simulationItemsInput,
    },
    skip: !isPriceAsync || !inView,
    ssr: false,
    onError,
    onCompleted: (response) => {
      if (!response) {
        return
      }

      const simulationItems = response.itemsWithSimulation

      const mergedProduct = clone(product)

      mergedProduct.items.forEach((item, itemIndex) => {
        const simulationItem = simulationItems[itemIndex]

        item.sellers = item.sellers.map((seller, simulationIndex) => {
          const sellerSimulation = simulationItem.sellers[simulationIndex]

          return mergeSellers(seller, sellerSimulation)
        })
      })

      mergedProduct.sku = mergedProduct.items.find(
        (item) => item.itemId === mergedProduct.sku.itemId
      )

      if (mergedProduct.sku.sellers.length > 0) {
        mergedProduct.sku.seller = mergedProduct.sku.sellers.find(
          (seller) => seller.sellerId === product.sku.seller.sellerId
        )
      } else {
        mergedProduct.sku.seller = {
          commertialOffer: { Price: 0, ListPrice: 0 },
        }
      }

      mergedProduct.sku.image = product.sku.image

      onComplete(mergedProduct)
    },
  })
}

export default useSimulation
