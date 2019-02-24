import React, { memo } from 'react'
import { string, number } from 'prop-types'
import ProductPrice from 'vtex.store-components/ProductPrice'

const AttachmentItem = ({
  productText,
  price
}) => {
  return (
    <div className="flex items-center justify-between pv1" key={productText}>
      <span className="t-small c-muted-2 tl pr3">{productText}</span>
      {price != null && (
        <ProductPrice
          sellingPrice={price}
          sellingPriceContainerClass="c-on-base"
          sellingPriceLabelClass="dib"
          sellingPriceClass="dib t-small c-muted-2"
          showListPrice={false}
          showLabels={false}
          showInstallments={false}
        />
      )}
    </div>
  )
}

AttachmentItem.propTypes = {
  productText: string.isRequired,
  price: number,
}

export default memo(AttachmentItem)
