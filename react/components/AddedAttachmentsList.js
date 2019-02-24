import React, { Fragment } from 'react'
import { arrayOf, number } from 'prop-types'
import { intlShape, injectIntl } from 'react-intl'

import AttachmentItem from './AttachmentItem'

import { CHOICE_TYPES } from '../utils/attachmentHelper'

import { addedOptionShape } from '../utils/propTypes'

const formatAttachmentName = (option, intl) => {
  const extraParams = {
    sign: '+',
    name: option.item.name,
    quantity: option.extraQuantity || option.normalizedQuantity,
  }
  return intl.formatMessage({ id: 'editor.productSummary.attachmentName' }, extraParams)
}

const AddedAttachmentsList = ({
  addedOptions,
  parentPrice,
  intl
}) => {
  if (addedOptions.length === 0) {
    return null
  }
  return (
    <Fragment>
      <AttachmentItem 
        productText={intl.formatMessage({ id: 'editor.productSummary.unit' })}
        price={parentPrice}
      />
      {addedOptions.map(option => {
        const isSingle = option.choiceType === CHOICE_TYPES.SINGLE
        const productText = isSingle ? option.item.name : formatAttachmentName(option, intl)
        return (
          <AttachmentItem 
            productText={productText}
            price={option.item.sellingPrice * option.normalizedQuantity}
          />
        )
      })}
    </Fragment>
  )
}

AddedAttachmentsList.propTypes = {
  intl: intlShape,
  addedOptions: arrayOf(addedOptionShape).isRequired,
  parentPrice: number.isRequired,
}

export default injectIntl(AddedAttachmentsList)
