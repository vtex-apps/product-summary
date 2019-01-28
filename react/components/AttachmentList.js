import React, { Component } from 'react'
import { intlShape, injectIntl } from 'react-intl'
import ProductPrice from 'vtex.store-components/ProductPrice'
import { productShape } from '../utils/propTypes'
import { pathOr } from 'ramda'

import { optionPricePerItem, parentPricePerUnit, getProductPrice, CHOICE_TYPES } from '../utils/attachmentHelper'

class AttachmentList extends Component {
  static propTypes = {
    product: productShape,
    intl: intlShape,
  }

  formatAttachmentName = (quantity, name) =>
    this.props.intl.formatMessage({ id: 'editor.productSummary.attachmentName' }, { quantity, name })

  // Not showing free stuff you get as a basic assembly option
  canShow = option => getProductPrice(option) > 0 || option.optionType === 'Crust'

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

    const addedOptions = pathOr([], ['addedOptions'], product)
    const filteredOption = addedOptions.filter(this.canShow)
    if (filteredOption.length === 0) {
      return null
    }

    return (
      <div className={'pb2'}>
        {this.renderItem(intl.formatMessage({ id: 'editor.productSummary.unit' }), product, parentPricePerUnit(product))}
        {filteredOption.map(option => {
          const isSingle = option.choiceType === CHOICE_TYPES.SINGLE
          const productText = 
            isSingle ? option.productName : this.formatAttachmentName(option.quantity / product.quantity, option.productName)
          const price = optionPricePerItem(option, product)
          return this.renderItem(productText, option, price)
        })}
      </div>
    )
  }
}

export default injectIntl(AttachmentList)
