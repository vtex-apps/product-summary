import React from 'react'
import type { PropsWithChildren } from 'react'
import { ProductSummaryContext } from 'vtex.product-summary-context'
import type { ProductSummaryTypes } from 'vtex.product-summary-context'

import useSimulation from '../hooks/useSimulation'
import useSetProduct from '../hooks/useSetProduct'
import { useCallback } from 'react'

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

  const onComplete = useCallback((simulatedProduct) => {
    setProduct(simulatedProduct)

    productSummaryDispatch({
      type: 'SET_PRICE_LOADING',
      args: { isPriceLoading: false },
    })
  }, [])

  const onError = useCallback(() => {
    productSummaryDispatch({
      type: 'SET_PRICE_LOADING',
      args: { isPriceLoading: false },
    })
  }, [])

  useSimulation({
    product,
    inView,
    priceBehavior,
    onError,
    onComplete,
  })

  return <>{children}</>
}

export default ProductPriceSimulationWrapper
