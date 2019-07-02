import React from 'react'
import { path } from 'ramda'
import classNames from 'classnames'
import { Link } from 'vtex.render-runtime'

import AttachmentList from './AttachmentList'
import ProductImage from './ProductImage'
import ProductQuantityStepper from './ProductQuantityStepper'
import ProductSummaryPrice from './ProductSummaryPrice'
import ProductSummaryName from './ProductSummaryName'

import productSummary from '../../productSummary.css'

const ProductSummaryInline = ({
  product,
  showBorders,
  handleMouseEnter,
  handleMouseLeave,
  handleItemsStateUpdate,
  actionOnClick,
  imageProps,
  nameProps,
  priceProps,
  showQuantitySelector,
  priceAlignLeft,
}) => {
  const containerClasses = classNames(
    productSummary.container,
    productSummary.containerInline,
    'overflow-hidden br3 h-100 w-100'
  )

  const summaryClasses = classNames(
    `${productSummary.element} pointer ph2 pt3 pb4 flex flex-column h-100`,
    {
      'bb b--muted-4 mh2 mh3-ns mt2': showBorders,
    }
  )

  const nameClasses = {
    containerClass: 'flex items-start justify-left tl w-90 t-mini pb2',
    brandNameClass: 't-body c-on-base',
  }

  const priceClasses = {
    containerClass: classNames('flex flex-column nr1 h1', {
      'items-start': priceAlignLeft,
      'items-end': !priceAlignLeft,
      [`${productSummary.priceContainer} pv5`]: !showBorders,
    }),
    sellingPriceClass: 'dib ph2 t-body t-heading-5-ns',
  }

  return (
    <section
      className={containerClasses}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <article className={summaryClasses}>
        <Link
          className={`${productSummary.clearLink} flex h-100`}
          page={'store.product'}
          params={{ 
            slug: product && product.linkText,
            id: product && product.productId,
          }}
          onClick={actionOnClick}
        >
          <div className={`${productSummary.imageContainer} db h-100`}>
            <ProductImage {...imageProps} />
          </div>
          <div className={`${productSummary.information} w-70 pb2 pl3 pr3`}>
            <ProductSummaryName {...nameProps} {...nameClasses} />
            <AttachmentList product={product} />
            <div className="mt3 nr2">
              <div
                className={`flex justify-end nr4 mb2 ${
                  productSummary.quantityStepperContainer
                }`}
              >
                {showQuantitySelector && (
                  <ProductQuantityStepper
                    product={product}
                    onUpdateItemsState={handleItemsStateUpdate}
                  />
                )}
              </div>
              <ProductSummaryPrice {...priceProps} {...priceClasses} />
            </div>
          </div>
        </Link>
      </article>
    </section>
  )
}

export default ProductSummaryInline
