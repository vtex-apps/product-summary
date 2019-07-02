import { createContext } from 'react'

const ProductSummaryContext = createContext(0)

const OriginalConsumer = ProductSummaryContext.Consumer
ProductSummaryContext.Consumer = function WrappedConsumer(props) {
  console.error('If you are seeing this, please comment on the issue https://github.com/vtex-apps/store-issues#28')

  return <OriginalConsumer {...props} />
}

export default ProductSummaryContext
