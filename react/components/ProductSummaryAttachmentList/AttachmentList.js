import React from 'react'
import { pathOr, reject } from 'ramda'

import { useProductSummary } from 'vtex.product-summary-context/ProductSummaryContext'
import RemovedAttachmentsList from './RemovedAttachmentsList'
import AddedAttachmentsList from './AddedAttachmentsList'

import styles from '../../productSummary.css'

const itemShouldHide = ({ item, extraQuantity }) =>
  extraQuantity === 0 && item.sellingPriceWithAssemblies === 0

const AttachmentList = () => {
  const { product } = useProductSummary()
  const addedOptions = pathOr([], ['assemblyOptions', 'added'], product)
  const removedOptions = pathOr([], ['assemblyOptions', 'removed'], product)

  const filteredOption = reject(itemShouldHide, addedOptions)

  if (filteredOption.length === 0 && removedOptions.length === 0) {
    return null
  }

  return (
    <div className={`${styles.attachmentListContainer} pv2`}>
      <AddedAttachmentsList addedOptions={filteredOption} />
      <RemovedAttachmentsList removedOptions={removedOptions} />
    </div>
  )
}

export default AttachmentList
