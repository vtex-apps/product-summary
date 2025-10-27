import classNames from 'classnames'
import type { PropsWithChildren } from 'react'
import React, { useCallback, useEffect, useMemo, useRef } from 'react'
import type { CssHandlesTypes } from 'vtex.css-handles'
import { useCssHandles } from 'vtex.css-handles'
import { useOnView } from 'vtex.on-view'
import type { ProductTypes } from 'vtex.product-context'
import { ProductContextProvider } from 'vtex.product-context'
import { ProductListContext } from 'vtex.product-list-context'
import type { ProductSummaryTypes } from 'vtex.product-summary-context'
import { ProductSummaryContext } from 'vtex.product-summary-context'
import { SponsoredBadgePosition } from 'vtex.product-summary-context/react/ProductSummaryTypes'
import { Link, useRuntime } from 'vtex.render-runtime'
import { useIntl } from 'react-intl'

import LocalProductSummaryContext from './ProductSummaryContext'
import ProductPriceSimulationWrapper from './components/ProductPriceSimulationWrapper'
import { SponsoredBadge } from './components/SponsoredBadge'
import { mapCatalogProductToProductSummary } from './utils/normalize'
import shouldShowSponsoredBadge from './utils/shouldShowSponsoredBadge'

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
    sponsoredBadge,
  } = useProductSummary()

  const dispatch = useProductSummaryDispatch()
  const { handles } = useCssHandles(CSS_HANDLES, { classes })
  const { getSettings } = useRuntime()

  const settings = getSettings('vtex.store')
  const useSemanticHtml = settings?.advancedSettings?.a11ySemanticHtmlMigration

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

  useEffect(() => {
    if (position) {
      dispatch({
        // @ts-expect-error - Depends on vtex.product-summary-context update on PR: https://github.com/vtex-apps/product-summary-context/pull/25
        type: 'SET_POSITION',
        // @ts-expect-error - Depends on vtex.product-summary-context update on PR: https://github.com/vtex-apps/product-summary-context/pull/25
        args: { position },
      })
    }
  }, [position, dispatch])

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
    'br3 h-100 w-100 flex flex-column justify-between center tc',
    !useSemanticHtml && 'overflow-hidden'
  )

  const summaryClasses = classNames(
    handles.element,
    'pointer pt3 pb4 flex flex-column h-100'
  )

  const linkClasses = classNames(
    handles.clearLink,
    'h-100 flex flex-column',
    useSemanticHtml && 'focus-visible:outline-2 focus-visible:outline-blue-500'
  )

  const skuId = selectedItem?.itemId ?? product?.sku?.itemId

  const linkProps = href
    ? {
        to: href,
        onClick: autocompleteSummary ? actionOnClick : undefined,
        onClickCapture: autocompleteSummary ? undefined : actionOnClick,
        'aria-label': `View product details for ${
          product?.productName || 'product'
        }`,
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
        'aria-label': `View product details for ${
          product?.productName || 'product'
        }`,
      }

  const eventParameters =
    (product.advertisement as any)?.eventParameters ??
    product.advertisement?.adId

  const showSponsoredBadge = shouldShowSponsoredBadge(
    product,
    sponsoredBadge?.position as SponsoredBadgePosition,
    'containerTopLeft'
  )

  const intl = useIntl()

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
            aria-label={intl.formatMessage(
              { id: 'store/product-summary.shelf.aria-label' },
              { productName: product.productName }
            )}
            className={containerClasses}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{ maxWidth: PRODUCT_SUMMARY_MAX_WIDTH }}
            ref={inViewRef}
            data-van-aid={eventParameters}
          >
            <Link className={linkClasses} {...linkProps}>
              <article className={summaryClasses}>
                {showSponsoredBadge ? (
                  <SponsoredBadge label={sponsoredBadge?.label} />
                ) : null}
                {children}
              </article>
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
   * Whether the client will request the simulation API for all sellers ("async"), only for the 1P seller ("asyncOnly1P") or if will not request the API ("default")
   * @default "default"
   */
  priceBehavior?: 'async' | 'asyncOnly1P' | 'default'
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
  /**
   * The predefined position of the sponsored badge, if applicable.
   */
  sponsoredBadgePosition?: SponsoredBadgePosition
  /**
   * The label of the sponsored badge, if applicable.
   */
  sponsoredBadgeLabel?: string
  /**
   * Where this ProductSummary is being shown. Used for analytics. E.g. "search" or "shelf".
   */
  placement?: string
}

function ProductSummaryWrapper({
  product,
  actionOnClick,
  href,
  priceBehavior = 'default',
  trackListName = true,
  listName,
  position,
  sponsoredBadgePosition,
  sponsoredBadgeLabel,
  placement,
  classes,
  children,
}: PropsWithChildren<Props>) {
  const sponsoredBadge = {
    position: sponsoredBadgePosition,
    label: sponsoredBadgeLabel,
  }

  return (
    <ProductSummaryProvider
      product={product}
      listName={trackListName ? listName : undefined}
      sponsoredBadge={sponsoredBadge}
      isPriceLoading={
        priceBehavior === 'async' || priceBehavior === 'asyncOnly1P'
      }
    >
      <ProductSummaryCustom
        product={product}
        href={href}
        actionOnClick={actionOnClick}
        priceBehavior={priceBehavior}
        position={position}
        placement={placement}
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
