import React from 'react'
import { mountWithIntl, loadTranslation } from 'enzyme-react-intl'

import { getIntlContextInfo, getIntlInstance } from './helpers/intlHelper'
import ProductImage from '../ProductImage'

describe('<ProductImage /> component', () => {
  const productImagePropsMock = {}
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

  it('should be mounted without breaking', () => {
    const { component } = renderComponent()
    expect(
      component
    ).toBeTruthy()
  })

  it('should hide thumbnail slider if the number of images is not greater than one', () => {
    const { component } = renderComponent({
      images: [ { imageUrl: "", imageText: "" } ]
    })
    expect(
      component.find('.slick-list')
    ).toBeUndefined
  })

  describe('<ThumbnailSlider /> component', () => {  
    const MAX_VISIBLE_ITEMS = 4
    const NUM_OF_VISIBLE_ITEMS = 2
    const INVALID_NUM_OF_VISIBLE_ITEMS = 10

    it('should display at most MAX_VISIBLE_ITEMS thumbnail items at same time', () => {
      const { component } = renderComponent()
      expect(
        component.find('.slick-active').length
      ).toBeLessThanOrEqual(MAX_VISIBLE_ITEMS)
    })

    it('should display NUM_OF_VISIBLE_ITEMS thumbnail items that is passed as a props, since that this number is less than or qual to MAX_VISIBLE_ITEMS', () => {
      const { component } = renderComponent({
        thumbnailMaxVisibleItems: NUM_OF_VISIBLE_ITEMS
      })
      expect(
        component.find('.slick-active').length
      ).toBe(NUM_OF_VISIBLE_ITEMS)
    })

    it('should display the entire image of thumbnails if this number is less than the NUM_OF_VISIBLE_ITEMS that is passed as a props', () => {
      const images = [ { imageUrl: "", imageText: "" },
                       { imageUrl: "", imageText: "" } ]
      const { component } = renderComponent({
        images: images,
        thumbnailMaxVisibleItems: INVALID_NUM_OF_VISIBLE_ITEMS
      })
      expect(
        component.find('.slick-active').length
      ).toBe(images.length)
    })
  })
})
