import React, { FunctionComponent, useContext } from 'react'
import PropTypes from 'prop-types'
import { path } from 'ramda'
import { ProductName } from 'vtex.store-components'

import ProductSummaryContext from './ProductSummaryContext'
import { productShape } from '../utils/propTypes'

const ProductSummaryName : FunctionComponent<any> = () => {
  const {
    product,
    nameProps: {
      showFieldsProps,
      containerClass,
      brandNameClass
    }
  } = useContext(ProductSummaryContext)
  const productName = path(['productName'], product)
  const skuName = path(['sku', 'name'], product)
  const brandName = path(['brand'], product)

  return (
    <div className={containerClass}>
      <ProductName
        className="overflow-hidden c-on-base"
        brandNameClass={brandNameClass}
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
  /** Name schema props */
  showFieldsProps: PropTypes.object,
  /** Styles used in the container div */
  containerClass: PropTypes.string,
  /** Styles used in the brand name */
  brandNameClass: PropTypes.string,
}

export default ProductSummaryName
