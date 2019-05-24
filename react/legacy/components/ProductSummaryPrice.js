import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import { 
  path, 
  prop,
  flatten,
  map,
  filter,
  head,
  last
} from 'ramda'
import { Spinner } from 'vtex.styleguide'
import { ProductPrice } from 'vtex.store-components'

import { productShape } from '../../utils/propTypes'

const isAvailableProduct = price => price !== 0

const getListPrices = prices => {
  console.log(prices)
  const sortPrices = prices.sort()
  console.log('preços ordenados', sortPrices)
  const lowPrice = head(sortPrices)
  const highPrice = last(sortPrices)
  return [
    lowPrice,
    highPrice,
  ]
}

const isPriceRange = (prices) => {
  const [lowPrice, highPrice] = prices
  return prices.length === 2 && lowPrice !== highPrice
}


const ProductSummaryPrice = ({
  product,
  showListPrice,
  showLabels,
  showInstallments,
  labelSellingPrice,
  labelListPrice,
  isLoading,
  containerClass,
}) => {
  const commertialOffer = path(['sku', 'seller', 'commertialOffer'], product)

  if (isLoading) {
    return (
      <div className="flex items-end justify-end w-100 h1 pr6">
        <Spinner size={20} />
      </div>
    )
  }

  const listPrices = useMemo(() => availableProductsPrices =>
    getListPrices(availableProductsPrices)
  )

  const getPriceRange = (attr) => {
    const { items } = product
    if (items) {
      const sellers = flatten(map(prop('sellers'), items))
      const prices = map(path(['commertialOffer', attr]), sellers)
      const availableProductsPrices = filter(isAvailableProduct, prices)

      return listPrices(availableProductsPrices)
    }

    return []
  }

  const priceRangeSellingPrice = useMemo(() => getPriceRange('Price'), [product])
  const priceRangeListPrice = useMemo(() => getPriceRange('ListPrice'), [product])
  const showPriceRangeSellingPrice = isPriceRange(priceRangeSellingPrice)
  const showPriceRangeListPrice = isPriceRange(priceRangeListPrice)
  console.log(priceRangeListPrice)

  const sellingPrice = prop('Price', commertialOffer)

  return (
    <div className={containerClass}>
      {sellingPrice !== 0 && (
        <ProductPrice
          className="flex flex-column justify-start"
          listPriceContainerClass="pv1 normal c-muted-2"
          listPriceLabelClass="dib strike t-small t-mini"
          listPriceClass="dib ph2 strike t-small-ns t-mini"
          sellingPriceContainerClass="pt1 pb3 c-on-base"
          sellingPriceLabelClass="dib"
          sellingPriceClass="dib ph2 t-body t-heading-5-ns"
          savingsContainerClass="t-small-ns c-muted-2"
          savingsClass="dib"
          interestRateClass="dib pl2"
          installmentContainerClass="t-small-ns c-muted-2"
          listPrice={prop('ListPrice', commertialOffer)}
          priceRange={priceRangeSellingPrice}
          priceRangeClass="dib ph2 t-small-ns"
          sellingPrice={prop('Price', commertialOffer)}
          installments={prop('Installments', commertialOffer)}
          showListPrice={showListPrice}
          showPriceRange={showPriceRangeSellingPrice}
          showLabels={showLabels}
          showInstallments={showInstallments}
          labelSellingPrice={labelSellingPrice}
          labelListPrice={labelListPrice}
        />
      )}
    </div>
  )
}

ProductSummaryPrice.propTypes = {
  /** Product that owns the informations */
  product: productShape,
  /** Set the product list price's visibility */
  showListPrice: PropTypes.bool,
  /** Set visibility of prices' range */
  showPriceRange: PropTypes.bool,
  /** Set pricing labels' visibility */
  showLabels: PropTypes.bool,
  /** Set installments' visibility */
  showInstallments: PropTypes.bool,
  /** Text of selling Price's label */
  labelSellingPrice: PropTypes.string,
  /** Text of selling Price's label */
  labelListPrice: PropTypes.string,
  /** Defines if the loading spinner is shown */
  isLoading: PropTypes.bool,
  /** Styles used in the container div */
  containerClass: PropTypes.string,
  /** Styles used in the selling price */
  sellingPriceClass: PropTypes.string,
}

export default ProductSummaryPrice
