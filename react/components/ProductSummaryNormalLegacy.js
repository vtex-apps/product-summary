import React, { Component } from 'react'
import { path } from 'ramda'
import classNames from 'classnames'
import { Link } from 'vtex.render-runtime'

import AttachmentList from './AttachmentList'
import ProductImage from './ProductImage'
import ProductSummaryBuyButton from './ProductSummaryBuyButton'
import ProductSummaryPrice from './ProductSummaryPrice'
import ProductSummaryName from './ProductSummaryName'
import ProductSummaryDescription from './ProductSummaryDescription'

import productSummary from '../productSummary.css'

class ProductSummaryNormal extends Component {
  render() {
    const {
      product,
      showBorders,
      showDescription,
      handleMouseEnter,
      handleMouseLeave,
      actionOnClick
    } = this.props

    const containerClasses = classNames(
      productSummary.container,
      productSummary.containerNormal,
      'overflow-hidden br3 h-100 w-100 flex flex-column justify-between center tc'
    )

    const summaryClasses = classNames(
      `${productSummary.element} pointer pt3 pb4 flex flex-column h-100`,
      {
        'bb b--muted-4 mh2 mt2': showBorders,
      }
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

    const descriptionClasses = `${productSummary.description} c-muted-2 t-small`

    return (
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
          <article className={summaryClasses}>
            <ProductImage />
            <div
              className={`${
                productSummary.information
              } h-100 flex flex-column justify-between`}
            >
              <ProductSummaryName {...nameClasses} />
              <AttachmentList product={product} />
              {showDescription && (
                <ProductSummaryDescription
                  description={product.description}
                  descriptionClasses={descriptionClasses}
                />
              )}
              <div>
                <ProductSummaryPrice {...priceClasses} />
              </div>
            </div>
          </article>
          <ProductSummaryBuyButton {...buyButtonClasses} />
        </Link>
      </section>
    )
  }
}

export default ProductSummaryNormal
