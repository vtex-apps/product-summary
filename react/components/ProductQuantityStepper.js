import React, { Component } from 'react'
import PropTypes from 'prop-types'
import NumericStepper from 'vtex.styleguide/NumericStepper'
import { orderFormConsumer } from 'vtex.store/OrderFormContext'
import { debounce } from 'lodash'
import { findIndex, propEq } from 'ramda'

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
    }
    this.debouncedUpdate = debounce(this.updateItemQuantity, 1000)
  }

  handleOnChange = (e) => {
    e.stopPropagation()
    e.preventDefault()
    this.props.setUpdatingItemsState(true)
    this.setState({ quantity: e.value }, () => this.debouncedUpdate && this.debouncedUpdate(this.state.quantity))
  }

  updateItemQuantity = async (quantity) => {
    const { product, orderFormContext } = this.props
    const itemIndex = findIndex(propEq('id', product.sku.itemId))(orderFormContext.orderForm.items)
    try {
      await orderFormContext.updateOrderForm({
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
      await orderFormContext.refetch()
    } catch (err) {
      // gone wrong, rollback to old quantity value
      const oldQuantity = orderFormContext.orderForm.items[itemIndex].quantity
      this.setState({ quantity: oldQuantity })
    }
    this.props.setUpdatingItemsState(false)
  }
  render() {
    // Review this maxValue, how to get
    return (
      <NumericStepper
        lean
        value={this.state.quantity}
        minValue={1}
        maxValue={5}
        onChange={this.handleOnChange}
      />
    )
  }
}

export default orderFormConsumer(ProductQuantityStepper)
