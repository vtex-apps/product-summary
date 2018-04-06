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

  render() {
    const {
      sellingPrice,
      listPrice,
      installments,
      installmentPrice,
      showListPrice,
      showInstallments,
      showLabels,
      intl: { formatNumber },
    } = this.props

    const currencyOptions = {
      style: 'currency',
      currency: this.context.culture.currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }

    const formattedInstallmentPrice = formatNumber(installmentPrice, currencyOptions)

    return (
      <div className="tc b fabriga">
        {showListPrice && (
          <div className="pv1">
            {showLabels &&
              <div className="dib">
                <FormattedMessage id="pricing.from" />
              </div>
            }
            <div className="dib strike ph2">
              {formatNumber(listPrice, currencyOptions)}
            </div>
          </div>
        )}
        <div className="pv1">
          { showLabels &&
            <div className="dib">
              <FormattedMessage id="pricing.to" />
            </div>
          }
          <div className="dib ph2">
            {formatNumber(sellingPrice, currencyOptions)}
          </div>
        </div>
        {showInstallments && installments &&
          installmentPrice && (
          <div>
            <div className="dib">
              { showLabels ? (
                <FormattedMessage
                  id="pricing.installment-display"
                  values={{
                    installments,
                    installmentPrice: formattedInstallmentPrice,
                  }}
                />
              ) : (
                <span>{installments}X {formattedInstallmentPrice}</span>
              )
              }
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
  /** Determines if the labels are shown. If false, only the values will be shown */
  showLabels: PropTypes.bool,
  /** Determines if the installments are shown */
  showInstallments: PropTypes.bool,
  /** Available number of installments */
  installments: PropTypes.number,
  /** Single installment price */
  installmentPrice: PropTypes.number,
  /** intl property to format data */
  intl: intlShape.isRequired,
}

export default injectIntl(Price)
