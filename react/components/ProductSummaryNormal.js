import React, { Component } from 'react'
import { path } from 'ramda'
import classNames from 'classnames'
import { Link } from 'vtex.render-runtime'

import AttachmentList from './AttachmentList'
import ImageLoader from './ImageLoader'
import ProductImage from './ProductImage'
import ProductSummaryBuyButton from './ProductSummaryBuyButton'
import ProductSummaryPrice from './ProductSummaryPrice'
import ProductSummaryName from './ProductSummaryName'

import productSummary from '../productSummary.css'

class ProductSummaryNormal extends Component {
  render() {
    const {
      product,
      showBorders,
      handleMouseEnter,
      handleMouseLeave,
      actionOnClick,
      imageProps,
      nameProps,
      priceProps,
      buyButtonProps,
    } = this.props

    const classes = classNames(
      productSummary.container,
      productSummary.containerNormal,
      'overflow-hidden br3 h-100 flex flex-column justify-between center tc'
    )

    const elementClasses = classNames(`${productSummary.element} pointer ph2 pt3 pb4 flex flex-column`, {
      'bb b--muted-4 mh2 mt2': showBorders,
    })

    const nameClasses = {
      containerClass: `flex items-start ${productSummary.nameContainer} justify-center pv6`,
      brandNameClass: 't-body',
    }

    return (
      <section
        className={classes}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <article className={elementClasses}>
          <Link
            className={`${productSummary.clearLink} flex flex-column`}
            page={'store.product'}
            params={{ slug: path(['linkText'], product) }}
            onClick={actionOnClick}
          >
            <div className={`${productSummary.imageContainer} db w-100 center`}>
              {path(['sku', 'image', 'imageUrl'], product)
                ? <ProductImage {...imageProps} />
                : <ImageLoader />}
            </div>
            <div className={productSummary.information}>
              <ProductSummaryName {...nameProps} {...nameClasses} />
              <AttachmentList product={product} />
              <div>
                <ProductSummaryPrice {...priceProps} />
              </div>
            </div>
          </Link>
          <ProductSummaryBuyButton {...buyButtonProps} />
        </article>
      </section>
    )
  }
}

export default ProductSummaryNormal
