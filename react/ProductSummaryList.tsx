import type { ComponentType, PropsWithChildren } from 'react'
import React, { useCallback, useEffect, useState } from 'react'
import { useQuery } from 'react-apollo'
import { usePixel } from 'vtex.pixel-manager'
import { QueryProducts } from 'vtex.store-resources'
import { ProductList as ProductListStructuredData } from 'vtex.structured-data'
// eslint-disable-next-line no-restricted-imports
import { equals } from 'ramda'
import { canUseDOM } from 'vtex.render-runtime'

import ProductSummaryListWithoutQuery, {
  PRODUCT_LIST_PLACEMENT,
} from './ProductSummaryListWithoutQuery'
import useSession from './hooks/useSession'
import { PreferenceType } from './utils/normalize'

const DEFAULT_SHOW_SPONSORED_PRODUCTS = false
const DEFAULT_SPONSORED_COUNT = 2
const DEFAULT_REPEAT_SPONSORED_PRODUCTS = false

const ORDER_BY_OPTIONS = {
  RELEVANCE: {
    name: 'admin/editor.productSummaryList.orderType.relevance',
    value: '',
  },
  TOP_SALE_DESC: {
    name: 'admin/editor.productSummaryList.orderType.sales',
    value: 'OrderByTopSaleDESC',
  },
  PRICE_DESC: {
    name: 'admin/editor.productSummaryList.orderType.priceDesc',
    value: 'OrderByPriceDESC',
  },
  PRICE_ASC: {
    name: 'admin/editor.productSummaryList.orderType.priceAsc',
    value: 'OrderByPriceASC',
  },
  NAME_ASC: {
    name: 'admin/editor.productSummaryList.orderType.nameAsc',
    value: 'OrderByNameASC',
  },
  NAME_DESC: {
    name: 'admin/editor.productSummaryList.orderType.nameDesc',
    value: 'OrderByNameDESC',
  },
  RELEASE_DATE_DESC: {
    name: 'admin/editor.productSummaryList.orderType.releaseDate',
    value: 'OrderByReleaseDateDESC',
  },
  BEST_DISCOUNT_DESC: {
    name: 'admin/editor.productSummaryList.orderType.discount',
    value: 'OrderByBestDiscountDESC',
  },
}

function getCookie(cname: string) {
  if (!canUseDOM) {
    return ''
  }

  const name = `${cname}=`
  const decodedCookie = decodeURIComponent(document.cookie)
  const ca = decodedCookie.split(';')

  for (let i = 0; i < ca.length; i++) {
    let c = ca[i]

    while (c.charAt(0) === ' ') {
      c = c.substring(1)
    }

    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length)
    }
  }

  return ''
}

const parseFilters = ({ id, value }: { id: string; value: string }) =>
  `specificationFilter_${id}:${value}`

function getOrdinationProp(attribute: 'name' | 'value') {
  return Object.keys(ORDER_BY_OPTIONS).map(
    (key) => ORDER_BY_OPTIONS[key as keyof typeof ORDER_BY_OPTIONS][attribute]
  )
}

export interface ProductClickParams {
  position: number
}

interface SpecificationFilter {
  id: string
  value: string
}

