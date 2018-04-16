import React from 'react'
import { mountWithIntl, loadTranslation } from 'enzyme-react-intl'

import { getIntlContextInfo, getIntlInstance } from './helpers/intlHelper'
import Price from '../Price'

describe('<Price /> component', () => {
  const productPropsMock = {
    listPrice: 200,
    sellingPrice: 170,
    installments: 3,
    installmentPrice: 50,
  }

  const defaultConfiguration = {}

  function renderComponent(props = { ...productPropsMock, ...defaultConfiguration }, intlInfo = getIntlContextInfo()) {
    const { context, childContextTypes, locale } = intlInfo

    const intl = getIntlInstance({ locale }, context)
    loadTranslation(`../locales/${locale}.json`)

    const component = mountWithIntl(
      <Price {...props} />, { context, childContextTypes }
    )

    return {
      component,
      intl,
      ...intlInfo,
    }
  }

  function getCurrencyOptions(context = getIntlContextInfo().context) {
    return {
      style: 'currency',
      currency: context.culture.currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }
  }

  it('should be mounted and not break', () => {
    const { component } = renderComponent()
    expect(component).toMatchSnapshot()
  })

  it('should not show the list price if prop showListPrice is false', () => {
    const props = Object.assign({}, productPropsMock, defaultConfiguration, { showListPrice: false })
    const { component, context, intl } = renderComponent(props)
    const currencyOptions = getCurrencyOptions(context)

    expect(component.prop('showListPrice')).toBe(false)
    expect(component.contains(intl.formatMessage({ id: 'pricing.from' }))).toBe(false)
    expect(component.contains(intl.formatMessage({ id: 'pricing.to' }))).toBe(true)
    expect(component.contains(intl.formatNumber(productPropsMock.sellingPrice, currencyOptions))).toBe(true)
    expect(component.contains(intl.formatNumber(productPropsMock.listPrice, currencyOptions))).toBe(false)
  })

  describe('with no configuration', () => {
    it('should show the list price by default', () => {
      const { component, context, intl } = renderComponent()
      const currencyOptions = getCurrencyOptions(context)

      expect(component.contains(intl.formatNumber(productPropsMock.listPrice, currencyOptions))).toBe(true)
    })

    it('should show the price labels by default', () => {
      const { component, intl } = renderComponent()
      expect(component.contains(intl.formatMessage({ id: 'pricing.from' }))).toBe(true)
      expect(component.contains(intl.formatMessage({ id: 'pricing.to' }))).toBe(true)
    })

    it('should not show the installments by default', () => {
      const { component, context, intl } = renderComponent()
      const currencyOptions = getCurrencyOptions(context)
      const formattedInstallmentPrice = intl.formatNumber(productPropsMock.installmentPrice, currencyOptions)
      const formattedMessage = intl.formatMessage({ id: 'pricing.installment-display' }, {
        installments: productPropsMock.installments,
        installmentPrice: formattedInstallmentPrice,
      })
      expect(component.contains(formattedMessage)).toBe(false)
    })
  })
})
