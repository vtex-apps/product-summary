import React from 'react'
import { BuyButton } from 'vtex.store-components'
import { useRuntime } from 'vtex.render-runtime'
// eslint-disable-next-line no-restricted-imports
import { equals } from 'ramda'
import classnames from 'classnames'
import { IOMessage } from 'vtex.native-types'
import { ProductSummaryContext } from 'vtex.product-summary-context'
import { useCssHandles } from 'vtex.css-handles'

import displayButtonTypes, {
  getDisplayButtonNames,
  getDisplayButtonValues,
} from './utils/displayButtonTypes'
import productSummary from './productSummary.css'

const ALWAYS_ADD_TO_CART = 'alwaysAddToCart'
const DEFAULT_BUTTON_BEHAVIOR = 'default'

const CSS_HANDLES = ['buyButton', 'buyButtonContainer'] as const

interface Props {
  /** What the buy button should do when you click it, if you pass default it will add to cart only if there is only one SKU of that product */
  buyButtonBehavior?: 'default' | 'alwaysGoToProduct' | 'alwaysAddToCart'
  /** Should redirect to checkout after clicking on buy */
  isOneClickBuy?: boolean
  /** Custom buy button text */
  buyButtonText?: string
  /**
   * Defines the display mode of buy button
   * @default "displayButtonAlways"
   */
  displayBuyButton?:
    | 'displayButtonAlways'
    | 'displayButtonHover'
    | 'displayButtonNone'
  /** A custom URL for the `VIEW CART` button inside the toast created by BuyButton */
  customToastURL?: string
  isHovering?: boolean
}

/**
 * @deprecated This component is deprecated. Please migrate to vtex.add-to-cart-button and minicart.v2.
 */
function ProductSummaryBuyButton({
  displayBuyButton = 'displayButtonAlways',
  isOneClickBuy = false,
  buyButtonText,
  customToastURL,
  buyButtonBehavior = DEFAULT_BUTTON_BEHAVIOR,
  isHovering,
}: Props) {
  const {
    hints: { mobile },
  } = useRuntime()

  const { product, selectedItem, selectedQuantity } =
    ProductSummaryContext.useProductSummary() ?? {}

  const { handles } = useCssHandles(CSS_HANDLES)

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

  const buyButtonClasses = classnames(handles.buyButton, 'center mw-100', {
    [productSummary.isHidden]: !hoverBuyButton,
  })

  const containerClass = classnames(handles.buyButtonContainer, 'pv3 w-100 db')

  const selectedSeller = selectedItem?.seller
  const isAvailable =
    selectedSeller?.commertialOffer &&
    selectedSeller.commertialOffer.AvailableQuantity > 0

  const skuItems = BuyButton.mapCatalogItemToCart({
    product,
    selectedItem,
    selectedSeller,
    selectedQuantity,
  })

  const { items = [] } = product
  const shouldAddToCart =
    isAvailable &&
    (buyButtonBehavior === ALWAYS_ADD_TO_CART ||
      (buyButtonBehavior === DEFAULT_BUTTON_BEHAVIOR && items.length === 1))

  return (
    showBuyButton && (
      <div
        className={containerClass}
        data-testid="product-summary__buy-button-container"
      >
        <div className={buyButtonClasses}>
          <BuyButton
            skuItems={skuItems}
            available={isAvailable}
            isOneClickBuy={isOneClickBuy}
            customToastURL={customToastURL}
            shouldAddToCart={shouldAddToCart}
          >
            <IOMessage id={buyButtonText} />
          </BuyButton>
        </div>
      </div>
    )
  )
}

ProductSummaryBuyButton.schema = {
  title: 'admin/editor.productSummaryBuyButton.title',
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

export default ProductSummaryBuyButton
