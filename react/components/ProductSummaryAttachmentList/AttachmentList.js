import React from 'react'
import { pathOr } from 'ramda'

import { useProductSummary } from 'vtex.product-summary-context/ProductSummaryContext'
import RemovedAttachmentsList from './RemovedAttachmentsList'
import AddedAttachmentsList from './AddedAttachmentsList'

import styles from '../../productSummary.css'

const shouldShowOption = option =>
  option.extraQuantity > 0 || option.item.sellingPrice !== 0

const AttachmentList = () => {
  const { product } = useProductSummary()
  const addedOptions = pathOr([], ['assemblyOptions', 'added'], product)
  const removedOptions = pathOr([], ['assemblyOptions', 'removed'], product)
  const parentPrice = pathOr(0, ['assemblyOptions', 'parentPrice'], product)

  const filteredOption = addedOptions.filter(shouldShowOption)

  if (filteredOption.length === 0 && removedOptions.length === 0) {
    return null
  }

  return (
    <div className={`${styles.attachmentListContainer} pv2`}>
      <AddedAttachmentsList
        addedOptions={filteredOption}
        parentPrice={parentPrice}
      />
      <RemovedAttachmentsList removedOptions={removedOptions} />
    </div>
  )
}

export default AttachmentList
