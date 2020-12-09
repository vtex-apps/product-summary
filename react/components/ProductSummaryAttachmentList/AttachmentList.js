import React from 'react'
// eslint-disable-next-line no-restricted-imports
import { reject } from 'ramda'
import { useCssHandles } from 'vtex.css-handles'
import { ProductSummaryContext } from 'vtex.product-summary-context'

import RemovedAttachmentsList from './RemovedAttachmentsList'
import AddedAttachmentsList from './AddedAttachmentsList'

const CSS_HANDLES = ['attachmentListContainer']

const itemShouldHide = ({ item, extraQuantity }) =>
  extraQuantity === 0 && item.sellingPriceWithAssemblies === 0

const AttachmentList = () => {
  const { product } = ProductSummaryContext.useProductSummary()
  const { handles } = useCssHandles(CSS_HANDLES)
  const addedOptions = product?.assemblyOptions?.added ?? []
  const removedOptions = product?.assemblyOptions?.removed ?? []

  const filteredOption = reject(itemShouldHide, addedOptions)

  if (filteredOption.length === 0 && removedOptions.length === 0) {
    return null
  }

  return (
    <div className={`${handles.attachmentListContainer} pv2`}>
      <AddedAttachmentsList addedOptions={filteredOption} />
      <RemovedAttachmentsList removedOptions={removedOptions} />
    </div>
  )
}

export default AttachmentList
