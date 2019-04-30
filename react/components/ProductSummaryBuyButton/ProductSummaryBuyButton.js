import React, { useContext } from 'react'
import BuyButton from 'vtex.store-components/BuyButton'
import { withRuntimeContext } from 'vtex.render-runtime'
import { equals, path } from 'ramda'
import classNames from 'classnames'
import { FormattedMessage } from 'react-intl'

import ProductSummaryContext from '../ProductSummaryContext'
import displayButtonTypes, {
  getDisplayButtonNames,
  getDisplayButtonValues,
} from '../../utils/displayButtonTypes'
import productSummary from '../../productSummary.css'

const ProductSummaryBuyButton = ({
  displayBuyButton,
  isOneClickBuy,
  buyButtonText,
  runtime: {
    hints: { mobile },
  },
  isHovering
}) => {
  const { product } = useContext(ProductSummaryContext)

  const hoverBuyButton =
    equals(displayBuyButton, displayButtonTypes.DISPLAY_ALWAYS.value) ||
    !equals(displayBuyButton, displayButtonTypes.DISPLAY_ON_HOVER.value) ||
    (isHovering && !mobile)

  const showBuyButton =
    !equals(displayBuyButton, displayButtonTypes.DISPLAY_NONE.value) &&
    !(
      equals(displayBuyButton, displayButtonTypes.DISPLAY_ON_HOVER.value) &&
      mobile
    )

  const buyButtonClasses = classNames(
    `${productSummary.buyButton} center mw-100`,
    {
      [productSummary.isHidden]: !hoverBuyButton,
    }
  )

  const containerClass = `${productSummary.buyButtonContainer} pv3 w-100 db`

  const quantity =
    path(['sku', 'seller', 'commertialOffer', 'AvailableQuantity'], product) ||
    0
  const isAvailable = quantity > 0

  return (
    showBuyButton && (
      <div className={containerClass}>
        <div className={buyButtonClasses}>
          <BuyButton
            available={isAvailable}
            skuItems={
              path(['sku', 'itemId'], product) && [
                {
                  detailUrl: `/${product.linkText}/p`,
                  imageUrl: path(['sku', 'image', 'imageUrl'], product),
                  listPrice: path(
                    ['sku', 'seller', 'commertialOffer', 'ListPrice'],
                    product
                  ),
                  skuId: path(['sku', 'itemId'], product),
                  quantity: 1,
                  seller: path(['sku', 'seller', 'sellerId'], product),
                  name: product.productName,
                  price: path(
                    ['sku', 'seller', 'commertialOffer', 'Price'],
                    product
                  ),
                  variant: product.sku.name,
                  brand: product.brand,
                },
              ]
            }
            isOneClickBuy={isOneClickBuy}
          >
            {buyButtonText || <FormattedMessage id="store/button-label" />}
          </BuyButton>
        </div>
      </div>
    )
  )
}

ProductSummaryBuyButton.propTypes = {
  /** Runtime context */
  runtime: PropTypes.shape({
    hints: PropTypes.shape({
      /** Indicates if is on a mobile device */
      mobile: PropTypes.bool,
    }),
  }),
  /** Should redirect to checkout after clicking on buy */
  isOneClickBuy: PropTypes.bool,
  /** Custom buy button text */
  buyButtonText: PropTypes.string,
  /** Defines the display mode of buy button */
  displayBuyButton: PropTypes.oneOf(getDisplayButtonValues()),
}

ProductSummaryBuyButton.defaultProps = {
  displayBuyButton: displayButtonTypes.DISPLAY_ALWAYS.value,
  isOneClickBuy: false
}

ProductSummaryBuyButton.getSchema = () => {
  return {
    title: 'admin/editor.productSummary.title',
    description: 'admin/editor.productSummary.description',
    type: 'object',
    properties: {
      isOneClickBuy: {
        type: 'boolean',
        title: 'admin/editor.productSummary.isOneClickBuy.title',
        default: false,
        isLayout: true,
      },
      displayBuyButton: {
        title: 'admin/editor.productSummary.displayBuyButton.title',
        type: 'string',
        enum: getDisplayButtonValues(),
        enumNames: getDisplayButtonNames(),
        default: displayButtonTypes.DISPLAY_ALWAYS.value,
        isLayout: true,
      },
      buyButtonText: {
        type: 'string',
        title: 'admin/editor.productSummary.buyButtonText.title',
        isLayout: false,
      },
    },
  }
}

export default withRuntimeContext(ProductSummaryBuyButton)
