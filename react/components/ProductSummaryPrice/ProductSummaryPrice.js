import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { 
  path, 
  prop, 
  compose, 
  sort, 
  head, 
  last,
  flatten,
  map,
  filter
} from 'ramda'
import classNames from 'classnames'
import { Spinner } from 'vtex.styleguide'
import { ProductPrice } from 'vtex.store-components'

import ProductSummaryContext from '../ProductSummaryContext'
import { productShape } from '../../utils/propTypes'
import productSummary from '../../productSummary.css'

const ProductSummaryPrice = ({
  showListPrice,
  showLabels,
  showInstallments,
  labelSellingPrice,
  labelListPrice,
  showBorders,
}) => {
  const { product, isLoading } = useContext(ProductSummaryContext)
  const commertialOffer = path(['sku', 'seller', 'commertialOffer'], product)

  if (isLoading) {
    return (
      <div className="flex items-end justify-end w-100 h1 pr6">
        <Spinner size={20} />
      </div>
    )
  }

  const priceClasses = {
    containerClass: classNames('flex flex-column justify-end items-center', {
      [`${productSummary.priceContainer} pv5`]: !showBorders,
    }),
    sellingPriceClass: 'dib ph2 t-body t-heading-5-ns',
  }

  const sortPrices = (priceA, priceB) => priceA - priceB
  const lowestPrice = compose(head, sort(sortPrices))
  const highestPrice = compose(last, sort(sortPrices))

  const getListPrices = prices => {
    const lowPrice = lowestPrice(prices)
    const highPrice = highestPrice(prices)
    return [
      lowPrice,
      highPrice,
    ]
  }

  const isAvailableProduct = price => price !== 0

  const getPriceRange = () => {
    const items = prop('items', product)
    if (items) {
      const sellers = flatten(map('sellers', items))
      const prices = map(path(['commertialOffer', 'Price']), sellers)
      const availableProductsPrices = filter(isAvailableProduct, prices)
      
      return getListPrices(availableProductsPrices)
    }

    return []
  }

  const priceRange = getPriceRange()
  const [lowPrice, highPrice] = priceRange
  const showPriceRange = lowPrice !== highPrice

  const sellingPrice = prop('Price', commertialOffer)

  return (
    <div className={priceClasses.containerClass}>
      {sellingPrice !== 0 && (
        <ProductPrice
          className="flex flex-column justify-start"
          listPriceContainerClass="pv1 normal c-muted-2"
          listPriceLabelClass="dib strike t-small t-mini"
          listPriceClass="dib ph2 strike t-small-ns t-mini"
          sellingPriceContainerClass="pt1 pb3 c-on-base"
          sellingPriceLabelClass="dib"
          sellingPriceClass={priceClasses.sellingPriceClass}
          savingsContainerClass="t-small-ns c-muted-2"
          savingsClass="dib"
          interestRateClass="dib pl2"
          installmentContainerClass="t-small-ns c-muted-2"
          listPrice={prop('ListPrice', commertialOffer)}
          priceRange={priceRange}
          priceRangeClass="dib ph2 t-small-ns"
          sellingPrice={prop('Price', commertialOffer)}
          installments={prop('Installments', commertialOffer)}
          showPriceRange={showPriceRange}
          showListPrice={showListPrice}
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
  /** Text of list Price's label */
  labelListPrice: PropTypes.string,
  /** Set installments' visibility */
  showBorders: PropTypes.bool,
}

ProductSummaryPrice.defaultProps = {
  showListPrice: true,
  showPriceRange: true,
  showInstallments: true,
  showLabels: true,
  labelSellingPrice: '',
  labelListPrice: '',
  showBorders: false,
}

ProductSummaryPrice.getSchema = () => {
  return {
    title: 'admin/editor.productSummary.title',
    description: 'admin/editor.productSummary.description',
    type: 'object',
    properties: {
      showListPrice: {
        type: 'boolean',
        title: 'admin/editor.productSummary.showListPrice.title',
        default: ProductSummaryPrice.defaultProps.showListPrice,
        isLayout: true,
      },
      showPriceRange: {
        type: 'boolean',
        title: 'admin/editor.productSummary.showPriceRange.title',
        default: ProductSummaryPrice.defaultProps.showPriceRange,
        isLayout: true,
      },
      showInstallments: {
        type: 'boolean',
        title: 'admin/editor.productSummary.showInstallments.title',
        default: ProductSummaryPrice.defaultProps.showInstallments,
        isLayout: true,
      },
      showLabels: {
        type: 'boolean',
        title: 'admin/editor.productSummary.showLabels.title',
        default: ProductSummaryPrice.defaultProps.showLabels,
        isLayout: true,
      },
      labelSellingPrice: {
        type: 'string',
        title: 'admin/editor.productSummary.labelSellingPrice.title',
        isLayout: false,
      },
      labelListPrice: {
        type: 'string',
        title: 'admin/editor.productSummary.labelListPrice.title',
        isLayout: false,
      },
      showBorders: {
        type: 'boolean',
        title: 'admin/editor.productSummary.showBorders.title',
        default: ProductSummaryPrice.defaultProps.showBorders,
        isLayout: true,
      },
    },
  }
}

export default ProductSummaryPrice
