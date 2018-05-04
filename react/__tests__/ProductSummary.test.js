import React from 'react'
import { mount } from 'enzyme'

import ProductSummary from '../ProductSummary'

describe('<ProductSummary /> component', () => {
  function renderComponent(customProps) {
    const props = {
      ...customProps,
    }

    const component = mount(<ProductSummary {...props} />)

    return {
      component,
    }
  }

  it('should be mounted and not break', () => {
    const { component } = renderComponent()
    expect(component).toBeTruthy()
  })
})
