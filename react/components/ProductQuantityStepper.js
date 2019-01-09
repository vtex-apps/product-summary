import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { NumericStepper, withToast } from 'vtex.styleguide'
import { orderFormConsumer } from 'vtex.store/OrderFormContext'
import { debounce } from 'lodash'
import { findIndex, propEq } from 'ramda'
import { injectIntl } from 'react-intl'

import { productShape } from '../propTypes'

class ProductQuantityStepper extends Component {
  static propTypes = {
    product: productShape.isRequired,
    setUpdatingItemsState: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)
    this.state = {
      quantity: props.product.quantity,
      canIncrease: true,
    }
    this.debouncedUpdate = debounce(this.updateItemQuantity, 1000)
  }

  handleOnChange = (e) => {
    e.stopPropagation()
    e.preventDefault()
    this.props.setUpdatingItemsState(true)
    this.setState({ quantity: e.value }, () => this.debouncedUpdate && this.debouncedUpdate(this.state.quantity))
  }

  checkUpdatedQuantity = (updateResponse, itemIndex, expectedQuant) => {
    const { setUpdatingItemsState, showToast, intl } = this.props
    const actualQuantity = updateResponse.items[itemIndex].quantity
    if (actualQuantity !== expectedQuant) {
      this.setState({ canIncrease: false, quantity: actualQuantity })
      setUpdatingItemsState(false)
      showToast({ message: intl.formatMessage({ id: 'editor.productSummary.quantity-error' }) })
    }
  }

  updateItemQuantity = async (quantity) => {
    const { product, orderFormContext } = this.props
    this.setState({ canIncrease: true })
    const itemIndex = findIndex(propEq('id', product.sku.itemId))(orderFormContext.orderForm.items)
    try {
      const response = await orderFormContext.updateOrderForm({
        variables: {
          orderFormId: orderFormContext.orderForm.orderFormId,
          items: [{
            index: itemIndex,
            id: product.sku.itemId,
            quantity,
            seller: product.sku.sellerId,
          }],
        },
      })
      this.checkUpdatedQuantity(response.data.updateItems, itemIndex, quantity)
      await orderFormContext.refetch()
    } catch (err) {
      // gone wrong, rollback to old quantity value
      const oldQuantity = orderFormContext.orderForm.items[itemIndex].quantity
      this.setState({ quantity: oldQuantity })
    }
    this.props.setUpdatingItemsState(false)
  }
  render() {
    return (
      <NumericStepper
        lean
        value={this.state.quantity}
        minValue={1}
        maxValue={this.state.canIncrease ? undefined : this.state.quantity}
        onChange={this.handleOnChange}
      />
    )
  }
}

export default injectIntl(withToast(orderFormConsumer(ProductQuantityStepper)))
