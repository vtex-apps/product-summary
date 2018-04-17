import React from 'react'
import { mountWithIntl, loadTranslation } from 'enzyme-react-intl'

import { getIntlContextInfo, getIntlInstance } from './helpers/intlHelper'
import ProductImage from '../ProductImage'

describe('<ProductImage /> component', () => {
  const productImagePropsMock = {
    images: [
      {
        imageUrl: "https://www.pontofrio-imagens.com.br/Informatica/Notebook/11483028/816389617/notebook-acer-core-i5-7200u-8gb-1tb-tela-15-6-windows-10-aspire-f5-573-51lj-11483028.jpg",
        imageText: ""
      }
    ],
    orientation: "VERTICAL"
  }

  const defaultConfiguration = {}

  function renderComponent(customProps, intlInfo = getIntlContextInfo()) {
    const props = Object.assign({}, productImagePropsMock, defaultConfiguration, customProps)
    const { context, childContextTypes, locale } = intlInfo

    const intl = getIntlInstance({ locale }, context)
    loadTranslation(`../locales/${locale}.json`)

    const component = mountWithIntl(
      <ProductImage {...props} />, { context, childContextTypes }
    )

    return {
      component,
      intl,
      ...intlInfo,
    }
  }

  it('should be mounted properly without breaking', () => {
    const { component } = renderComponent()
    expect(component).toBeTruthy()
  })
})
