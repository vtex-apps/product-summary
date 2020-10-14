import React from 'react'
import { useProductSummaryDispatch } from 'vtex.product-summary-context/ProductSummaryContext'

import useSimulation from '../hooks/useSimulation'
import useSetProduct from '../hooks/useSetProduct'

const ProductPriceSimulationWrapper = ({ product, inView, children }) => {
  const productSummaryDispatch = useProductSummaryDispatch()
  const setProduct = useSetProduct()

  useSimulation({
    product,
    inView,
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
