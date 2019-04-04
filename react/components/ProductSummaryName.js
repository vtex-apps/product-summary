import React, { FunctionComponent, useContext } from 'react'
import PropTypes from 'prop-types'
import { path } from 'ramda'
import { ProductName } from 'vtex.store-components'

import ProductSummaryContext from './ProductSummaryContext'
import { productShape } from './../utils/propTypes'
import productSummary from './../productSummary.css'

const ProductSummaryName : FunctionComponent<any> = ({
  showFieldsProps
}) => {
  const { product } = useContext(ProductSummaryContext)
  const productName = path(['productName'], product)
  const skuName = path(['sku', 'name'], product)
  const brandName = path(['brand'], product)

  const nameClasses = {
    containerClass: `flex items-start ${
      productSummary.nameContainer
    } justify-center pv6`,
    brandNameClass: 't-body',
  }

  return (
    <div className={nameClasses.containerClass}>
      <ProductName
        className="overflow-hidden c-on-base"
        brandNameClass={nameClasses.brandNameClass}
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

ProductSummaryName.defaultProps = {
  showFieldsProps: {
    showProductReference: false,
    showBrandName: false,
    showSku: false,
  },
}

ProductSummaryName.propTypes = {
  /** Name schema props */
  showFieldsProps: PropTypes.object,
}

ProductSummaryName.getSchema = () => {
  const nameSchema = ProductName.schema
  return {
    title: 'editor.productSummary.title',
    description: 'editor.productSummary.description',
    type: 'object',
    properties: {
      showFieldsProps: nameSchema,
    },
  }
}

export default ProductSummaryName
