import React from 'react'
import { compose, graphql } from 'react-apollo'
import { injectIntl } from 'react-intl'
import { formatIOMessage } from 'vtex.native-types'
import { useListContext, ListContextProvider } from 'vtex.list-context'

import ProductSummary from './components/ProductSummary'
import ProductSummaryName from './components/ProductSummaryName/ProductSummaryName'
import ProductSummaryPrice from './components/ProductSummaryPrice/ProductSummaryPrice'
import ProductSummaryBuyButton from './components/ProductSummaryBuyButton/ProductSummaryBuyButton'
import ProductSummaryImage from './components/ProductSummaryImage/ProductImage'
import Spacer from './Spacer'
import { mapCatalogProductToProductSummary } from './utils/normalize'

import { productSearchV2 } from 'vtex.store-resources/Queries'

const ProductSummaryList = ({ children, data, intl, buyButtonText }) => {
  const formattedBuyButtonText = formatIOMessage({ id: buyButtonText, intl })
  const { list } = useListContext()
  const componentList =
    data.productSearch &&
    data.productSearch.products.map(product => {
      const normalizedProduct = mapCatalogProductToProductSummary(product)

      return (
        <ProductSummary key={product.productId} product={normalizedProduct}>
          <ProductSummaryImage />
          <ProductSummaryName />
          <Spacer />
          <ProductSummaryPrice />
          <ProductSummaryBuyButton buyButtonText={formattedBuyButtonText} />
        </ProductSummary>
      )
    })

  const newListContextValue = list.concat(componentList)

  return (
    <ListContextProvider list={newListContextValue}>
      {children}
    </ListContextProvider>
  )
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
    withFacets = false,
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
      withFacets,
    },
  }),
}

function getOrdinationProp(attribute) {
  return Object.keys(ORDER_BY_OPTIONS).map(
    key => ORDER_BY_OPTIONS[key][attribute]
  )
}

const EnhancedProductList = compose(
  graphql(productSearchV2, productQueryOptions),
  injectIntl
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
      enum: getOrdinationProp('value'),
      enumNames: getOrdinationProp('name'),
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
