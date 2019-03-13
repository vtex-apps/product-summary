import React from 'react'
import { MockedProvider } from 'react-apollo/test-utils'
import * as reactTestingLibrary from 'react-testing-library'
import { IntlProvider } from 'react-intl'
import defaultStrings from '../../messages/en.json'
import { MINICART_ITEMS_QUERY } from '../components/ProductQuantityStepper'

const mocks = [
  {
    request: {
      query: MINICART_ITEMS_QUERY,
    },
    result: {
      data: {
        minicart: {
          items: [],
        },
      },
    },
  },
]

const customRender = (node, options) => {
  const rendered = reactTestingLibrary.render(
    <MockedProvider mocks={mocks}>
      <IntlProvider messages={defaultStrings} locale="en-US">
        {node}
      </IntlProvider>
    </MockedProvider>,
    options
  )

  return {
    ...rendered,
    rerender: newUi =>
      customRender(newUi, {
        container: rendered.container,
        baseElement: rendered.baseElement,
      }),
  }
}

// re-export everything
module.exports = {
  ...reactTestingLibrary,
  render: customRender,
}
