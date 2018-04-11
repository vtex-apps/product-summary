import React, {Component} from 'react'
import QtdSelector from './QtdSelector'
import { FormattedNumber } from 'react-intl'

class TableShoppingCart extends Component {
  constructor(props) {
    super(props)
    this.state = {totalPrice: this.props.product.sellingPrice, currentQtd: 1}
  }

  updateTotalPrice = (quantity) => {
    const totalPrice = quantity * this.props.product.sellingPrice
    this.setState({totalPrice, currentQtd: quantity})
  }

  render() {
    const {name, sellingPrice, maxQtd} = this.props.product
    const {totalPrice, currentQtd, isSettingPrice} = this.state
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
              <QtdSelector
                qtdMax={maxQtd}
                updateTotalPrice={this.updateTotalPrice}
                currentQtd={currentQtd} />
            </td>
            <td className="pv2 ph3">R$ {totalPrice}</td>
          </tr>
        </tbody>
      </table>
    </div>)
  }
}

export default TableShoppingCart
