import React, { Component } from 'react'
import { FormattedNumber } from 'react-intl'
import PropTypes from 'prop-types'

/**
* The discount badge component. It receives the product's list and selling prices
* and calculates the discount percent to show it in the product's sumary.
*/
class DiscountBadge extends Component {
  /**
  * This method calculates the discount tax by the selling and list prices.
  */
  calculateDiscountTax() {
    const listPrice = this.props.listPrice
    const sellingPrice = this.props.sellingPrice
    return (listPrice - sellingPrice) / listPrice
  }

  render() {
    const percent = this.calculateDiscountTax()
    return (percent !== 0) &&
      <div className="f7 dark-gray absolute right-0 pa2-s bg-white">
        <FormattedNumber value={percent} style="percent" /> { this.props.label }
      </div>
  }
}

DiscountBadge.propTypes = {
  /** The product's default price */
  listPrice: PropTypes.number.isRequired,
  /** The product's price with discount */
  sellingPrice: PropTypes.number.isRequired,
  /** The label to track the discount percent */
  label: PropTypes.string,
}

DiscountBadge.defaultProps = {
  label: 'OFF',
}

export default DiscountBadge
