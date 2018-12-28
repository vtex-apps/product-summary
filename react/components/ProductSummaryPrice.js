import React, { Component } from 'react'
import classNames from 'classnames'
import ProductPrice from 'vtex.store-components/ProductPrice'
import { path } from 'ramda'
import productSummary from '../productSummary.css'

export default class ProductSummaryPrice extends Component {
  commertialOffer = () => path(['sku', 'seller', 'commertialOffer'], this.props.product)

  render() {
    const {
      showListPrice,
      showLabels,
      showInstallments,
      labelSellingPrice,
      displayMode,
      showBorders,
    } = this.props

    const containerClasses = classNames(`${productSummary.priceContainer} flex flex-column`, {
      'justify-end items-center': displayMode !== 'inline',
      'pv5': !showBorders,
    })

    const commertialOffer = this.commertialOffer()
    
    return (
      <div className={containerClasses}>
        <ProductPrice
          className="flex flex-column justify-start"
          listPriceContainerClass="pv1 normal c-muted-2"
          listPriceLabelClass="dib strike t-small t-mini"
          listPriceClass="dib ph2 strike t-small-ns t-mini"
          sellingPriceContainerClass="pt1 pb3 c-on-base"
          sellingPriceLabelClass="dib"
          sellingPriceClass="dib ph2 t-heading-5-ns"
          savingsContainerClass="t-small-ns c-muted-2"
          savingsClass="dib"
          interestRateClass="dib pl2"
          installmentContainerClass="t-small-ns c-muted-2"
          listPrice={path(['ListPrice'], commertialOffer)}
          sellingPrice={path(['Price'], commertialOffer)}
          installments={path(['Installments'], commertialOffer)}
          showListPrice={showListPrice}
          showLabels={showLabels}
          showInstallments={showInstallments}
          labelSellingPrice={labelSellingPrice}
        />
      </div>
    )
  }
}
