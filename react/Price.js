import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';

/**
 * The Price component. Shows the prices information of the Product Summary.
 */
class Price extends Component {

  /**
   * Component properties
   * 
   * @type {Object}
   * @property {number} sellingPrice - Product selling price
   * @property {number} listPrice - Product list price
   * @property {boolean} [showListPrice] - Determines if the list price is shown or not
   * @property {number} [installments] - Available number of installments
   * @property {number} [installmentPrice] - Single installment price
   */
  static propTypes = {
    sellingPrice: PropTypes.number.isRequired,
    listPrice: PropTypes.number.isRequired,
    showListPrice: PropTypes.bool,
    installments: PropTypes.number,
    installmentPrice: PropTypes.number
  };

  static contextTypes = {
    culture: PropTypes.object,
  }

  /**
   * Reders the component showing the list price, selling price and installment information if there is any.
   */
  render() {
    const {
      sellingPrice,
      listPrice,
      installments,
      installmentPrice,
      showListPrice,
      intl: { formatNumber }
    } = this.props;

    const currencyOptions = {
      style: 'currency',
      currency: this.context.culture.currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    };

    const installmentElement = (
      (installments && installmentPrice) &&
      <div>
        <div className='dib'>
          <FormattedMessage
            id='pricing.installment-display'
            values={{
              installments,
              installmentPrice: formatNumber(installmentPrice, currencyOptions)
            }} />
        </div>
      </div>
    );

    const listPriceElement = (
      (showListPrice) &&
      <div className='pv1'>
        <div className='dib'>
          <FormattedMessage id='pricing.from'/>
        </div>
        <div className='dib strike ph2'>
        { formatNumber(listPrice, currencyOptions) }
        </div>
      </div>
    );

    const sellingPriceElement = (
      <div className='pv1'>
        <div className='dib'>
          <FormattedMessage id='pricing.to'/>
        </div>
        <div className='dib ph2'>
          { formatNumber(sellingPrice, currencyOptions) }
        </div>
      </div>
    );

    return (
      <div className='tc b fabriga'>
        { listPriceElement }
        { sellingPriceElement }
        { installmentElement }
      </div>
    );
  }
}

export default injectIntl(Price);
