import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import ProductSummaryContext, {  } from './ProductSummaryContext'

const MAX_SIZE_DESCRIPTION = 120

const ProductSummaryDescription = () => {
  const {
    product: {
      description
    },
    descriptionProps: {
      showDescription
    }
  } = useContext(ProductSummaryContext)

  if (!showDescription || !description)
    return (<Fragment />)

  const descriptionTruncated =
    description.length > MAX_SIZE_DESCRIPTION
    ? `${description.substring(0, MAX_SIZE_DESCRIPTION)}...`
    : description

  const descriptionClasses = `${productSummary.description} c-muted-2 t-small`

  return (
    <span className={descriptionClasses}>
      {descriptionTruncated}
    </span>
  )
}

ProductSummaryDescription.propTypes = {
  /** Description of the product */
  description: PropTypes.string
}

export default ProductSummaryDescription
