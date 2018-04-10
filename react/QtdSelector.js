import { Component } from 'react'

class QtdSelector extends Component {
  render() {
    const { qtdMax } = this.props
    return <input type="number" name="quantity" min="1" max={ qtdMax } defaultValue={ 1 } />
  }
}

QtdSelector.propTypes = {
  /** The product's maximous quantity that the client can buy */
  qtdMax: PropTypes.number.isRequired,
}

export default QtdSelector
