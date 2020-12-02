import { useProductImpression } from 'vtex.product-list-context'

function ProductListEventCaller() {
  useProductImpression()

  return null
}

export default ProductListEventCaller
