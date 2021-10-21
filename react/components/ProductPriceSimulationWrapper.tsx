import React from 'react'
import type { PropsWithChildren } from 'react'
import { ProductSummaryContext } from 'vtex.product-summary-context'
import type { ProductSummaryTypes } from 'vtex.product-summary-context'

import useSimulation from '../hooks/useSimulation'
import useSetProduct from '../hooks/useSetProduct'

interface Props {
  product: ProductSummaryTypes.Product
  inView: boolean
  priceBehavior: 'async' | 'asyncOnly1P' | 'default'
}

function ProductPriceSimulationWrapper({
  product,
  inView,
  children,
  priceBehavior,
}: PropsWithChildren<Props>) {
  const productSummaryDispatch = ProductSummaryContext.useProductSummaryDispatch()
  const setProduct = useSetProduct()

  useSimulation({
    product,
    inView,
    priceBehavior,
    onError: () => {
      productSummaryDispatch({
        type: 'SET_PRICE_LOADING',
        args: { isPriceLoading: false },
      })
    },
    onComplete: (simulatedProduct) => {
      setProduct(simulatedProduct)

      productSummaryDispatch({
        type: 'SET_PRICE_LOADING',
        args: { isPriceLoading: false },
      })
    },
  })

  return <>{children}</>
}

export default ProductPriceSimulationWrapper
