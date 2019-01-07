import React, { Component } from 'react'
import { path } from 'ramda'
import ProductPrice from 'vtex.store-components/ProductPrice'
import { productShape } from '../propTypes'

export default class ProductSummaryAttachmentsList extends Component {
  static propTypes = {
    product: productShape,
  }

  hasPrice = (option) => path(['sku', 'seller', 'commertialOffer', 'Price'], option) > 0

  render() {
    const { product } = this.props

    if (!product.addedOptions || product.addedOptions.length === 0) {
      return null
    }

    return product.addedOptions.filter(this.hasPrice).map(option => {
      const productText = option.isSingleChoice ? option.productName : `+ ${option.quantity}× ${option.productName}`
      return (
        <div className="flex items-center justify-between" key={option.productName}>
          <span className="f5 c-muted-2">{productText}</span>
          <ProductPrice
            sellingPrice={option.sku.seller.commertialOffer.Price * option.quantity}
            sellingPriceContainerClass="pt1 pb3 c-on-base"
            sellingPriceLabelClass="dib"
            sellingPriceClass="dib f5 c-muted-2"
            showListPrice={false}
            showLabels={false}
            showInstallments={false}
          />
        </div>
      )
    })
  }
}
