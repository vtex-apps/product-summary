import React from 'react'
import { mount, shallow } from 'enzyme'

import ProductSummary from '../index'

describe('<ProductSummary /> component', () => {
  function renderComponent(customProps) {
    const intl = {
      formatMessage: {}
    }
    const props = {
      ...customProps,
      intl,
      runtime: { hints: {} },
    }

    const component = shallow(<ProductSummary {...props} />)

    return {
      component,
    }
  }

  it('should be mounted and not break', () => {
    const { component } = renderComponent()
    expect(component).toBeTruthy()
  })
})
