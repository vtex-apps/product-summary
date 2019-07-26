import React from 'react'
import AddedAttachmentsList from './AddedAttachmentsList'
import RemovedAttachmentsList from './RemovedAttachmentsList'

import styles from '../../productSummary.css'

const AttachmentChildren = ({ addedOptions, removedOptions }) => {
  if (addedOptions.length === 0 && removedOptions.length === 0) {
    return null
  }

  return (
    <div className={`${styles.attachmentChildrenContainer} ml3`}>
      <AddedAttachmentsList addedOptions={addedOptions} showItemPrice={false} />
      <RemovedAttachmentsList removedOptions={removedOptions} />
    </div>
  )
}

export default AttachmentChildren
