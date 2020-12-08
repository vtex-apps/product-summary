import React, { useCallback } from 'react'
import type { ComponentType, PropsWithChildren } from 'react'
import { useQuery } from 'react-apollo'
import { QueryProducts } from 'vtex.store-resources'
import type { QueryProductsTypes } from 'vtex.store-resources'
import { usePixel } from 'vtex.pixel-manager'
import { ProductList as ProductListStructuredData } from 'vtex.structured-data'

import ProductSummaryListWithoutQuery from './ProductSummaryListWithoutQuery'

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

const parseFilters = ({ id, value }: { id: string; value: string }) =>
  `specificationFilter_${id}:${value}`

function getOrdinationProp(attribute: 'name' | 'value') {
  return Object.keys(ORDER_BY_OPTIONS).map(
    (key) => ORDER_BY_OPTIONS[key as keyof typeof ORDER_BY_OPTIONS][attribute]
  )
}

interface SpecificationFilter {
  id: string
  value: string
}

interface Props {
  category?: string
  collection?: string
  hideUnavailableItems?: boolean
  orderBy?:
    | ''
    | 'OrderByTopSaleDESC'
    | 'OrderByPriceDESC'
    | 'OrderByPriceASC'
    | 'OrderByNameASC'
    | 'OrderByNameDESC'
    | 'OrderByReleaseDateDESC'
    | 'OrderByBestDiscountDESC'
  specificationFilters?: SpecificationFilter[]
  maxItems?: number
  skusFilter?: 'ALL_AVAILABLE' | 'ALL' | 'FIRST_AVAILABLE'
  installmentCriteria?: 'MAX_WITHOUT_INTEREST' | 'MAX_WITH_INTEREST'
  ProductSummary: ComponentType<{ product: any }>
  analyticsListName?: string
  actionOnProductClick?: (product: any) => void
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
    analyticsListName,
    ProductSummary,
    actionOnProductClick,
  } = props

  const { push } = usePixel()
  const { data, loading, error } = useQuery<
    QueryProductsTypes.Data,
    QueryProductsTypes.Variables
  >(QueryProducts, {
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
      hideUnavailableItems,
      skusFilter,
      installmentCriteria,
    },
  })

  const { products } = data ?? {}

  const productClick = useCallback(
    (product: any) => {
      if (actionOnProductClick) actionOnProductClick(product)

      push({
        event: 'productClick',
        // Not using ?? operator because analyticsListName can be ''
        list: !analyticsListName ? 'List of products' : analyticsListName,
        product,
      })
    },
    [push, actionOnProductClick, analyticsListName]
  )

  if (loading || error) {
    return null
  }

  return (
    <ProductSummaryListWithoutQuery
      products={products}
      listName={analyticsListName}
      ProductSummary={ProductSummary}
      actionOnProductClick={productClick}
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
    analyticsListName: {
      title: 'admin/editor.productSummaryList.analyticsListName.title',
      type: 'string',
    },
  },
}

export default ProductSummaryList
