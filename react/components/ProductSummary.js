import React, { Component } from 'react'
import { path } from 'ramda'
import classNames from 'classnames'
import { Link } from 'vtex.render-runtime'
import { ProductName, ProductPrice } from 'vtex.store-components'
import ProductSummaryContext from './ProductSummaryContext'
import productSummary from './../productSummary.css'
import { productShape } from './../utils/propTypes'

class ProductSummaryCustom extends Component {
  static propTypes = {
    /** Product that owns the informations */
    product: productShape,
    /** Function that is executed when a product is clicked */
    actionOnClick: PropTypes.func,
    /** Styles used in the link component */
    linkClasses: PropTypes.string,
  }

  static defaultProps = {
    linkClasses: 'h-100 flex flex-column',
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
      actionOnClick,
      linkClasses
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

    const linkComponentClasses = classNames(productSummary.clearLink, {
      [linkClasses]: !!linkClasses
    })

    return (
      <ProductSummaryContext.Provider value={contextProps}>
        <section
          className={containerClasses}
          onMouseEnter={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}
        >
          <Link
            className={linkComponentClasses}
            page={'store.product'}
            params={{ slug: path(['linkText'], product) }}
            onClick={actionOnClick}
          >
            {children}
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
    type: 'object',
    properties: {
      linkClasses: {
        type: 'string',
        title: 'editor.productSummary.linkClasses.title',
        isLayout: true,
      },
    }
  }
}

export default ProductSummaryCustom
