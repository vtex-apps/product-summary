import React from 'react'
import classNames from 'classnames'
import { Container } from 'vtex.store-components'

import productSummary from '../productSummary.css'

const Row = ({ children }) => {
  const showBorders = false
  const INFORMATION = `${productSummary.information} h-100 flex flex-column justify-between`
  const SUMMARYCLASSES = classNames(
    `${productSummary.element} pointer pt3 pb4 flex flex-column h-100`,
    {
      'bb b--muted-4 mh2 mt2': showBorders,
    }
  )
  return (
    <div className="">
      {children}
    </div>
  )
}

 export default Row
