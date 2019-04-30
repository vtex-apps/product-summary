import React, { Fragment, useContext } from 'react'
import PropTypes from 'prop-types'

import ProductSummaryContext from '../ProductSummaryContext'
import productSummary from '../../productSummary.css'

const MAX_SIZE_DESCRIPTION = 120

const ProductSummaryDescription = () => {
  const { product: { description } } = useContext(ProductSummaryContext)

  if (!description)
    return (<Fragment />)

  const descriptionClasses = `${productSummary.description} c-muted-2 t-small`

  const descriptionTruncated =
    description.length > MAX_SIZE_DESCRIPTION
    ? `${description.substring(0, MAX_SIZE_DESCRIPTION)}...`
    : description

  return (
    <span className={descriptionClasses}>
      {descriptionTruncated}
    </span>
  )
}

export default ProductSummaryDescription
