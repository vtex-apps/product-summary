import React from 'react'
import PropTypes from 'prop-types'
import BuyButton from 'vtex.store-components/BuyButton'
import { withRuntimeContext } from 'vtex.render-runtime'
import { equals, path } from 'ramda'
import classNames from 'classnames'
import { IOMessage } from 'vtex.native-types'

import { useProductSummary } from 'vtex.product-summary-context/ProductSummaryContext'
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
  isHovering,
}) => {
  const { product } = useProductSummary()

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

  // TODO: change ProductSummaryContext to have `selectedSku` field instead of `sku`
  const selectedItem = product.sku
  const selectedSeller = path(['seller'], selectedItem)
  const isAvailable =
    selectedSeller &&
    selectedSeller.commertialOffer &&
    selectedSeller.commertialOffer.AvailableQuantity > 0
  const skuItems = BuyButton.mapCatalogItemToCart({
    product,
    selectedItem,
    selectedSeller,
    selectedQuantity: 1,
  })

  return (
    showBuyButton && (
      <div className={containerClass}>
        <div className={buyButtonClasses}>
          <BuyButton
            available={isAvailable}
            skuItems={skuItems}
            isOneClickBuy={isOneClickBuy}
          >
            <IOMessage id={buyButtonText} />
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
  isOneClickBuy: false,
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
    },
  }
}

export default withRuntimeContext(ProductSummaryBuyButton)
