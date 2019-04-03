import React from 'react'
import { useChildBlock__unstable } from 'vtex.render-runtime'
import ProductSummaryNormalCustom from './ProductSummaryNormalCustom'
import ProductSummaryNormalLegacy from './ProductSummaryNormalLegacy'
import {
  ProductSummaryNameContext,
  ProductSummaryPriceContext,
  ProductSummaryBuyButtonContext
} from './ProductSummaryContext'

import productSummary from '../productSummary.css'

const ProductSummaryNormal = props => {
  const {
    product,
    showBorders,
    showDescription,
    handleMouseEnter,
    handleMouseLeave,
    actionOnClick
  } = props

  const containerClasses = classNames(
    productSummary.container,
    productSummary.containerNormal,
    'overflow-hidden br3 h-100 w-100 flex flex-column justify-between center tc'
  )

  const nameClasses = {
    containerClass: `flex items-start ${
      productSummary.nameContainer
    } justify-center pv6`,
    brandNameClass: 't-body',
  }

  const priceClasses = {
    containerClass: classNames('flex flex-column justify-end items-center', {
      [`${productSummary.priceContainer} pv5`]: !showBorders,
    }),
    sellingPriceClass: 'dib ph2 t-body t-heading-5-ns',
  }

  const buyButtonClasses = {
    containerClass: `${productSummary.buyButtonContainer} pv3 w-100 db`,
  }

  const hasCustomProductSummary = !!useChildBlock__unstable({ id: 'unstable--product-summary-layout' })

  return (
    <ProductSummaryNameContext.Provider value={nameClasses}>
      <ProductSummaryPriceContext.Provider value={priceClasses}>
        <ProductSummaryBuyButtonContext.Provider value={buyButtonClasses}>
          <section
            className={containerClasses}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <Link
              className={`${productSummary.clearLink} h-100 flex flex-column`}
              page={'store.product'}
              params={{ slug: path(['linkText'], product) }}
              onClick={actionOnClick}
            >
              {hasCustomProductSummary
                ? <ProductSummaryNormalCustom {...props} />
                : <ProductSummaryNormalLegacy {...props} />
              }
            </Link>
          </section>
        </ProductSummaryBuyButtonContext.Provider>
      </ProductSummaryPriceContext.Provider>
    </ProductSummaryNameContext.Provider>
  )
}

ProductSummaryNormal.schema = {
  title: 'editor.product-summary.title',
  description: 'editor.product-summary.description',
}

export default ProductSummaryNormal
