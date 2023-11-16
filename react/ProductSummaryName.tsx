import React from 'react'
import { ProductName } from 'vtex.store-components'
import { useCssHandles } from 'vtex.css-handles'
import type { CssHandlesTypes } from 'vtex.css-handles'
import { ProductSummaryContext } from 'vtex.product-summary-context'

const { useProductSummary } = ProductSummaryContext

const CSS_HANDLES = [
  'nameContainer',
  'nameWrapper',
  'brandName',
  'skuName',
  'productReference',
  'productNameLoader',
] as const

const defaultShowFields = {
  showProductReference: false,
  showBrandName: false,
  showSku: false,
}

interface Props {
  /**
   * Defines the visibility on certain properties.
   * @default { showProductReference: false, showBrandName: false, showSku: false }
   */
  showFieldsProps?: {
    showProductReference: boolean
    showBrandName: boolean
    showSku: boolean
  }
  /**
   * HTML tag used. It can be: `div`, `h1`, `h2`, `h3`.
   * @default "h3"
   */
  tag?: 'div' | 'h1' | 'h2' | 'h3'
  sponsoredBadgeLabel: string
  classes?: CssHandlesTypes.CustomClasses<typeof CSS_HANDLES>
}

function ProductSummaryName({
  showFieldsProps = defaultShowFields,
  sponsoredBadgeLabel,
  tag = 'h3',
  classes,
}: Props) {
  const { product } = useProductSummary()
  const { handles } = useCssHandles(CSS_HANDLES, { classes })
  const productName = product?.productName
  // TODO: change ProductSummaryContext to have `selectedSku` field instead of `sku`
  const skuName = product?.sku?.name
  const brandName = product?.brand

  const isSponsored = !!product?.advertisement?.adId

  const containerClasses = `${handles.nameContainer} flex items-start justify-center pv6`
  const wrapperClasses = `${handles.nameWrapper} overflow-hidden c-on-base f5`
  const brandNameClasses = `${handles.brandName} t-body`
  const skuNameClasses = `${handles.skuName} t-small`
  const loaderClasses = `${handles.productNameLoader} pt5 overflow-hidden`

  return (
    <div className={containerClasses}>
      <ProductName
        className={wrapperClasses}
        brandNameClass={brandNameClasses}
        skuNameClass={skuNameClasses}
        loaderClass={loaderClasses}
        showSponsoredBadge={isSponsored}
        sponsoredBadgeLabel={sponsoredBadgeLabel}
        productReferenceClass={handles.productReference}
        name={productName}
        skuName={skuName}
        brandName={brandName}
        tag={tag}
        {...showFieldsProps}
      />
    </div>
  )
}

ProductSummaryName.schema = {
  title: 'admin/editor.productSummaryName.title',
  type: 'object',
  properties: {
    showFieldsProps: ProductName.schema,
  },
}

export default ProductSummaryName
