import React from 'react'
import classNames from 'classnames'
// eslint-disable-next-line no-restricted-imports
import { pluck, path, flatten } from 'ramda'
import { ProductPrice } from 'vtex.store-components'
import { ProductSummaryContext } from 'vtex.product-summary-context'
import type { ProductSummaryTypes } from 'vtex.product-summary-context'
import { useCssHandles } from 'vtex.css-handles'
import type { CssHandlesTypes } from 'vtex.css-handles'

import styles from './productSummary.css'

const { useProductSummary } = ProductSummaryContext

const CSS_HANDLES = [
  'priceContainer',
  'productPriceClass',
  'listPriceContainer',
  'listPriceLabel',
  'listPrice',
  'sellingPriceContainer',
  'sellingPriceLabel',
  'sellingPrice',
  'savingsContainer',
  'savings',
  'interestRate',
  'installmentContainer',
  'listPriceRange',
  'sellingPriceRange',
  'priceLoading',
] as const

function getPrices(
  product: ProductSummaryTypes.Product,
  attribute: 'sellingPrice' | 'listPrice'
) {
  if (!product || (!product.items && !product.priceRange)) {
    return []
  }

  if (product.priceRange) {
    const values = product.priceRange[attribute]

    return values ? [values.lowPrice, values.highPrice] : []
  }

  // No priceRange resolver provided, use sku information
  const sellers = flatten(pluck('sellers', product.items))
  const offerAttribute = attribute === 'sellingPrice' ? 'Price' : 'ListPrice'
  const prices = sellers.map(path(['commertialOffer', offerAttribute]))
  const availableProductsPrices = prices.filter((price) => price !== 0)

  return availableProductsPrices
}

interface Props {
  /**
   * Set the product selling price range visibility
   * @default false
   */
  showSellingPriceRange?: boolean
  /**
   * Set the product list price's visibility
   * @default true
   */
  showListPrice?: boolean
  /**
   * Set the product list price range visibility
   * @default false
   */
  showListPriceRange?: boolean
  /**
   * Set pricing labels' visibility
   * @default true
   */
  showLabels?: boolean
  /**
   * Set installments' visibility
   * @default true
   */
  showInstallments?: boolean
  /**
   * Set savings' visibility
   * @default false
   */
  showDiscountValue?: boolean
  /**
   * Text of selling Price's label
   * @default ""
   */
  labelSellingPrice?: string
  /**
   * Text of list Price's label
   * @default ""
   */
  labelListPrice?: string
  /**
   * Whether should show borders
   * @default false
   */
  showBorders?: boolean
  classes: CssHandlesTypes.CustomClasses<typeof CSS_HANDLES>
}

/**
 * @deprecated Please use [vtex.product-price](https://github.com/vtex-apps/product-price) instead.
 */
function ProductSummaryPrice({
  showListPrice = true,
  showSellingPriceRange = false,
  showLabels = true,
  showInstallments = true,
  showDiscountValue = false,
  labelSellingPrice = '',
  labelListPrice = '',
  showBorders = false,
  showListPriceRange = false,
  classes,
}: Props) {
  const { product, isLoading, isPriceLoading } = useProductSummary()
  const { handles } = useCssHandles(CSS_HANDLES, { classes })

  // TODO: change ProductSummaryContext to have `selectedSku` field instead of `sku`
  const commertialOffer = product?.sku?.seller?.commertialOffer

  if (isLoading || isPriceLoading) {
    return (
      <div
        className={`${handles.priceLoading} flex items-end justify-end w-100 h1 pr6`}
      >
        <div className={styles.priceSpinner} />
      </div>
    )
  }

  const priceClasses = {
    containerClass: classNames('flex flex-column justify-end items-center', {
      [`${handles.priceContainer} pv5`]: !showBorders,
    }),
    sellingPriceClass: `${handles.sellingPrice} dib ph2 t-body t-heading-5-ns`,
  }

  const sellingPriceList = showSellingPriceRange
    ? getPrices(product, 'sellingPrice')
    : []

  const listPriceList = showListPriceRange
    ? getPrices(product, 'listPrice')
    : []

  const sellingPrice = commertialOffer.Price

  return (
    <div className={priceClasses.containerClass}>
      {sellingPrice !== 0 && (
        <ProductPrice
          className={`${handles.productPriceClass} flex flex-column justify-start`}
          listPriceContainerClass={`${handles.listPriceContainer} pv1 normal c-muted-2`}
          listPriceLabelClass={`${handles.listPriceLabel} dib strike t-small t-mini`}
          listPriceClass={`${handles.listPrice} dib ph2 strike t-small-ns t-mini`}
          sellingPriceContainerClass={`${handles.sellingPriceContainer} pt1 pb3 c-on-base`}
          sellingPriceLabelClass={`${handles.sellingPriceLabel} dib`}
          sellingPriceClass={priceClasses.sellingPriceClass}
          savingsContainerClass={`${handles.savingsContainer} t-small-ns c-muted-2`}
          savingsClass={`${handles.savings} dib`}
          interestRateClass={`${handles.interestRate} dib pl2`}
          installmentContainerClass={`${handles.installmentContainer} t-small-ns c-muted-2`}
          listPrice={commertialOffer.ListPrice}
          sellingPriceList={sellingPriceList}
          listPriceRangeClass={`${handles.listPriceRange} dib ph2 t-small-ns strike`}
          sellingPriceRangeClass={`${handles.sellingPriceRange} dib ph2 t-small-ns`}
          sellingPrice={commertialOffer.Price}
          installments={commertialOffer.Installments}
          showListPrice={showListPrice}
          showSellingPriceRange={showSellingPriceRange}
          showLabels={showLabels}
          showInstallments={showInstallments}
          labelSellingPrice={labelSellingPrice}
          labelListPrice={labelListPrice}
          listPriceList={listPriceList}
          showListPriceRange={showListPriceRange}
          showSavings={showDiscountValue}
        />
      )}
    </div>
  )
}

ProductSummaryPrice.schema = {
  title: 'admin/editor.productSummaryPrice.title',
  description: 'admin/editor.productSummaryPrice.description',
  type: 'object',
  properties: {
    showListPrice: {
      type: 'boolean',
      title: 'admin/editor.productSummaryPrice.showListPrice.title',
      default: true,
      isLayout: true,
    },
    showSellingPriceRange: {
      type: 'boolean',
      title: 'admin/editor.productSummaryPrice.showSellingPriceRange.title',
      default: false,
      isLayout: true,
    },
    showListPriceRange: {
      type: 'boolean',
      title: 'admin/editor.productSummaryPrice.showListPriceRange.title',
      default: false,
      isLayout: true,
    },
    showInstallments: {
      type: 'boolean',
      title: 'admin/editor.productSummaryPrice.showInstallments.title',
      default: true,
      isLayout: true,
    },
    showDiscountValue: {
      type: 'boolean',
      title: 'admin/editor.productSummaryPrice.showDiscountValue.title',
      default: false,
    },
    showLabels: {
      type: 'boolean',
      title: 'admin/editor.productSummaryPrice.showLabels.title',
      default: true,
      isLayout: true,
    },
    showBorders: {
      type: 'boolean',
      title: 'admin/editor.productSummaryPrice.showBorders.title',
      default: false,
      isLayout: true,
    },
  },
}

export default ProductSummaryPrice
