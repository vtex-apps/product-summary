import React, {Component} from 'react'
import QuantitySelector from './QuantitySelector'
import { FormattedNumber } from 'react-intl'

class TableShoppingCart extends Component {
  constructor(props) {
    super(props)
    this.state = {totalPrice: this.props.product.sellingPrice, currentQuantity: 1}
  }

  updateTotalPrice = (quantity) => {
    const totalPrice = quantity * this.props.product.sellingPrice
    this.setState({totalPrice, currentQuantity: quantity})
  }

  render() {
    const {name, sellingPrice, maxQuantity} = this.props.product
    const {totalPrice, currentQuantity, isSettingPrice} = this.state
    return (<div>
      <table className="collapse ba br2 b--black-10 pv2 ph3">
        <tbody>
          <tr>
            <th className="pv2 ph3 tl f6 fw6 ttu">Produto</th>
            <th className="pv2 ph3 tl f6 fw6 ttu">Preço unitário</th>
            <th className="pv2 ph3 tl f6 fw6 ttu">Quantidade</th>
            <th className="pv2 ph3 tl f6 fw6 ttu">Preço total</th>
          </tr>
          <tr>
            <td className="pv2 ph3">{name}</td>
            <td className="pv2 ph3">R$ {sellingPrice}</td>
            <td className="pv2 ph3">
              <QuantitySelector
                maxQuantity={maxQuantity}
                updateTotalPrice={this.updateTotalPrice}
                currentQuantity={currentQuantity} />
            </td>
            <td className="pv2 ph3">R$ {totalPrice}</td>
          </tr>
        </tbody>
      </table>
    </div>)
  }
}

export default TableShoppingCart
