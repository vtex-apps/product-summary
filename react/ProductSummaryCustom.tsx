import React, { useCallback, useMemo, useEffect, useRef } from 'react'
import type { PropsWithChildren } from 'react'
import classNames from 'classnames'
import { Link } from 'vtex.render-runtime'
import { useOnView } from 'vtex.on-view'
import { ProductListContext } from 'vtex.product-list-context'
import { ProductSummaryContext } from 'vtex.product-summary-context'
import type { ProductSummaryTypes } from 'vtex.product-summary-context'
import { ProductContextProvider } from 'vtex.product-context'
import type { ProductTypes } from 'vtex.product-context'
import { useCssHandles } from 'vtex.css-handles'
import type { CssHandlesTypes } from 'vtex.css-handles'

import LocalProductSummaryContext from './ProductSummaryContext'
import { mapCatalogProductToProductSummary } from './utils/normalize'
import ProductPriceSimulationWrapper from './components/ProductPriceSimulationWrapper'

const {
  ProductSummaryProvider,
  useProductSummaryDispatch,
  useProductSummary,
} = ProductSummaryContext

const PRODUCT_SUMMARY_MAX_WIDTH = 300
const CSS_HANDLES = [
  'container',
  'containerNormal',
  'element',
  'clearLink',
] as const

function ProductSummaryCustom({
  product,
  actionOnClick,
  children,
  href,
  priceBehavior = 'default',
  position,
  classes,
}: PropsWithChildren<Props>) {
  const {
    isLoading,
    isHovering,
    selectedItem,
    listName,
    query,
    inView,
  } = useProductSummary()

  const dispatch = useProductSummaryDispatch()
  const { handles } = useCssHandles(CSS_HANDLES, { classes })

  const productListDispatch = ProductListContext.useProductListDispatch()

  const productListState = ProductListContext.useProductListState()
  const autocompleteSummary =
    productListState?.listName === 'autocomplete-result-list'

  const inViewRef = useRef<HTMLDivElement | null>(null)
  const onView = useCallback(() => {
    productListDispatch?.({
      type: 'SEND_IMPRESSION',
      args: { product, position },
    })

    dispatch({
      type: 'SET_IN_VIEW',
      args: { inView: true },
    })
  }, [dispatch, productListDispatch, product, position])

  useOnView({
    ref: inViewRef,
    once: true,
    onView,
  })

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

  const skuId = selectedItem?.itemId ?? product?.sku?.itemId

  const linkProps = href
    ? {
        to: href,
        onClick: autocompleteSummary ? actionOnClick : undefined,
        onClickCapture: autocompleteSummary ? undefined : actionOnClick,
      }
    : {
        page: 'store.product',
        params: {
          slug: product?.linkText,
          id: product?.productId,
          __listName: listName,
        },
        query,
        onClick: autocompleteSummary ? actionOnClick : undefined,
        onClickCapture: autocompleteSummary ? undefined : actionOnClick,
      }

  return (
    <LocalProductSummaryContext.Provider value={oldContextProps}>
      <ProductContextProvider
        product={(product as unknown) as ProductTypes.Product}
        query={{ skuId }}
      >
        <ProductPriceSimulationWrapper
          product={product}
          inView={inView}
          priceBehavior={priceBehavior}
        >
          <section
            className={containerClasses}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{ maxWidth: PRODUCT_SUMMARY_MAX_WIDTH }}
            ref={inViewRef}
          >
            <Link className={linkClasses} {...linkProps}>
              <article className={summaryClasses}>{children}</article>
            </Link>
          </section>
        </ProductPriceSimulationWrapper>
      </ProductContextProvider>
    </LocalProductSummaryContext.Provider>
  )
}

interface Props {
  product: ProductSummaryTypes.Product
  /** Function that is executed when a product is clicked */
  actionOnClick?: () => void
  href?: string
  /**
   * Whether the client will request the simulation API ("async") or not "default"
   * @default "default"
   */
  priceBehavior?: 'async' | 'default'
  /**
   * Name of the list the Product Summary is in. Should be set by a Shelf or the Search Result gallery.
   */
  listName?: string
  /**
   * Whether the listName should be sent to product pages via querystring
   * @default true
   */
  trackListName?: boolean
  /**
   * The position of the Product Summary in a list of Product Summaries. Used by the
   * ProductImpressions event.
   */
  position?: number
  classes?: CssHandlesTypes.CustomClasses<typeof CSS_HANDLES>
}

function ProductSummaryWrapper({
  product,
  actionOnClick,
  href,
  priceBehavior = 'default',
  trackListName = true,
  listName,
  position,
  classes,
  children,
}: PropsWithChildren<Props>) {
  return (
    <ProductSummaryProvider
      product={product}
      listName={trackListName ? listName : undefined}
      isPriceLoading={priceBehavior === 'async'}
    >
      <ProductSummaryCustom
        product={product}
        href={href}
        actionOnClick={actionOnClick}
        priceBehavior={priceBehavior}
        position={position}
        classes={classes}
      >
        {children}
      </ProductSummaryCustom>
    </ProductSummaryProvider>
  )
}

ProductSummaryWrapper.schema = {
  title: 'admin/editor.productSummary.title',
  description: 'admin/editor.productSummary.description',
}

// This function is public available to be used only by vtex.shelf and vtex.search-result.
// We do not garantee this API will not change and might happen breaking change anytime.
ProductSummaryWrapper.mapCatalogProductToProductSummary = mapCatalogProductToProductSummary

export default ProductSummaryWrapper
