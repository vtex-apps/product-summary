import React from 'react'
import PropTypes from 'prop-types'
import BuyButton from 'vtex.store-components/BuyButton'
import { withRuntimeContext } from 'vtex.render-runtime'
import { equals, path } from 'ramda'
import classNames from 'classnames'
import { IOMessage } from 'vtex.native-types'
import { Button } from 'vtex.styleguide'
import { Link } from 'vtex.render-runtime'

import { useProductSummary } from 'vtex.product-summary-context/ProductSummaryContext'
import displayButtonTypes, {
  getDisplayButtonNames,
  getDisplayButtonValues,
} from '../../utils/displayButtonTypes'

import productSummary from '../../productSummary.css'

function checkSKUAvailability(seller) {
  return path(['commertialOffer', 'AvailableQuantity'], seller) > 0
}

function checkAvailableSKUsInSellers(item) {
  return item.sellers && item.sellers.filter(checkSKUAvailability).length > 0
}

function hasOnlyOneSKU(items) {
  return items.filter(checkAvailableSKUsInSellers).length === 1
}

const ProductSummaryBuyButton = ({
  displayBuyButton,
  isOneClickBuy,
  buyButtonText,
  customToastURL,
  runtime: {
    hints: { mobile },
  },
  isHovering,
}) => {
  const { product, selectedItem, selectedQuantity } = useProductSummary()

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

  const selectedSeller = path(['seller'], selectedItem)
  const isAvailable =
    selectedSeller &&
    selectedSeller.commertialOffer &&
    selectedSeller.commertialOffer.AvailableQuantity > 0
  const skuItems = BuyButton.mapCatalogItemToCart({
    product,
    selectedItem,
    selectedSeller,
    selectedQuantity,
  })

  const { items = [] } = product
  const shouldBeALink = hasOnlyOneSKU(items)

  return (
    showBuyButton && (
      <div className={containerClass}>
        <div className={buyButtonClasses}>
          {shouldBeALink ? (
            <Link
              className="dib"
              page="store.product"
              params={{
                slug: product && product.linkText,
                id: product && product.productId,
              }}
            >
              <Button>
                <IOMessage id={buyButtonText} />
              </Button>
            </Link>
          ) : (
            <BuyButton
              customToastURL={customToastURL}
              available={isAvailable}
              skuItems={skuItems}
              isOneClickBuy={isOneClickBuy}
            >
              <IOMessage id={buyButtonText} />
            </BuyButton>
          )}
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
  /** A custom URL for the `VIEW CART` button inside the toast created by BuyButton */
  customToastURL: PropTypes.string,
}

ProductSummaryBuyButton.defaultProps = {
  displayBuyButton: displayButtonTypes.DISPLAY_ALWAYS.value,
  isOneClickBuy: false,
}

ProductSummaryBuyButton.getSchema = () => {
  return {
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
}

export default withRuntimeContext(ProductSummaryBuyButton)