interface Props {
  /** Category ID of the listed items. For sub-categories, use "/" (e.g. "1/2/3") */
  category?: string
  /** Specification Filters of the listed items. */
  specificationFilters?: SpecificationFilter[]
  /** Filter by collection. */
  collection?: string
  /**
   * Ordination type of the items. Possible values: `''`, `OrderByTopSaleDESC`, `OrderByReleaseDateDESC`, `OrderByBestDiscountDESC`, `OrderByPriceDESC`, `OrderByPriceASC`, `OrderByNameASC`, `OrderByNameDESC`
   * @default ""
   */
  orderBy?:
    | ''
    | 'OrderByTopSaleDESC'
    | 'OrderByPriceDESC'
    | 'OrderByPriceASC'
    | 'OrderByNameASC'
    | 'OrderByNameDESC'
    | 'OrderByReleaseDateDESC'
    | 'OrderByBestDiscountDESC'
  /** Hides items that are unavailable. */
  hideUnavailableItems?: boolean
  /**
   * Maximum items to be fetched.
   * @default 10
   */
  maxItems?: number
  /**
   * Control SKUs returned for each product in the query. The less SKUs needed to be returned, the more performant your shelf query will be.
   * @default "ALL_AVAILABLE"
   */
  skusFilter?: 'ALL_AVAILABLE' | 'ALL' | 'FIRST_AVAILABLE'
  /**
   * Control what price to be shown when price has different installments options.
   * @default "MAX_WITHOUT_INTEREST"
   */
  installmentCriteria?: 'MAX_WITHOUT_INTEREST' | 'MAX_WITH_INTEREST'
  /**
   * Name of the list property on Google Analytics events.
   */
  listName?: string
  /**
   * Logic to enable which SKU will be the selected item
   * */
  preferredSKU?: PreferenceType
  /** Slot of a product summary. */
  ProductSummary: ComponentType<{ product: any; actionOnClick: any }>
  /** Callback on product click. */
  actionOnProductClick?: (product: any) => void
  /** Whether or not to show sponsored products in this list. */
  showSponsoredProducts: boolean
  /** Maximum number of sponsored products to put on top of the regular products. */
  sponsoredCount: number
  /** If true, sponsored and regular products will be repeated on the list. */
  repeatSponsoredProducts: boolean
  /**
   * Function that returns Activity Flow data attributes for each product summary.
   * The returned key/value pairs will be spread onto the corresponding section element.
   *
   * @example
   * buildProductAfDataAttributes={(product, index) => ({
   *   'data-af-category': product.category || 'unknown',
   *   'data-af-index': String(index),
   * })}
   */
  buildProductAfDataAttributes?: (
    product?: Record<string, string>,
    index?: number
  ) => Record<string, string>
}

function ProductSummaryList(props: PropsWithChildren<Props>) {
  const {
    category = '',
    collection,
    hideUnavailableItems = false,
    orderBy = ORDER_BY_OPTIONS.RELEVANCE.value,
    specificationFilters = [],
    maxItems = 10,
    skusFilter,
    installmentCriteria,
    children,
    listName: rawListName,
    ProductSummary,
    actionOnProductClick,
    preferredSKU,
    showSponsoredProducts = DEFAULT_SHOW_SPONSORED_PRODUCTS,
    sponsoredCount = DEFAULT_SPONSORED_COUNT,
    repeatSponsoredProducts = DEFAULT_REPEAT_SPONSORED_PRODUCTS,
    buildProductAfDataAttributes,
  } = props

  const [shippingOptions, setShippingOptions] = useState([])

  const { getShippingOptionFromSession } = useSession()

  useEffect(() => {
    async function getShippingFromSession() {
      const result = await getShippingOptionFromSession()

      if (result) {
        setShippingOptions((currentShippingOptions) =>
          equals(currentShippingOptions, result)
            ? currentShippingOptions
            : result
        )
      }
    }

    getShippingFromSession()
  }, [getShippingOptionFromSession])

  const { push } = usePixel()
  const { data, loading, error } = useQuery(QueryProducts, {
    variables: {
      category,
      ...(collection != null
        ? {
            collection,
          }
        : {}),
      specificationFilters: specificationFilters.map(parseFilters),
      orderBy,
      from: 0,
      to: maxItems - 1,
      shippingOptions,
      hideUnavailableItems,
      skusFilter,
      installmentCriteria,
      variant: getCookie('sp-variant'),
      advertisementOptions: {
        showSponsored: showSponsoredProducts,
        sponsoredCount,
        repeatSponsoredProducts,
        advertisementPlacement: PRODUCT_LIST_PLACEMENT,
      },
    },
  })

  const { products } = data ?? {}
  // Not using ?? operator because listName can be ''
  // eslint-disable-next-line no-unneeded-ternary
  const listName = rawListName ? rawListName : 'List of products'

  const productClick = useCallback(
    (product: any, productClickParams?: ProductClickParams) => {
      actionOnProductClick?.(product)

      const { position } = productClickParams ?? {}

      push({
        event: 'productClick',
        list: listName,
        product,
        position,
      })
    },
    [push, actionOnProductClick, listName]
  )

  if (loading || error) {
    return null
  }

  return (
    <ProductSummaryListWithoutQuery
      products={products}
      listName={listName}
      ProductSummary={ProductSummary}
      actionOnProductClick={productClick}
      preferredSKU={preferredSKU}
      buildProductAfDataAttributes={buildProductAfDataAttributes}
    >
      <ProductListStructuredData products={products} />
      {children}
    </ProductSummaryListWithoutQuery>
  )
}

