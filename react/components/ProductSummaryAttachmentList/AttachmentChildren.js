import React from 'react'
import AddedAttachmentsList from './AddedAttachmentsList'
import RemovedAttachmentsList from './RemovedAttachmentsList'

const AttachmentChildren = ({ addedOptions, removedOptions }) => {
  if (addedOptions.length === 0 && removedOptions.length === 0) {
    return null
  }

  return (
    <div className="childrenContainer ml3">
      <AddedAttachmentsList addedOptions={addedOptions} showItemPrice={false} />
      <RemovedAttachmentsList removedOptions={removedOptions} />
    </div>
  )
}

export default AttachmentChildren
