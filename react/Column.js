import React, { FunctionComponent } from 'react'
import classNames from 'classnames'

const Column : FunctionComponent = ({ children }) => {
  return (
    <div className="flex items-center">
      {children}
    </div>
  )
}

export default Column
