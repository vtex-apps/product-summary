import React from 'react'
import PropTypes from 'prop-types'
import { path, prop } from 'ramda'
import classNames from 'classnames'
import { Spinner } from 'vtex.styleguide'
import { ProductPrice } from 'vtex.store-components'

import { productShape } from '../utils/propTypes'
import productSummary from '../productSummary.css'

const ProductSummaryPrice = ({
  product,
  showBorders,
  showListPrice,
  showLabels,
  showInstallments,
  labelSellingPrice,
  displayMode,
  isLoading,
}) => {
  const commertialOffer = path(['sku', 'seller', 'commertialOffer'], product)

  if (isLoading) {
    return (
      <div className="flex items-center justify-center w-100">
        <Spinner size={20} />
      </div>
    )
  }

  // TODO: When the specific components for inline etc are created
  // change to get the not inline style by props.
  // This component should not know how to style in differents displayModes
  const containerClasses = classNames('flex flex-column', {
    'justify-end items-center': displayMode !== 'inline',
    [`${productSummary.priceContainer} pv5`]: !showBorders,
  })

  const sellingPrice = prop('Price', commertialOffer)
  const sellingPriceClass = classNames('dib ph2 t-body t-heading-5-ns', {
    't-small t-body-ns': sellingPrice > 1000 && displayMode === 'inline',
  })

  return (
    <div className={containerClasses}>
      <ProductPrice
        className="flex flex-column justify-start"
        listPriceContainerClass="pv1 normal c-muted-2"
        listPriceLabelClass="dib strike t-small t-mini"
        listPriceClass="dib ph2 strike t-small-ns t-mini"
        sellingPriceContainerClass="pt1 pb3 c-on-base"
        sellingPriceLabelClass="dib"
        sellingPriceClass={sellingPriceClass}
        savingsContainerClass="t-small-ns c-muted-2"
        savingsClass="dib"
        interestRateClass="dib pl2"
        installmentContainerClass="t-small-ns c-muted-2"
        listPrice={prop('ListPrice', commertialOffer)}
        sellingPrice={sellingPrice}
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
  /** Set the borders product's visibility */
  showBorders: PropTypes.bool,
  /** Set the product list price's visibility */
  showListPrice: PropTypes.bool,
  /** Set pricing labels' visibility */
  showLabels: PropTypes.bool,
  /** Set installments' visibility */
  showInstallments: PropTypes.bool,
  /** Text of selling Price's label */
  labelSellingPrice: PropTypes.string,
  /** Display mode of the summary used in the search result */
  displayMode: PropTypes.oneOf([
    'normal',
    'small',
    'inline',
  ]),
  /** Defines if the loading spinner is shown */
  isLoading: PropTypes.bool,
}

export default ProductSummaryPrice
