import React, { Component } from 'react'
import PropTypes from 'prop-types'

/**
* The quantity selector component. It receives the maximous quantity that a client
* can put in the shopping cart and a function that is called when that limit is reached.
*/
class QtdSelector extends Component {
  constructor(props) {
    super(props)
    this.state = { qtd: 1 }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {
    const qtdMax = this.props.qtdMax
    var quantity = event.target.value
    if (quantity > qtdMax) {
      quantity = qtdMax
      this.props.maxReached()
    } else if (quantity < 0) {
      quantity = 0
    }
    this.setState({ qtd: quantity })
  }

  render() {
    return (<input
      className="f4 dark-gray br2-l" type="number" name="quantity"
      min="0" max={this.props.qtdMax} value={this.state.qtd} onChange={this.handleChange} />)
  }
}

QtdSelector.propTypes = {
  /** The product's maximous quantity that the client can buy */
  qtdMax: PropTypes.number.isRequired,
  /** This function is useful to tell the user that can't put more itens then the maximous limit */
  maxReached: PropTypes.func,
}

QtdSelector.defaultProps = {
  maxReached: () => {},
}

export default QtdSelector
