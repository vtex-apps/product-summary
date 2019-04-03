import React, { FunctionComponent, useContext } from 'react'
import { path, prop } from 'ramda'
import { Spinner } from 'vtex.styleguide'
import { ProductPrice } from 'vtex.store-components'

import ProductSummaryContext, { ProductSummaryPriceContext } from './ProductSummaryContext'

const ProductSummaryPrice : FunctionComponent<any> = () => {
  const {
    product,
    priceProps: {
      showListPrice,
      showLabels,
      showInstallments,
      labelSellingPrice,
      isLoading,
      showBorders
    }
  } = useContext(ProductSummaryContext)
  const {
    containerClass,
    sellingPriceClass
  } = useContext(ProductSummaryPriceContext)

  const commertialOffer = path(['sku', 'seller', 'commertialOffer'], product)

  if (isLoading) {
    return (
      <div className="flex items-end justify-end w-100 h1 pr6">
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

export default ProductSummaryPrice
