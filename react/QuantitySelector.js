import React, { Component } from 'react'
import PropTypes from 'prop-types'

/**
* The quantity selector component.
*/
class QuantitySelector extends Component {
  constructor(props) {
    super(props)
  }

  handleChange = (event) => {
    const maxQuantity = this.props.maxQuantity
    let quantity = event.target.value
    if (quantity > maxQuantity) {
      quantity = maxQuantity
      this.props.onMaxReached()
    } else if (quantity < 0) {
      quantity = 0
    }
    this.props.updateTotalPrice(quantity)
  }

  render() {
    const {maxQuantity, currentQuantity} = this.props
    return (<input className="f4 dark-gray br2-l" type="number" name="quantity"
      min="0" max={maxQuantity} value={currentQuantity} onChange={this.handleChange} />)
  }
}

QuantitySelector.propTypes = {
  /** The product's maximum quantity that the client can buy */
  maxQuantity: PropTypes.number.isRequired,
  /** This is the current quantity to be setted as the initial value */
  currentQuantity: PropTypes.number.isRequired,
  /** This function is called when the client set the quantity selector. It is useful to set the
  total price in the parent for example */
  updateTotalPrice: PropTypes.func.isRequired,
  /** This function is useful to tell the user that can't buy more items than the maximum limit */
  onMaxReached: PropTypes.func.isRequired,
}

export default QuantitySelector
