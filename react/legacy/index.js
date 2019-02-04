import PropTypes from 'prop-types'
import React, { Component, Fragment } from 'react'
import { ExtensionPoint, withRuntimeContext } from 'vtex.render-runtime'
import {
  ProductName,
  ProductPrice,
} from 'vtex.store-components'

import ProductSummaryNormal from './components/ProductSummaryNormal'
import ProductSummarySmall from './components/ProductSummarySmall'
import ProductSummaryInline from './components/ProductSummaryInline'
import ProductSummaryInlinePrice from './components/ProductSummaryInlinePrice'
import displayButtonTypes, {
  getDisplayButtonNames,
  getDisplayButtonValues,
} from '../utils/displayButtonTypes'
import { productShape } from '../utils/propTypes'

const DISPLAY_MODE_MAP = {
  normal: ProductSummaryNormal,
  small: ProductSummarySmall,
  inline: ProductSummaryInline,
  inlinePrice: ProductSummaryInlinePrice,
}

/**
 * Product Summary component. Summarizes the product information.
 */
class ProductSummary extends Component {
  static propTypes = {
    /** Product that owns the informations */
    product: productShape,
    /** Shows the product list price */
    showListPrice: PropTypes.bool,
    /** Should redirect to checkout after clicking on buy */
    isOneClickBuy: PropTypes.bool,
    /** Set pricing labels' visibility */
    showLabels: PropTypes.bool,
    /** Set installments' visibility */
    showInstallments: PropTypes.bool,
    /** Set the borders product's visibility */
    showBorders: PropTypes.bool,
    /** Set the discount badge's visibility */
    showBadge: PropTypes.bool,
    /** Set the product description visibility */
    showDescription: PropTypes.bool,
    /** Text of selling Price's label */
    labelSellingPrice: PropTypes.string,
    /** Text shown on badge */
    badgeText: PropTypes.string,
    /** Custom buy button text */
    buyButtonText: PropTypes.string,
    /** Defines the display mode of buy button */
    displayBuyButton: PropTypes.oneOf(getDisplayButtonValues()),
    /** Hides the buy button completely . If active, the button will not be shown in any condition */
    hideBuyButton: PropTypes.bool,
    /** Defines if the collection badges are shown */
    showCollections: PropTypes.bool,
    /** Name schema props */
    name: PropTypes.object,
    /** Runtime context */
    runtime: PropTypes.shape({
      hints: PropTypes.shape({
        /** Indicates if is on a mobile device */
        mobile: PropTypes.bool,
      }),
    }),
    /** Display mode of the summary used in the search result */
    displayMode: PropTypes.oneOf(['normal', 'small', 'inline', 'inlinePrice']),
    /** Function that is executed when a product is clicked */
    actionOnClick: PropTypes.func,
  }

  static defaultProps = {
    showListPrice: true,
    showInstallments: true,
    showLabels: true,
    showBadge: true,
    showCollections: false,
    showDescription: false,
    displayBuyButton: displayButtonTypes.DISPLAY_ALWAYS.value,
    isOneClickBuy: false,
    name: {
      showProductReference: false,
      showBrandName: false,
      showSku: false,
    },
    displayMode: 'normal',
    showBorders: false,
  }

  state = {
    isHovering: false,
    isUpdatingItems: false,
  }

  handleMouseLeave = () => {
    this.setState({ isHovering: false })
  }

  handleMouseEnter = () => {
    this.setState({ isHovering: true })
  }

  handleItemsStateUpdate = isLoading =>
    this.setState({ isUpdatingItems: isLoading })

  render() {
    const {
      product,
      actionOnClick,
      displayMode,
      displayBuyButton,
      isOneClickBuy,
      buyButtonText,
      showBorders,
      showDescription,
      runtime,
      showBadge,
      badgeText,
      showCollections,
      showListPrice,
      showLabels,
      showInstallments,
      labelSellingPrice,
      name: showFieldsProps,
    } = this.props

    const imageProps = {
      product,
      showBadge,
      badgeText,
      showCollections,
      displayMode,
    }
    const nameProps = { product, showFieldsProps }

    const priceProps = {
      product,
      showListPrice,
      showLabels,
      showInstallments,
      labelSellingPrice,
      isLoading: this.state.isUpdatingItems,
    }

    const buyButtonProps = {
      product,
      displayBuyButton,
      isOneClickBuy,
      buyButtonText,
      runtime,
      isHovering: this.state.isHovering,
    }

    const ProductSummaryComponent =
      DISPLAY_MODE_MAP[displayMode] || ProductSummaryNormal
    return (
      <Fragment>
        <ExtensionPoint id="my-list"/>
      <ProductSummaryComponent
        product={product}
        showBorders={showBorders}
        showDescription={showDescription}
        handleMouseEnter={this.handleMouseEnter}
        handleMouseLeave={this.handleMouseLeave}
        handleItemsStateUpdate={this.handleItemsStateUpdate}
        actionOnClick={actionOnClick}
        imageProps={imageProps}
        nameProps={nameProps}
        priceProps={priceProps}
        buyButtonProps={buyButtonProps}
      />
      </Fragment>
    )
  }
}

const defaultSchema = {
  title: 'editor.productSummary.title',
  description: 'editor.productSummary.description',
  type: 'object',
  properties: {
    isOneClickBuy: {
      type: 'boolean',
      title: 'editor.productSummary.isOneClickBuy.title',
      default: false,
      isLayout: true,
    },
    showBadge: {
      type: 'boolean',
      title: 'editor.productSummary.showBadge.title',
      default: true,
      isLayout: true,
    },
    badgeText: {
      type: 'string',
      title: 'editor.productSummary.badgeText.title',
      isLayout: false,
    },
    buyButtonText: {
      type: 'string',
      title: 'editor.productSummary.buyButtonText.title',
      isLayout: false,
    },
    displayBuyButton: {
      title: 'editor.productSummary.displayBuyButton.title',
      type: 'string',
      enum: getDisplayButtonValues(),
      enumNames: getDisplayButtonNames(),
      default: displayButtonTypes.DISPLAY_ALWAYS.value,
      isLayout: true,
    },
    showCollections: {
      type: 'boolean',
      title: 'editor.productSummary.showCollections.title',
      default: false,
      isLayout: true,
    },
    ...ProductPrice.schema.properties,
  },
}

ProductSummary.getSchema = () => {
  const nameSchema = ProductName.schema
  return {
    ...defaultSchema,
    properties: {
      ...defaultSchema.properties,
      name: nameSchema,
    },
  }
}

export default withRuntimeContext(ProductSummary)
