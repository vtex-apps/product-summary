import { useProduct, useProductDispatch } from 'vtex.product-context'
import { useProductSummaryDispatch } from 'vtex.product-summary-context/ProductSummaryContext'

const useSetProduct = () => {
  const { selectedItem: currentSelectedItem } = useProduct()
  const productSummaryDispatch = useProductSummaryDispatch()
  const productDispatch = useProductDispatch()

  return (product) => {
    const newSelectedItem =
      currentSelectedItem &&
      product.items.find((item) => item.itemId === currentSelectedItem.itemId)

    productSummaryDispatch({
      type: 'SET_PRODUCT',
      args: { product },
    })

    productDispatch({
      type: 'SET_PRODUCT',
      args: { product },
    })

    productDispatch({
      type: 'SET_SELECTED_ITEM',
      args: { item: newSelectedItem },
    })
  }
}

export default useSetProduct
