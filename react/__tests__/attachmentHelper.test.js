import {
  optionPricePerItem,
  parentPricePerUnit,
} from '../utils/attachmentHelper'

import { helperMock } from '../__mocks__/helperMock'

const createProductSummaryProduct = ({
  name,
  sellingPrice,
  id,
  quantity,
  sellerId,
  options,
}) => ({
  productName: name || 'default',
  sku: {
    seller: {
      commertialOffer: {
        Price:
          (sellingPrice || 10) * (quantity || 0) +
          (options || []).reduce(
            (total, op) => op.sku.seller.commertialOffer.Price + total,
            0
          ),
      },
      sellerId: sellerId || '1',
    },
    name: name || 'default',
    itemId: id || '1',
  },
  quantity: quantity || 1,
  addedOptions: options,
})

const createProductSummaryOption = ({
  product,
  isSingleChoice = false,
  optionType = 'Toppings',
}) => ({
  ...createProductSummaryProduct(product),
  isSingleChoice,
  optionType,
})

it('should calculate proper price per unit of parent item on orderForm', () => {
  expect(parentPricePerUnit(helperMock).toFixed('2')).toBe('24.80')
})

it('should correctly calculate attachment cost on each parent item', () => {
  const ham = helperMock.addedOptions.find(
    ({ optionType, productName }) =>
      optionType === 'Toppings' && productName === 'Ham'
  )
  const pepperoni = helperMock.addedOptions.find(
    ({ optionType, productName }) =>
      optionType === 'Toppings' && productName === 'Pepperoni'
  )
  const greenpepper = helperMock.addedOptions.find(
    ({ optionType, productName }) =>
      optionType === 'Toppings' && productName === 'Green Pepper'
  )
  const crust = helperMock.addedOptions.find(
    ({ optionType, productName }) =>
      optionType === 'Crust' && productName === 'Hut Cheese'
  )
  const costHam = optionPricePerItem(ham, helperMock)
  const costGreenPepper = optionPricePerItem(greenpepper, helperMock)
  const costPepperoni = optionPricePerItem(pepperoni, helperMock)
  const costCrust = optionPricePerItem(crust, helperMock)
  expect(costHam.toFixed(2)).toBe('4.40')
  expect(costGreenPepper.toFixed(2)).toBe('0.65')
  expect(costPepperoni.toFixed(2)).toBe('7.00')
  expect(costCrust.toFixed(2)).toBe('18.60')
})
