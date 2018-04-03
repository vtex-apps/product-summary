import React, {Component} from 'react';
import {FormattedNumber} from 'react-intl';

class DiscountBadge extends Component {

  calculatePercentage() {
    return (this.props.listPrice - this.props.sellingPrice) / this.props.listPrice;
  }

  render() {
    const percent = this.calculatePercentage();
    return (percent) &&
      <div className="f7 dark-gray absolute right-0 pa2-s bg-white">
        <FormattedNumber value={percent} style="percent"/> OFF
      </div>;
  }
}

export default DiscountBadge;
