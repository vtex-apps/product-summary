import React, { Fragment } from 'react'
import { arrayOf, bool } from 'prop-types'
import { intlShape, injectIntl } from 'react-intl'

import AttachmentItem from './AttachmentItem'

import { CHOICE_TYPES } from '../../utils/attachmentHelper'

import { addedOptionShape } from '../../utils/propTypes'

const formatAttachmentName = (option, intl) => {
  const quantity = option.item.sellingPriceWithAssemblies
    ? option.normalizedQuantity
    : option.extraQuantity
  const extraParams = {
    sign: '+',
    name: option.item.name,
    quantity,
  }
  return intl.formatMessage(
    { id: 'store/productSummary.attachmentName' },
    extraParams
  )
}

const AddedAttachmentsList = ({ addedOptions, intl, showItemPrice }) => {
  if (addedOptions.length === 0) {
    return null
  }
  return (
    <Fragment>
      {addedOptions.map(option => {
        const isSingle = option.choiceType === CHOICE_TYPES.SINGLE
        const productText = isSingle
          ? option.item.name
          : formatAttachmentName(option, intl)
        return (
          <AttachmentItem
            productText={productText}
            price={
              option.item.sellingPriceWithAssemblies * option.normalizedQuantity
            }
            key={productText}
            assemblyOptions={option.item.assemblyOptions}
            showItemPrice={showItemPrice}
          />
        )
      })}
    </Fragment>
  )
}

AddedAttachmentsList.defaultProps = {
  showItemPrice: true,
}

AddedAttachmentsList.propTypes = {
  intl: intlShape,
  addedOptions: arrayOf(addedOptionShape).isRequired,
  showItemPrice: bool,
}

export default injectIntl(AddedAttachmentsList)
