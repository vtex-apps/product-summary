import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { NumericStepper, withToast } from 'vtex.styleguide'
import { debounce } from 'lodash'
import { injectIntl, intlShape } from 'react-intl'
import { compose, graphql } from 'react-apollo'
import gql from 'graphql-tag'

import { productShape } from '../utils/propTypes'

export const UPDATE_ITEMS_MUTATION = gql`
  mutation updateItems($items: [MinicartItem]) {
    updateItems(items: $items) @client
  }
`

class ProductQuantityStepper extends Component {
  static propTypes = {
    product: productShape.isRequired,
    onUpdateItemsState: PropTypes.func.isRequired,
    showToast: PropTypes.func,
    intl: intlShape,
    minicartItems: PropTypes.array,
    updateItems: PropTypes.func.isRequired,
  }

  state = {
    quantity: this.props.product.quantity,
    canIncrease: true,
  }

  componentDidUpdate = prevProps => {
    const {
      product: { quantity: prevQuantity },
    } = prevProps
    const {
      product: { quantity },
      showToast,
      intl,
    } = this.props
    if (prevQuantity !== quantity) {
      const canIncrease = quantity === this.state.quantity
      this.setState({ quantity, canIncrease })
      if (!canIncrease) {
        showToast({
          message: intl.formatMessage({
            id: 'editor.productSummary.quantity-error',
          }),
        })
      }
    }
  }

  handleOnChange = e => {
    e.stopPropagation()
    e.preventDefault()
    this.props.onUpdateItemsState(true)
    this.setState({ quantity: e.value }, () =>
      this.debouncedUpdate(this.state.quantity)
    )
  }

  updateItemQuantity = async quantity => {
    const { product, updateItems } = this.props
    this.setState({ canIncrease: true })
    const {
      sku: { itemId: id },
      seller = {},
      cartIndex,
    } = product
    try {
      await updateItems([
        {
          id,
          quantity,
          seller: seller.sellerId,
          index: cartIndex,
        },
      ])
    } catch (err) {
      // gone wrong, rollback to old quantity value
      console.error(err)
    }
    this.props.onUpdateItemsState(false)
  }

  debouncedUpdate = debounce(this.updateItemQuantity, 1000)

  render() {
    return (
      <NumericStepper
        lean
        size="small"
        value={this.state.quantity}
        minValue={1}
        maxValue={this.state.canIncrease ? undefined : this.state.quantity}
        onChange={this.handleOnChange}
      />
    )
  }
}

const withUpdateItemsMutation = graphql(UPDATE_ITEMS_MUTATION, {
  props: ({ mutate }) => ({
    updateItems: items => mutate({ variables: { items } }),
  }),
})

export default compose(
  injectIntl,
  withToast,
  withUpdateItemsMutation
)(ProductQuantityStepper)
