import React, { Fragment } from 'react'
import { arrayOf, bool } from 'prop-types'
import { FormattedMessage } from 'react-intl'

import AttachmentItem from './AttachmentItem'

import { CHOICE_TYPES } from '../../utils/attachmentHelper'

import { addedOptionShape } from '../../utils/propTypes'

const formatAttachmentName = option => (
  <FormattedMessage
    id="store/productSummary.attachmentName"
    values={{
      sign: '+',
      name: option.item.name,
      quantity: option.normalizedQuantity,
    }}
  />
)

const AddedAttachmentsList = ({ addedOptions, showItemPrice }) => {
  if (addedOptions.length === 0) {
    return null
  }
  return (
    <Fragment>
      {addedOptions.map(option => {
        const isSingle = option.choiceType === CHOICE_TYPES.SINGLE
        const productText = isSingle
          ? option.item.name
          : formatAttachmentName(option)
        return (
          <AttachmentItem
            productText={productText}
            price={
              option.item.sellingPriceWithAssemblies * option.normalizedQuantity
            }
            key={`${option.item.name}-${option.choiceType}`}
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
  addedOptions: arrayOf(addedOptionShape).isRequired,
  showItemPrice: bool,
}

export default AddedAttachmentsList
