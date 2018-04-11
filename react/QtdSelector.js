import React, { Component } from 'react'
import PropTypes from 'prop-types'

/**
* The quantity selector component.
* It constrols how many products a client wants to buy.
*/
class QtdSelector extends Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {
    const qtdMax = this.props.qtdMax
    var quantity = event.target.value
    if (quantity > qtdMax) {
      quantity = qtdMax
      this.props.onMaxReached()
    } else if (quantity < 0) {
      quantity = 0
    }
    this.props.updateTotalPrice(quantity)
  }

  render() {
    const {qtdMax, currentQtd} = this.props
    return (<input className="f4 dark-gray br2-l" type="number" name="quantity"
      min="0" max={qtdMax} value={currentQtd} onChange={this.handleChange} />)
  }
}

QtdSelector.propTypes = {
  /** The product's maximum quantity that the client can buy */
  qtdMax: PropTypes.number.isRequired,
  /** This is the current quantity to be setted as the initial value */
  currentQtd: PropTypes.number,
  /** This function is called when the client set the quantity selector. It is useful to set the
  total price in the parent for exemple */
  updateTotalPrice: PropTypes.func,
  /** This function is useful to tell the user that can't buy more itens then the maximum limit */
  onMaxReached: PropTypes.func,
}

QtdSelector.defaultProps = {
  currentQtd: 1,
  onMaxReached: () => {},
  updateTotalPrice: () => {},
}

export default QtdSelector
