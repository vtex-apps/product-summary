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
      <div className="tc fabriga vtex-product-summary__price">
        {showListPrice && (
          <div className="pv1 f6 normal">
            {showLabels &&
              <div className="dib vtex-product-summary__price-list-price-label">
                <FormattedMessage id="pricing.from" />
              </div>
            }
            <div className="dib strike ph2 vtex-product-summary__price-list-price">
              {formatNumber(listPrice, currencyOptions)}
            </div>
          </div>
        )}
        <div className="pv1 b f4">
          { showLabels &&
            <div className="dib vtex-product-summary__price-selling-price-label">
              <FormattedMessage id="pricing.to" />
            </div>
          }
          <div className="dib ph2 vtex-product-summary__price-selling-price">
            {formatNumber(sellingPrice, currencyOptions)}
          </div>
        </div>
        {showInstallments && (
          <div className="f5">
            <div className="dib vtex-product-summary__price-installments">
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
  showListPrice: PropTypes.bool.isRequired,
  /** Determines if the labels are shown. If false, only the values will be shown */
  showLabels: PropTypes.bool.isRequired,
  /** Determines if the installments are shown */
  showInstallments: PropTypes.bool.isRequired,
  /** Available number of installments */
  installments: PropTypes.number,
  /** Single installment price */
  installmentPrice: PropTypes.number,
  /** intl property to format data */
  intl: intlShape.isRequired,
}

Price.defaultProps = {
  showListPrice: true,
  showLabels: true,
  showInstallments: false,
}

export default injectIntl(Price)
