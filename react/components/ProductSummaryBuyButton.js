import React from 'react'
import classNames from 'classnames'
import BuyButton from 'vtex.store-components/BuyButton'
import { equals, path } from 'ramda'
import { FormattedMessage } from 'react-intl'

import displayButtonTypes from '../DisplayButtonTypes'
import productSummary from '../productSummary.css'

const ProductSummaryBuyButton = ({
  product,
  displayMode,
  displayBuyButton,
  isOneClickBuy,
  buyButtonText,
  runtime: { hints: { mobile } },
  isHovering,
}) => {
  if (equals(displayBuyButton, displayButtonTypes.DISPLAY_NONE.value)) {
    return null
  }

  const buyButtonClasses = classNames(
    `${productSummary.buyButtonContainer} pv3 w-100`,
    {
      'dn': displayMode === 'small' || displayMode === 'inline',
      'dn db-ns': displayMode === 'normal',
    }
  )

  const showBuyButton = !equals(displayBuyButton, displayButtonTypes.DISPLAY_ON_HOVER.value) || mobile || isHovering
  const quantity = path(['sku', 'seller', 'commertialOffer', 'AvailableQuantity'], product) || 0
  const isAvailable = (quantity > 0)

  return (
    <div className={buyButtonClasses}>
      <div className={`${productSummary.buyButton} center mw-100 ${!showBuyButton && 'isHidden'}`}>
        <BuyButton
          available={isAvailable}
          skuItems={
            path(['sku', 'itemId'], product) && [
              {
                skuId: path(['sku', 'itemId'], product),
                quantity: 1,
                seller: path(['sku', 'seller', 'sellerId'], product),
                name: product.productName,
                price: path(['sku', 'seller', 'commertialOffer', 'Price'], product),
                variant: product.sku.name,
                brand: product.branc,
              },
            ]
          }
          isOneClickBuy={isOneClickBuy}
        >
          {buyButtonText || <FormattedMessage id="button-label" />}
        </BuyButton>
      </div>
    </div>
  )
}

export default ProductSummaryBuyButton
