import React, { useCallback, useMemo, useEffect } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { Link } from 'vtex.render-runtime'
import ProductSummaryContext from './ProductSummaryContext'
import {
  ProductSummaryProvider,
  useProductSummaryDispatch,
  useProductSummary,
} from 'vtex.product-summary-context/ProductSummaryContext'
import productSummary from '../productSummary.css'
import { productShape } from '../utils/propTypes'
import { mapCatalogProductToProductSummary } from '../utils/normalize'

const PRODUCT_SUMMARY_MAX_WIDTH = 300

const ProductSummaryCustom = ({ product, actionOnClick, children }) => {
  const { isLoading, isHovering } = useProductSummary()
  const dispatch = useProductSummaryDispatch()

  useEffect(() => {
    if (product) {
      dispatch({
        type: 'SET_PRODUCT',
        args: { product },
      })
    }
  }, [product, dispatch])

  const handleMouseLeave = useCallback(() => {
    dispatch({
      type: 'SET_HOVER',
      args: { isHovering: false },
    })
  }, [dispatch])

  const handleMouseEnter = useCallback(() => {
    dispatch({
      type: 'SET_HOVER',
      args: { isHovering: true },
    })
  }, [dispatch])

  const handleItemsStateUpdate = useCallback(
    isLoading => {
      dispatch({
        type: 'SET_LOADING',
        args: { isLoading },
      })
    },
    [dispatch]
  )

  const oldContextProps = useMemo(
    () => ({
      product,
      isLoading,
      isHovering,
      handleItemsStateUpdate: handleItemsStateUpdate,
    }),
    [product, isLoading, isHovering, handleItemsStateUpdate]
  )

  const containerClasses = classNames(
    productSummary.container,
    productSummary.containerNormal,
    'overflow-hidden br3 h-100 w-100 flex flex-column justify-between center tc'
  )

  const summaryClasses = classNames(
    `${productSummary.element} pointer pt3 pb4 flex flex-column h-100`
  )

  return (
    <ProductSummaryContext.Provider value={oldContextProps}>
      <section
        className={containerClasses}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{ maxWidth: `${PRODUCT_SUMMARY_MAX_WIDTH}px` }}
      >
        <Link
          className={`${productSummary.clearLink} h-100 flex flex-column`}
          page="store.product"
          params={{
            slug: product && product.linkText,
            id: product && product.productId,
          }}
          onClick={actionOnClick}
        >
          <article className={summaryClasses}>{children}</article>
        </Link>
      </section>
    </ProductSummaryContext.Provider>
  )
}

ProductSummaryCustom.propTypes = {
  /** Product that owns the informations */
  product: productShape,
  /** Function that is executed when a product is clicked */
  actionOnClick: PropTypes.func,
  children: PropTypes.node,
}

function ProductSummaryWrapper(props) {
  return (
    <ProductSummaryProvider {...props}>
      <ProductSummaryCustom {...props} />
    </ProductSummaryProvider>
  )
}

ProductSummaryWrapper.getSchema = () => {
  return {
    title: 'admin/editor.productSummary.title',
    description: 'admin/editor.productSummary.description',
  }
}

// This function is public available to be used only by vtex.shelf and vtex.search-result.
// We do not garantee this API will not change and might happen breaking change anytime.
ProductSummaryWrapper.mapCatalogProductToProductSummary = mapCatalogProductToProductSummary

export default ProductSummaryWrapper
