import React, { Component } from 'react'
import { path } from 'ramda'
import classNames from 'classnames'
import { Link } from 'vtex.render-runtime'
import { ProductName, ProductPrice } from 'vtex.store-components'
import ProductSummaryContext from './ProductSummaryContext'
import productSummary from '../productSummary.css'
import { productShape } from '../utils/propTypes'

class ProductSummaryCustom extends Component {
  static propTypes = {
    /** Product that owns the informations */
    product: productShape,
    /** Function that is executed when a product is clicked */
    actionOnClick: PropTypes.func,
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
      children,
      product,
      actionOnClick
    } = this.props

    const contextProps = {
      product,
      isLoading: this.state.isUpdatingItems,
      isHovering: this.state.isHovering,
      handleItemsStateUpdate: this.handleItemsStateUpdate,
    }

    const containerClasses = classNames(
      productSummary.container,
      productSummary.containerNormal,
      'overflow-hidden br3 h-100 w-100 flex flex-column justify-between center tc'
    )

    const summaryClasses = classNames(
      `${productSummary.element} pointer pt3 pb4 flex flex-column h-100`
    )

    return (
      <ProductSummaryContext.Provider value={contextProps}>
        <section
          className={containerClasses}
          onMouseEnter={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}
        >
          <Link
            className={`${productSummary.clearLink} h-100 flex flex-column`}
            page={'store.product'}
            params={{ slug: path(['linkText'], product) }}
            onClick={actionOnClick}
          >
            <article className={summaryClasses}>
              {children}
            </article>
          </Link>
        </section>
      </ProductSummaryContext.Provider>
    )
  }
}

ProductSummaryCustom.getSchema = () => {
  return {
    title: 'editor.productSummary.title',
    description: 'editor.productSummary.description',
  }
}

export default ProductSummaryCustom
