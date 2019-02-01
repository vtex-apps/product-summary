import React from 'react'
import PropTypes from 'prop-types'
import { path, prop } from 'ramda'
import { Spinner } from 'vtex.styleguide'
import { ProductPrice } from 'vtex.store-components'

import { productShape } from '../utils/propTypes'

const ProductSummaryPrice = ({
  product,
  showListPrice,
  showLabels,
  showInstallments,
  labelSellingPrice,
  isLoading,
  containerClass,
  sellingPriceClass,
}) => {
  const commertialOffer = path(['sku', 'seller', 'commertialOffer'], product)

  if (isLoading) {
    return (
      <div className="flex items-center justify-center w-100 h1">
        <Spinner size={20} />
      </div>
    )
  }

  return (
    <div className={containerClass}>
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
        sellingPrice={prop('Price', commertialOffer)}
        installments={prop('Installments', commertialOffer)}
        showListPrice={showListPrice}
        showLabels={showLabels}
        showInstallments={showInstallments}
        labelSellingPrice={labelSellingPrice}
      />
    </div>
  )
}

ProductSummaryPrice.propTypes = {
  /** Product that owns the informations */
  product: productShape,
  /** Set the product list price's visibility */
  showListPrice: PropTypes.bool,
  /** Set pricing labels' visibility */
  showLabels: PropTypes.bool,
  /** Set installments' visibility */
  showInstallments: PropTypes.bool,
  /** Text of selling Price's label */
  labelSellingPrice: PropTypes.string,
  /** Defines if the loading spinner is shown */
  isLoading: PropTypes.bool,
  /** Styles used in the container div */
  containerClass: PropTypes.string,
  /** Styles used in the selling price */  
  sellingPriceClass: PropTypes.string,
}

export default ProductSummaryPrice
