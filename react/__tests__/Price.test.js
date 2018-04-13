/* eslint-env jest */
import React from 'react'
import { mountWithIntl, loadTranslation } from 'enzyme-react-intl'

import { getIntlContextInfo, getIntlInstance } from './helpers/intlHelper'
import Price from '../Price'

describe('<Price /> component', () => {
  let renderComponent, productPropsMock, configuration
  let intl, currencyOptions

  beforeEach(() => {
    const { context, childContextTypes, locale } = getIntlContextInfo()

    currencyOptions = {
      style: 'currency',
      currency: context.culture.currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }

    productPropsMock = {
      listPrice: 200,
      sellingPrice: 170,
      installments: 3,
      installmentPrice: 50,
    }
    configuration = {}

    intl = getIntlInstance()
    loadTranslation(`../locales/${locale}.json`)

    renderComponent = () => mountWithIntl(
      <Price {...productPropsMock} {...configuration} />, { context, childContextTypes }
    )
  })

  it('should be mounted and not break', () => {
    const component = renderComponent()
    expect(component).toMatchSnapshot()
  })

  it('should not show the list price if prop showListPrice is false', () => {
    configuration.showListPrice = false

    const component = renderComponent()

    expect(component.prop('showListPrice')).toBe(false)
    expect(component.contains(intl.formatMessage({ id: 'pricing.from' }))).toBe(false)
    expect(component.contains(intl.formatMessage({ id: 'pricing.to' }))).toBe(true)
    expect(component.contains(intl.formatNumber(productPropsMock.sellingPrice, currencyOptions))).toBe(true)
    expect(component.contains(intl.formatNumber(productPropsMock.listPrice, currencyOptions))).toBe(false)
  })

  describe('with no configuration', () => {
    it('should show the list price by default', () => {
      const component = renderComponent()
      expect(component.contains(intl.formatNumber(productPropsMock.listPrice, currencyOptions))).toBe(true)
    })

    it('should show the price labels by default', () => {
      const component = renderComponent()
      expect(component.contains(intl.formatMessage({ id: 'pricing.from' }))).toBe(true)
      expect(component.contains(intl.formatMessage({ id: 'pricing.to' }))).toBe(true)
    })

    it('should not show the installments by default', () => {
      const component = renderComponent()
      const formattedInstallmentPrice = intl.formatNumber(productPropsMock.installmentPrice, currencyOptions)
      const formattedMessage = intl.formatMessage({ id: 'pricing.installment-display' }, {
        installments: productPropsMock.installments,
        installmentPrice: formattedInstallmentPrice,
      })
      expect(component.contains(formattedMessage)).toBe(false)
    })
  })
})
