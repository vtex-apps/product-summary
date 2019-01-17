import React from 'react'
import { path } from 'ramda'
import classNames from 'classnames'
import ProductName from 'vtex.store-components/ProductName'

import productSummary from '../productSummary.css'

const ProductSummaryName = ({ displayMode, product, name }) => {
  const containerClasses = classNames(
    'flex items-start',
    {
      [`${productSummary.nameContainer} justify-center`]: displayMode !== 'inline',
      'justify-left w-100 pv5': displayMode === 'inline',
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
        tag="h2"
        {...name}
      />
    </div>
  )
}

export default ProductSummaryName

