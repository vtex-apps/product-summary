import React from 'react'
import classNames from 'classnames'

const Column = ({ children }) => {
  return (
    <div className="flex items-center">
      {children}
    </div>
  )
}

export default Column
