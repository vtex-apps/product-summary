import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedNumber } from 'react-intl';

/**
 * The Price component. Shows the prices information of the Product Summary.
 */
export default class Price extends Component {

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
    // TODO: Internationalize ('de:', 'por:' 'ou em até nX de m')
    const {
      sellingPrice,
      listPrice,
      installments,
      installmentPrice,
      showListPrice
    } = this.props;

    const installmentElement = (
      (installments && installmentPrice) &&
      <div>
        <div className='dib'>ou até {installments}X de</div>
        <div className='dib ph2'>
          <FormattedNumber
            style='currency'
            currency={this.context.culture.currency}
            minimumFractionDigits={2}
            maximumFractionDigits={2}
            value={installmentPrice} />
        </div>
      </div>
    );

    return (
      <div className='tc b fabriga'>
        {
          (showListPrice) &&
          <div className='pv1'>
            <div className='dib'>de:</div>
            <div className='dib strike ph2'>
              <FormattedNumber
                style='currency'
                currency={this.context.culture.currency}
                minimumFractionDigits={2}
                maximumFractionDigits={2}
                value={listPrice} />
            </div>
          </div>
        }
        <div className='pv1'>
          <div className='dib'>por:</div>
          <div className='dib ph2'>
            <FormattedNumber
              style='currency'
              currency={this.context.culture.currency}
              minimumFractionDigits={2}
              maximumFractionDigits={2}
              value={sellingPrice} />
          </div>
        </div>
        {installmentElement}
      </div>
    );
  }
}
