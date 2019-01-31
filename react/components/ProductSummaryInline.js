import React, { Component } from 'react'
import { path } from 'ramda'
import classNames from 'classnames'
import { Link } from 'vtex.render-runtime'

import AttachmentList from './AttachmentList'
import ImageLoader from './ImageLoader'
import ProductImage from './ProductImage'
import ProductSummaryBuyButton from './ProductSummaryBuyButton'
import ProductQuantityStepper from './ProductQuantityStepper'
import ProductSummaryPrice from './ProductSummaryPrice'
import ProductSummaryName from './ProductSummaryName'

import productSummary from '../productSummary.css'

class ProductSummaryInline extends Component {
  render() {
    const {
      product,
      showBorders,
      handleMouseEnter,
      handleMouseLeave,
      handleItemsStateUpdate,
      actionOnClick,
      imageProps,
      nameProps,
      priceProps,
      buyButtonProps,
    } = this.props

    const classes = classNames(
      productSummary.container,
      productSummary.containerInline,
      'overflow-hidden br3 h-100 w-100'
    )

    const elementClasses = classNames(`${productSummary.element} pointer ph2 pt3 pb4 flex flex-column`, {
      'bb b--muted-4 mh2 mt2': showBorders,
    })

    return (
      <section
        className={classes}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <article className={elementClasses}>
          <Link
            className={`${productSummary.clearLink} flex`}
            page={'store.product'}
            params={{ slug: path(['linkText'], product) }}
            onClick={actionOnClick}
          >
            <div className={`${productSummary.imageContainer} db w-40`}>
              {path(['sku', 'image', 'imageUrl'], product)
                ? <ProductImage {...imageProps} />
                : <ImageLoader />}
            </div>
            <div className={`${productSummary.information} w-80 pb2 pl3 pr3 flex flex-column justify-between`}>
              <ProductSummaryName {...nameProps} />
              <AttachmentList product={product} />
              <div className="flex justify-between items-baseline">
                <ProductQuantityStepper
                  product={product}
                  onUpdateItemsState={handleItemsStateUpdate}
                />
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

export default ProductSummaryInline
