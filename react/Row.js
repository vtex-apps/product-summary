import React, { FunctionComponent } from 'react'
import classNames from 'classnames'

const Row : FunctionComponent<any> = ({ children, rowClasses }) => {
  const rowComponentClasses = classNames({
    [rowClasses]: !!rowClasses
  })
  return (
    <div className={rowComponentClasses}>
      {children}
    </div>
  )
}

Row.defaultProps = {
  rowClasses: '',
}

Row.getSchema = () => {
  return {
    title: 'editor.productSummary.title',
    description: 'editor.productSummary.description',
    type: 'object',
    properties: {
      rowClasses: {
        type: 'string',
        title: 'editor.productSummary.rowClasses.title',
        isLayout: true,
      },
    }
  }
}

export default Row
