import React, {
  useMemo,
  useCallback,
  ComponentType,
  PropsWithChildren,
} from 'react'
import path from 'ramda/es/path'
import last from 'ramda/es/last'
import { useQuery } from 'react-apollo'
import { useProduct } from 'vtex.product-context'
import { usePixel } from 'vtex.pixel-manager'
import { ProductList as ProductListStructuredData } from 'vtex.structured-data'
import { QueryProductRecommendations } from 'vtex.store-resources'

import { filterOutOfStock } from './utils/filterOutOfStock'
import ProductSummaryListWithoutQuery from './ProductSummaryListWithoutQuery'
import { PreferenceType } from './utils/normalize'
import { ProductClickParams } from './ProductSummaryList'

const fixRecommendation = (recommendation: string) => {
  if (recommendation.includes('editor.ProductSummaryRelatedList.')) {
    return last(recommendation.split('.'))
  }

  return recommendation
}

type Recommendations =
  | 'similars'
  | 'view'
  | 'buy'
  | 'accessories'
  | 'viewAndBought'
  | 'suggestions'

interface ProductSummaryRelatedListProps {
  productQuery: {
    /** Product to have related products queried */
    product: {
      productId: string
    }
    loading: boolean
  }
  recommendation: Recommendations
  listName: string
  hideOutOfStockItems: boolean
  /**
   * Maximum items to be fetched.
   * @default 10
   */
  maxItems?: number
  preferredSKU?: PreferenceType
  ProductSummary: ComponentType<{ product: any; actionOnClick: any }>
  actionOnProductClick?: (product: any) => void
}

/**
 * Related Products Component. Queries and shows the related products
 */
const ProductSummaryRelatedList = ({
  productQuery,
  recommendation: cmsRecommendation = 'similars',
  listName: rawListName,
  hideOutOfStockItems = false,
  children,
  ProductSummary,
  maxItems = 10,
  preferredSKU = 'FIRST_AVAILABLE',
  actionOnProductClick,
}: PropsWithChildren<ProductSummaryRelatedListProps>) => {
  const { push } = usePixel()

  const productContext = useProduct()

  const listName = rawListName || 'List of products'

  const productId =
    path(['product', 'productId'], productQuery) ||
    path(['product', 'productId'], productContext)

  const recommendation = productId ? fixRecommendation(cmsRecommendation) : null
  const variables = useMemo(() => {
    if (!productId) {
      return null
    }

    return {
      identifier: { field: 'id', value: productId },
      type: recommendation,
    }
  }, [productId, recommendation])

  const { data, loading, error } = useQuery(QueryProductRecommendations, {
    variables,
  })

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

  if (!productId || loading || error) {
    return null
  }

  const { productRecommendations = [] } = data

  const products = hideOutOfStockItems
    ? filterOutOfStock(productRecommendations).slice(0, maxItems)
    : productRecommendations.slice(0, maxItems)

  if (products.length === 0) return null

  return (
    <ProductSummaryListWithoutQuery
      products={products}
      listName={listName}
      ProductSummary={ProductSummary}
      actionOnProductClick={productClick}
      preferredSKU={preferredSKU}
    >
      <ProductListStructuredData products={products} />
      {children}
    </ProductSummaryListWithoutQuery>
  )
}

ProductSummaryRelatedList.schema = {
  title: 'admin/editor.ProductSummaryRelatedList.title',
  description: 'admin/editor.ProductSummaryRelatedList.description',
  type: 'object',
  properties: {
    recommendation: {
      title: 'admin/editor.productSummaryRelatedList.recommendation',
      description:
        'admin/editor.productSummaryRelatedList.recommendation.description',
      type: 'string',
      default: 'similars',
      enum: [
        'similars',
        'view',
        'buy',
        'accessories',
        'viewAndBought',
        'suggestions',
      ],
      enumNames: [
        'admin/editor.productSummaryRelatedList.similars',
        'admin/editor.productSummaryRelatedList.view',
        'admin/editor.productSummaryRelatedList.buy',
        'admin/editor.productSummaryRelatedList.accessories',
        'admin/editor.productSummaryRelatedList.viewAndBought',
        'admin/editor.productSummaryRelatedList.suggestions',
      ],
    },
    hideOutOfStockItems: {
      title: 'admin/editor.productSummaryRelatedList.hideOutOfStockItems',
      type: 'boolean',
      default: false,
    },
  },
}

export default ProductSummaryRelatedList
