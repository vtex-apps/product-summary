import React, { useMemo, useContext } from 'react'
import PropTypes from 'prop-types'
import { 
  path, 
  prop,
  flatten,
  map,
  filter
} from 'ramda'
import classNames from 'classnames'
import { Spinner } from 'vtex.styleguide'
import { ProductPrice } from 'vtex.store-components'
import { useProductSummary } from 'vtex.product-summary-context/ProductSummaryContext'

import productSummary from '../../productSummary.css'

const isAvailableProduct = price => price !== 0

const ProductSummaryPrice = ({
  showListPrice,
  showSellingPriceRange,
  showLabels,
  showInstallments,
  labelSellingPrice,
  labelListPrice,
  showBorders,
  showListPriceRange,
}) => {
  const { product, isLoading } = useProductSummary()
  // TODO: change ProductSummaryContext to have `selectedSku` field instead of `sku`
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

  const getPrices = attribute => {
    const { items } = product
    if (!items) {
      return []
    }

    const sellers = flatten(map(prop('sellers'), items))
    const prices = map(path(['commertialOffer', attribute]), sellers)
    const availableProductsPrices = filter(isAvailableProduct, prices)

    return availableProductsPrices
  }

  const sellingPriceList = useMemo(() => getPrices('Price'), [product])
  const listPriceList = useMemo(() => getPrices('ListPrice'), [product])
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
          sellingPriceList={sellingPriceList}
          listPriceRangeClass="dib ph2 t-small-ns strike"
          sellingPriceRangeClass="dib ph2 t-small-ns"
          sellingPrice={prop('Price', commertialOffer)}
          installments={prop('Installments', commertialOffer)}
          showListPrice={showListPrice}
          showSellingPriceRange={showSellingPriceRange}
          showLabels={showLabels}
          showInstallments={showInstallments}
          labelSellingPrice={labelSellingPrice}
          labelListPrice={labelListPrice}
          listPriceList={listPriceList}
          showListPriceRange={showListPriceRange}
        />
      )}
    </div>
  )
}

ProductSummaryPrice.propTypes = {
  /** Set the product selling price range visibility */
  showSellingPriceRange: PropTypes.bool,
  /** Set the product list price's visibility */
  showListPrice: PropTypes.bool,
  /** Set the product list price range visibility */
  showListPriceRange: PropTypes.bool,
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
  showSellingPriceRange: false,
  showListPriceRange: false,
  showListPrice: true,
  showInstallments: true,
  showLabels: true,
  labelSellingPrice: '',
  labelListPrice: '',
  showBorders: false,
}

ProductSummaryPrice.schema = {
  title: 'admin/editor.productSummaryPrice.title',
  description: 'admin/editor.productSummaryPrice.description',
  type: 'object',
  properties: {
    showListPrice: {
      type: 'boolean',
      title: 'admin/editor.productSummaryPrice.showListPrice.title',
      default: ProductSummaryPrice.defaultProps.showListPrice,
      isLayout: true,
    },
    showSellingPriceRange: {
      type: 'boolean',
      title: 'admin/editor.productSummaryPrice.showSellingPriceRange.title',
      default: ProductSummaryPrice.defaultProps.showSellingPriceRange,
      isLayout: true,
    },
    showListPriceRange: {
      type: 'boolean',
      title: 'admin/editor.productSummaryPrice.showListPriceRange.title',
      default: ProductSummaryPrice.defaultProps.showListPrice,
      isLayout: true,
    },
    showInstallments: {
      type: 'boolean',
      title: 'admin/editor.productSummaryPrice.showInstallments.title',
      default: ProductSummaryPrice.defaultProps.showInstallments,
      isLayout: true,
    },
    showLabels: {
      type: 'boolean',
      title: 'admin/editor.productSummaryPrice.showLabels.title',
      default: ProductSummaryPrice.defaultProps.showLabels,
      isLayout: true,
    },
    showBorders: {
      type: 'boolean',
      title: 'admin/editor.productSummaryPrice.showBorders.title',
      default: ProductSummaryPrice.defaultProps.showBorders,
      isLayout: true,
    },
  },
}

export default ProductSummaryPrice
