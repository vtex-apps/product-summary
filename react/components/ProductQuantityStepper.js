import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { NumericStepper, withToast } from 'vtex.styleguide'
import { debounce } from 'lodash'
import { findIndex, propEq } from 'ramda'
import { injectIntl, intlShape } from 'react-intl'
import { compose, graphql } from 'react-apollo'
import gql from 'graphql-tag'

import { productShape } from '../utils/propTypes'

export const MINICART_ITEMS_QUERY = gql`
  query {
    minicart @client {
      items {
        id
        name
        imageUrl
        detailUrl
        skuName
        quantity
        sellingPrice
        listPrice
        seller
        index
        parentItemIndex
        parentAssemblyBinding
      }
    }
  }
`

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
    } = this.props
    if (prevQuantity !== quantity) {
      this.setState({ quantity })
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

  checkUpdatedQuantity = (updateResponse, itemIndex, expectedQuantity) => {
    const { showToast, intl } = this.props
    const actualQuantity = updateResponse.items[itemIndex].quantity
    if (actualQuantity !== expectedQuantity) {
      this.setState({ canIncrease: false, quantity: actualQuantity })
      showToast({
        message: intl.formatMessage({
          id: 'editor.productSummary.quantity-error',
        }),
      })
    }
  }

  updateItemQuantity = async quantity => {
    const { product, minicartItems, updateItems } = this.props
    this.setState({ canIncrease: true })
    const itemIndex = findIndex(propEq('id', product.sku.itemId), minicartItems)
    try {
      await updateItems([
        {
          ...minicartItems[itemIndex],
          index: itemIndex,
          quantity,
          seller: product.sku.sellerId,
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

const withLinkStateItemsQuery = graphql(MINICART_ITEMS_QUERY, {
  props: ({ data: { minicart } }) => ({
    minicartItems: minicart && minicart.items,
  }),
})

const withUpdateItemsMutation = graphql(UPDATE_ITEMS_MUTATION, {
  props: ({ mutate }) => ({
    updateItems: items => mutate({ variables: { items } }),
  }),
})

export default compose(
  injectIntl,
  withToast,
  withUpdateItemsMutation,
  withLinkStateItemsQuery
)(ProductQuantityStepper)
