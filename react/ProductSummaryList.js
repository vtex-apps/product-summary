import React, { createContext, useContext } from 'react'
import { compose, graphql } from 'react-apollo'

import ProductSummary from './components/ProductSummary'
import ProductSummaryName from './components/ProductSummaryName/ProductSummaryName'
import ProductSummaryPrice from './components/ProductSummaryPrice/ProductSummaryPrice'
import ProductSummaryBuyButton from './components/ProductSummaryBuyButton/ProductSummaryBuyButton'
import ProductSummaryImage from './components/ProductSummaryImage/ProductImage'
import Spacer from './Spacer'
import { mapCatalogProductToProductSummary } from './utils/normalize'

import productsQuery from './graphql/products.graphql'

const ProductSummaryListStateContext = createContext(undefined)

const ProductSummaryList = ({ children, data }) => {
  const componentList = data.products.map(product => {
    const normalizedProduct = mapCatalogProductToProductSummary(product)

    return (
      <ProductSummary key={product.productId} product={normalizedProduct}>
        <ProductSummaryImage />
        <ProductSummaryName />
        <Spacer />
        <ProductSummaryPrice />
        <ProductSummaryBuyButton buyButtonText="Add to cart" />
      </ProductSummary>
    )
  })

  return (
    <ProductSummaryListStateContext.Provider value={componentList}>
      {children}
    </ProductSummaryListStateContext.Provider>
  )
}

function useProductSummaryListState() {
  const context = useContext(ProductSummaryListStateContext)
  return context
}

const parseFilters = ({ id, value }) => `specificationFilter_${id}:${value}`

const ORDER_BY_OPTIONS = {
  ORDER_BY_RELEVANCE: {
    name: 'admin/editor.productSummaryList.orderType.relevance',
    value: '',
  },
  ORDER_BY_TOP_SALE_DESC: {
    name: 'admin/editor.productSummaryList.orderType.sales',
    value: 'OrderByTopSaleDESC',
  },
  ORDER_BY_PRICE_DESC: {
    name: 'admin/editor.productSummaryList.orderType.priceDesc',
    value: 'OrderByPriceDESC',
  },
  ORDER_BY_PRICE_ASC: {
    name: 'admin/editor.productSummaryList.orderType.priceAsc',
    value: 'OrderByPriceASC',
  },
  ORDER_BY_NAME_ASC: {
    name: 'admin/editor.productSummaryList.orderType.nameAsc',
    value: 'OrderByNameASC',
  },
  ORDER_BY_NAME_DESC: {
    name: 'admin/editor.productSummaryList.orderType.nameDesc',
    value: 'OrderByNameDESC',
  },
  ORDER_BY_RELEASE_DATE_DESC: {
    name: 'admin/editor.productSummaryList.orderType.releaseDate',
    value: 'OrderByReleaseDateDESC',
  },
  ORDER_BY_BEST_DISCOUNT_DESC: {
    name: 'admin/editor.productSummaryList.orderType.discount',
    value: 'OrderByBestDiscountDESC',
  },
}

const productQueryOptions = {
  options: ({
    category = '',
    collection,
    hideUnavailableItems = false,
    orderBy = ORDER_BY_OPTIONS.ORDER_BY_TOP_SALE_DESC.value,
    specificationFilters = [],
    maxItems = 10,
  }) => ({
    ssr: true,
    name: 'productList',
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
    },
  }),
}

function getOrdinationNames() {
  const names = []
  for (const key in ORDER_BY_OPTIONS) {
    names.push(ORDER_BY_OPTIONS[key].name)
  }
  return names
}

function getOrdinationValues() {
  const values = []
  for (const key in ORDER_BY_OPTIONS) {
    values.push(ORDER_BY_OPTIONS[key].value)
  }
  return values
}

const EnhancedProductList = compose(
  graphql(productsQuery, productQueryOptions)
)(ProductSummaryList)

EnhancedProductList.getSchema = () => ({
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
      type: 'number',
      isLayout: false,
    },
    orderBy: {
      title: 'admin/editor.productSummaryList.orderBy.title',
      type: 'string',
      enum: getOrdinationValues(),
      enumNames: getOrdinationNames(),
      default: ORDER_BY_OPTIONS.ORDER_BY_TOP_SALE_DESC.value,
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
  },
})

export default EnhancedProductList

export { useProductSummaryListState }
