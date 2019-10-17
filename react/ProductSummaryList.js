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
    name: 'admin/editor.shelf.orderType.relevance',
    value: '',
  },
  ORDER_BY_TOP_SALE_DESC: {
    name: 'admin/editor.shelf.orderType.sales',
    value: 'OrderByTopSaleDESC',
  },
  ORDER_BY_PRICE_DESC: {
    name: 'admin/editor.shelf.orderType.priceDesc',
    value: 'OrderByPriceDESC',
  },
  ORDER_BY_PRICE_ASC: {
    name: 'admin/editor.shelf.orderType.priceAsc',
    value: 'OrderByPriceASC',
  },
  ORDER_BY_NAME_ASC: {
    name: 'admin/editor.shelf.orderType.nameAsc',
    value: 'OrderByNameASC',
  },
  ORDER_BY_NAME_DESC: {
    name: 'admin/editor.shelf.orderType.nameDesc',
    value: 'OrderByNameDESC',
  },
  ORDER_BY_RELEASE_DATE_DESC: {
    name: 'admin/editor.shelf.orderType.releaseDate',
    value: 'OrderByReleaseDateDESC',
  },
  ORDER_BY_BEST_DISCOUNT_DESC: {
    name: 'admin/editor.shelf.orderType.discount',
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
      to: 9,
      hideUnavailableItems,
    },
  }),
}

const EnhancedProductList = compose(
  graphql(productsQuery, productQueryOptions)
)(ProductSummaryList)

export default EnhancedProductList

export { useProductSummaryListState }
