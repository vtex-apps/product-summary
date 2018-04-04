import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage, injectIntl, intlShape } from 'react-intl'

/**
 * The Price component. Shows the prices information of the Product Summary.
 */
class Price extends Component {
  static contextTypes = {
    culture: PropTypes.object,
  }

  static schema = {
    title: 'Price',
    description: 'The price component for the Product Summary',
    type: 'object',
    properties: {
      showListPrice: {
        type: 'boolean',
        title: 'Show list price',
      },
    },
  }

  render() {
    const {
      sellingPrice,
      listPrice,
      installments,
      installmentPrice,
      showListPrice,
      intl: { formatNumber },
    } = this.props

    const currencyOptions = {
      style: 'currency',
      currency: this.context.culture.currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }

    return (
      <div className="tc b fabriga">
        {showListPrice && (
          <div className="pv1">
            <div className="dib">
              <FormattedMessage id="pricing.from" />
            </div>
            <div className="dib strike ph2">
              {formatNumber(listPrice, currencyOptions)}
            </div>
          </div>
        )}
        <div className="pv1">
          <div className="dib">
            <FormattedMessage id="pricing.to" />
          </div>
          <div className="dib ph2">
            {formatNumber(sellingPrice, currencyOptions)}
          </div>
        </div>
        {installments &&
          installmentPrice && (
            <div>
              <div className="dib">
                <FormattedMessage
                  id="pricing.installment-display"
                  values={{
                    installments,
                    installmentPrice: formatNumber(
                      installmentPrice,
                      currencyOptions
                    ),
                  }}
                />
              </div>
            </div>
          )}
      </div>
    )
  }
}

Price.propTypes = {
  /** Product selling price */
  sellingPrice: PropTypes.number.isRequired,
  /** Product list price */
  listPrice: PropTypes.number.isRequired,
  /** Determines if the list price is shown or not */
  showListPrice: PropTypes.bool,
  /** Available number of installments */
  installments: PropTypes.number,
  /** Single installment price */
  installmentPrice: PropTypes.number,
  /** intl property to format data */
  intl: intlShape.isRequired,
}

export default injectIntl(Price)
