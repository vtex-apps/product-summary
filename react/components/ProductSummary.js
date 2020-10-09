import React, { useCallback, useMemo, useEffect } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
// eslint-disable-next-line no-restricted-imports
import { pathOr, path } from 'ramda'
import { Link } from 'vtex.render-runtime'
import { useInView } from 'react-intersection-observer'
import { ProductListContext } from 'vtex.product-list-context'
import {
  ProductSummaryConsumer,
  ProductSummaryProvider,
  useProductSummaryDispatch,
  useProductSummary,
} from 'vtex.product-summary-context/ProductSummaryContext'
import { ProductContextProvider } from 'vtex.product-context'
import { useCssHandles } from 'vtex.css-handles'

import ProductSummaryContext from './ProductSummaryContext'
import { productShape } from '../utils/propTypes'
import { mapCatalogProductToProductSummary } from '../utils/normalize'
import useIsPriceAsync from '../hooks/useIsPriceAsync'
import useSetProduct from '../hooks/useSetProduct'
import useSimulation from '../hooks/useSimulation'

const PRODUCT_SUMMARY_MAX_WIDTH = 300
const CSS_HANDLES = ['container', 'containerNormal', 'element', 'clearLink']

const ProductSummaryCustom = ({ product, actionOnClick, children, href }) => {
  const { isLoading, isHovering, query } = useProductSummary()
  const dispatch = useProductSummaryDispatch()
  const handles = useCssHandles(CSS_HANDLES)

  /*
    Use ProductListContext to send pixel events.
    Beware that productListDispatch could be undefined if
    this component is not wrapped by a <ProductListContextProvider/>.
    In that case we don't need to send events.
  */
  const { useProductListDispatch } = ProductListContext
  const productListDispatch = useProductListDispatch()
  const [inViewRef, inView] = useInView({
    // Triggers the event when the element is 75% visible
    threshold: 0.75,
    triggerOnce: true,
  })

  useEffect(() => {
    if (inView) {
      productListDispatch &&
        productListDispatch({
          type: 'SEND_IMPRESSION',
          args: { product },
        })

      dispatch({
        type: 'SET_IN_VIEW',
        args: { inView },
      })
    }
  }, [productListDispatch, dispatch, inView, product])

  useEffect(() => {
    if (product) {
      dispatch({
        type: 'SET_PRODUCT',
        args: { product },
      })
    }
  }, [product, dispatch])

  const productSummaryDispatch = useProductSummaryDispatch()
  const setProduct = useSetProduct()

  useSimulation({
    product,
    inView,
    onError: () => {
      productSummaryDispatch({
        type: 'SET_PRICE_LOADING',
        args: { isPriceLoading: false },
      })
    },
    onComplete: (simulatedProduct) => {
      setProduct(simulatedProduct)

      productSummaryDispatch({
        type: 'SET_PRICE_LOADING',
        args: { isPriceLoading: false },
      })
    },
  })

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
    (loading) => {
      dispatch({
        type: 'SET_LOADING',
        args: { isLoading: loading },
      })
    },
    [dispatch]
  )

  const oldContextProps = useMemo(
    () => ({
      product,
      isLoading,
      isHovering,
      handleItemsStateUpdate,
    }),
    [product, isLoading, isHovering, handleItemsStateUpdate]
  )

  const containerClasses = classNames(
    handles.container,
    handles.containerNormal,
    'overflow-hidden br3 h-100 w-100 flex flex-column justify-between center tc'
  )

  const summaryClasses = classNames(
    handles.element,
    'pointer pt3 pb4 flex flex-column h-100'
  )

  const linkClasses = classNames(handles.clearLink, 'h-100 flex flex-column')

  const linkProps = href
    ? {
        to: href,
      }
    : {
        page: 'store.product',
        params: {
          slug: product && product.linkText,
          id: product && product.productId,
        },
        query,
      }

  return (
    <ProductSummaryContext.Provider value={oldContextProps}>
      <section
        className={containerClasses}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{ maxWidth: PRODUCT_SUMMARY_MAX_WIDTH }}
        ref={inViewRef}
      >
        <Link className={linkClasses} {...linkProps} onClick={actionOnClick}>
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
  containerRef: PropTypes.oneOfType([
    // Either a function
    PropTypes.func,
    // Or the instance of a DOM native element
    PropTypes.shape({ current: PropTypes.instanceOf(PropTypes.Element) }),
  ]),
  /** Should be only used by custom components, never by blocks */
  href: PropTypes.string,
}

function ProductSummaryWrapper(props) {
  const { isPriceAsync } = useIsPriceAsync()

  return (
    <ProductSummaryProvider {...props} isPriceLoading={isPriceAsync}>
      <ProductSummaryConsumer>
        {(value) => {
          const skuId = pathOr(
            path(['sku', 'itemId'], props.product),
            ['itemId'],
            value.selectedItem
          )

          return (
            <ProductContextProvider
              product={props.product}
              query={{
                skuId,
              }}
            >
              <ProductSummaryCustom {...props} />
            </ProductContextProvider>
          )
        }}
      </ProductSummaryConsumer>
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
