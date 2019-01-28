import React, { Component } from 'react'
import { intlShape, injectIntl } from 'react-intl'
import ProductPrice from 'vtex.store-components/ProductPrice'
import { productShape } from '../utils/propTypes'
import { path } from 'ramda'

import { optionPricePerItem, parentPricePerUnit } from '../utils/attachmentHelper'

class AttachmentList extends Component {
  static propTypes = {
    product: productShape,
    intl: intlShape,
  }

  formatAttachmentName = (quantity, name) =>
    this.props.intl.formatMessage({ id: 'editor.productSummary.attachmentName' }, { quantity, name })

  // TODO:  not sure if it is the best way to define if an item should be displayed
  canShow = (option) => option.optionType !== 'Basic Toppings'

  renderItem = (productText, product, price) => {
    return (
      <div className="flex items-center justify-between pv1" key={product.productName}>
        <span className="t-small c-muted-2">{productText}</span>
        <ProductPrice
          sellingPrice={price}
          sellingPriceContainerClass="c-on-base"
          sellingPriceLabelClass="dib"
          sellingPriceClass="dib t-small c-muted-2"
          showListPrice={false}
          showLabels={false}
          showInstallments={false}
        />
      </div>
    )
  }

  render() {
    const { product, intl } = this.props

    if (!path(['addedOptions', 'length'], product)) {
      return null
    }

    return (
      <div className={'pb2'}>
        {this.renderItem(intl.formatMessage({ id: 'editor.productSummary.unit' }), product, parentPricePerUnit(product))}
        {product.addedOptions.filter(this.canShow).map(option => {
          const productText =
            option.isSingleChoice ? option.productName : this.formatAttachmentName(option.quantity / product.quantity, option.productName)
          const price = optionPricePerItem(option, product)
          return this.renderItem(productText, option, price)
        })}
      </div>
    )
  }
}

export default injectIntl(AttachmentList)
