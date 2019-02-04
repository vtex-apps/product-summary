import React from 'react'
import BuyButton from 'vtex.store-components/BuyButton'
import { equals, path } from 'ramda'
import classNames from 'classnames'
import { FormattedMessage } from 'react-intl'

import displayButtonTypes from '../utils/displayButtonTypes'
import productSummary from '../productSummary.css'

const ProductSummaryBuyButton = ({
  product,
  displayBuyButton,
  isOneClickBuy,
  buyButtonText,
  runtime: { hints: { mobile } },
  isHovering,
  containerClass,
}) => {

  const hoverBuyButton = equals(displayBuyButton, displayButtonTypes.DISPLAY_ALWAYS.value) ||
    !equals(displayBuyButton, displayButtonTypes.DISPLAY_ON_HOVER.value) ||
    (isHovering && !mobile)
    
  const showBuyButton = !equals(displayBuyButton, displayButtonTypes.DISPLAY_NONE.value) &&
    !(equals(displayBuyButton, displayButtonTypes.DISPLAY_ON_HOVER.value) && mobile)

  const buyButtonClasses = classNames(`${productSummary.buyButton} center mw-100`, {
    [productSummary.isHidden]: !hoverBuyButton,
  })

  const quantity = path(['sku', 'seller', 'commertialOffer', 'AvailableQuantity'], product) || 0
  const isAvailable = (quantity > 0)

  return (showBuyButton && 
    <div className={containerClass}>
      <div className={buyButtonClasses}>
        <BuyButton
          available={isAvailable}
          skuItems={
            path(['sku', 'itemId'], product) && [
              {
                /* Optimistic props */
                detailUrl: `/${product.linkText}/p`,
                imageUrl: path(['sku', 'image', 'imageUrl'], product),
                listPrice: path(['sku', 'seller', 'commertialOffer', 'ListPrice'], product),
                /* End Optimistic props */

                skuId: path(['sku', 'itemId'], product),
                quantity: 1,
                seller: path(['sku', 'seller', 'sellerId'], product),
                name: product.productName,
                price: path(['sku', 'seller', 'commertialOffer', 'Price'], product),
                variant: product.sku.name,
                brand: product.brand,
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
