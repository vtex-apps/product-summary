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

class ProductSummaryNormalLegacy extends Component {
  render() {
    const summaryClasses = classNames(
      `${productSummary.element} pointer pt3 pb4 flex flex-column h-100`,
      {
        'bb b--muted-4 mh2 mt2': this.props.showBorders,
      }
    )

    return (
      <React.Fragment>
        <article className={summaryClasses}>
          <ProductImage />
          <div
            className={`${
              productSummary.information
            } h-100 flex flex-column justify-between`}
          >
            <ProductSummaryName />
            <AttachmentList />
            <ProductSummaryDescription />
            <div>
              <ProductSummaryPrice />
            </div>
          </div>
        </article>
        <ProductSummaryBuyButton />
      </React.Fragment>
    )
  }
}

export default ProductSummaryNormalLegacy