ProductSummaryList.schema = {
  title: 'admin/editor.productSummaryList.title',
  description: 'admin/editor.productSummaryList.description',
  type: 'object',
  properties: {
    category: {
      title: 'admin/editor.productSummaryList.category.title',
      description: 'admin/editor.productSummaryList.category.description',
      type: 'string',
      isLayout: false,
    },
    specificationFilters: {
      title: 'admin/editor.productSummaryList.specificationFilters.title',
      type: 'array',
      items: {
        title:
          'admin/editor.productSummaryList.specificationFilters.item.title',
        type: 'object',
        properties: {
          id: {
            type: 'string',
            title:
              'admin/editor.productSummaryList.specificationFilters.item.id.title',
          },
          value: {
            type: 'string',
            title:
              'admin/editor.productSummaryList.specificationFilters.item.value.title',
          },
        },
      },
    },
    collection: {
      title: 'admin/editor.productSummaryList.collection.title',
      type: 'string',
      isLayout: false,
    },
    orderBy: {
      title: 'admin/editor.productSummaryList.orderBy.title',
      type: 'string',
      enum: getOrdinationProp('value'),
      enumNames: getOrdinationProp('name'),
      default: ORDER_BY_OPTIONS.RELEVANCE.value,
      isLayout: false,
    },
    hideUnavailableItems: {
      title: 'admin/editor.productSummaryList.hideUnavailableItems',
      type: 'boolean',
      default: false,
      isLayout: false,
    },
    maxItems: {
      title: 'admin/editor.productSummaryList.maxItems.title',
      type: 'number',
      isLayout: false,
      default: 10,
    },
    skusFilter: {
      title: 'admin/editor.productSummaryList.skusFilter.title',
      description: 'admin/editor.productSummaryList.skusFilter.description',
      type: 'string',
      default: 'ALL_AVAILABLE',
      enum: ['ALL_AVAILABLE', 'ALL', 'FIRST_AVAILABLE'],
      enumNames: [
        'admin/editor.productSummaryList.skusFilter.all-available',
        'admin/editor.productSummaryList.skusFilter.none',
        'admin/editor.productSummaryList.skusFilter.first-available',
      ],
    },
    installmentCriteria: {
      title: 'admin/editor.productSummaryList.installmentCriteria.title',
      description:
        'admin/editor.productSummaryList.installmentCriteria.description',
      type: 'string',
      default: 'MAX_WITHOUT_INTEREST',
      enum: ['MAX_WITHOUT_INTEREST', 'MAX_WITH_INTEREST'],
      enumNames: [
        'admin/editor.productSummaryList.installmentCriteria.max-without-interest',
        'admin/editor.productSummaryList.installmentCriteria.max-with-interest',
      ],
    },
    listName: {
      title: 'admin/editor.productSummaryList.analyticsListName.title',
      type: 'string',
    },
    showSponsoredProducts: {
      title: 'admin/editor.productSummaryList.showSponsoredProducts.title',
      description:
        'admin/editor.productSummaryList.showSponsoredProducts.description',
      type: 'boolean',
      default: DEFAULT_SHOW_SPONSORED_PRODUCTS,
    },
    sponsoredCount: {
      title: 'admin/editor.productSummaryList.sponsoredCount.title',
      description: 'admin/editor.productSummaryList.sponsoredCount.description',
      type: 'number',
      default: DEFAULT_SPONSORED_COUNT,
    },
    repeatSponsoredProducts: {
      title: 'admin/editor.productSummaryList.repeatSponsoredProducts.title',
      description:
        'admin/editor.productSummaryList.repeatSponsoredProducts.description',
      type: 'boolean',
      default: DEFAULT_REPEAT_SPONSORED_PRODUCTS,
    },
  },
}

export default ProductSummaryList
