import React, { Component } from 'react'
import { intlShape, injectIntl } from 'react-intl'
import ProductPrice from 'vtex.store-components/ProductPrice'
import { productShape } from '../utils/propTypes'
import { propOr } from 'ramda'

import { optionPricePerItem, parentPricePerUnit, getProductPrice, CHOICE_TYPES } from '../utils/attachmentHelper'

class AttachmentList extends Component {
  static propTypes = {
    product: productShape,
    intl: intlShape,
  }

  getOptionExtraQuantity = (option) => {
    const { product } = this.props
    const { quantity, compositionItem } = option
    const currentQuantity = quantity / product.quantity
    const initialQuantity = propOr(0, 'initialQuantity', compositionItem)
    return currentQuantity - initialQuantity
  }

  formatAttachmentName = (option) => {
    const { product, intl } = this.props
    const extraParams = {
      name: option.productName,
      quantity: this.getOptionExtraQuantity(option) || (option.quantity / product.quantity),
    }
    return intl.formatMessage({ id: 'editor.productSummary.attachmentName' }, extraParams)
  }
    

  canShow = option => this.getOptionExtraQuantity(option) > 0 || getProductPrice(option) !== 0

  renderItem = (productText, product, price) => {
    return (
      <div className="flex items-center justify-between pv1" key={product.productName}>
        <span className="t-small c-muted-2 tl pr3">{productText}</span>
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

    const addedOptions = propOr([], 'addedOptions', product)
    const filteredOption = addedOptions.filter(this.canShow)
    if (filteredOption.length === 0) {
      return null
    }

    return (
      <div className={'pv2'}>
        {this.renderItem(intl.formatMessage({ id: 'editor.productSummary.unit' }), product, parentPricePerUnit(product))}
        {filteredOption.map(option => {
          const isSingle = option.choiceType === CHOICE_TYPES.SINGLE
          const productText = isSingle ? option.productName : this.formatAttachmentName(option)
          const price = optionPricePerItem(option, product)
          return this.renderItem(productText, option, price)
        })}
      </div>
    )
  }
}

export default injectIntl(AttachmentList)
