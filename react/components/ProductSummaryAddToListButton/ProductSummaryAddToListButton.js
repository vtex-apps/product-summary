import React, { useMemo, useContext } from 'react'
import { ExtensionPoint } from 'vtex.render-runtime'
import { path } from 'ramda'
import ProductSummaryContext from '../ProductSummaryContext'
import productSummary from '../../productSummary.css'

const getSkuId = path(['sku', 'itemId'])
const getProductId = path(['productId'])

// This avoids triggering the link to the product page
const captureClick = e => {
  e.preventDefault()
  e.stopPropagation()
}

function ProductSummaryAddToListButton({ product }) {
  const productContext = useContext(ProductSummaryContext)

  const skuId = getSkuId(productContext.product)
  const productId = getProductId(productContext.product)

  const productProp = useMemo(() => ({
    skuId, productId, quantity: 1
  }), [skuId, productId])

  return (
    <div className={`${productSummary.addToListBtn} absolute z-1`} onClick={captureClick}>
      <ExtensionPoint id="addon-summary-btn" product={productProp} />
    </div>
  )
}

export default ProductSummaryAddToListButton