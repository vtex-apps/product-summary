import React from 'react'
import { ProductBrand } from 'vtex.store-components'
import { ProductSummaryContext } from 'vtex.product-summary-context'

const { useProductSummary } = ProductSummaryContext

interface Props {
  /** Whether it should be displayed as a logo or as a text */
  displayMode?: 'logo' | 'text'
  /** Whether it should display the name of the brand if there is no logo */
  fallbackToText?: boolean
  /** List of brands that should be hidden, if any */
  excludeBrands?: Array<string | number>
  /** Height of the logo */
  height?: number
  /** If the logo should have a link */
  logoWithLink?: boolean
}

/**
 * @deprecated Please use ProductBrand from vtex.store-components instead.
 */
const ProductSummaryBrand = ({
  displayMode,
  fallbackToText,
  height,
  excludeBrands,
  logoWithLink = false,
}: Props) => {
  const { product } = useProductSummary()

  return (
    <ProductBrand
      displayMode={displayMode}
      fallbackToText={fallbackToText}
      height={height}
      excludeBrands={excludeBrands}
      logoWithLink={logoWithLink}
      brandName={product.brand}
      brandId={product.brandId}
    />
  )
}

export default ProductSummaryBrand
