import React from 'react'
import PropTypes from 'prop-types'
import { path } from 'ramda'
import classNames from 'classnames'
import { ProductName } from 'vtex.store-components'

import { productShape } from '../utils/propTypes'
import productSummary from '../productSummary.css'

const ProductSummaryName = ({
  product,
  displayMode,
  showFieldsProps,
}) => {
  // TODO: When the specific components for inline etc are created
  // change to not get displayMode by props.
  // This component should not know how to style in differents displayModes
  const containerClasses = classNames(
    'flex items-start',
    {
      [`${productSummary.nameContainer} justify-center`]: displayMode !== 'inline',
      'justify-left w-100 pt5': displayMode === 'inline',
      'pv5': displayMode === 'small',
      't-mini pb2': displayMode !== 'normal',
      'pv6': displayMode === 'normal',
    }
  )

  const productName = path(['productName'], product)
  const skuName = path(['sku', 'name'], product)
  const brandName = path(['brand'], product)

  const brandNameClasses = classNames('t-body', {
    't-mini': displayMode === 'small',
    'c-on-base': displayMode === 'inline',
  })

  return (
    <div className={containerClasses}>
      <ProductName
        className="overflow-hidden c-on-base"
        brandNameClass={brandNameClasses}
        skuNameClass="t-small"
        loaderClass="pt5 overflow-hidden"
        name={productName}
        skuName={skuName}
        brandName={brandName}
        {...showFieldsProps}
      />
    </div>
  )
}

ProductSummaryName.propTypes = {
  /** Product that owns the informations */
  product: productShape,
  /** Display mode of the summary used in the search result */
  displayMode: PropTypes.oneOf([
    'normal',
    'small',
    'inline',
  ]),
}

export default ProductSummaryName
