import React from 'react'

const MAX_SIZE_DESCRIPTION = 120

const ProductSummaryDescription = props => {
  const { descriptionClasses, description } = props

  if (!description)
    return (<div />)

  const descriptionTruncated = 
    description.length > MAX_SIZE_DESCRIPTION 
    ? `${description.substring(0, MAX_SIZE_DESCRIPTION)}...`
    : description

  return (
    <div className={descriptionClasses}>
      {descriptionTruncated}
    </div>
  )
}

export default ProductSummaryDescription