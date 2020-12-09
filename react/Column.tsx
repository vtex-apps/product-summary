import React from 'react'
import type { PropsWithChildren } from 'react'
import { useCssHandles } from 'vtex.css-handles'

const CSS_HANDLES = ['column'] as const

function Column({ children }: PropsWithChildren<{}>) {
  const { handles } = useCssHandles(CSS_HANDLES)

  return <div className={`${handles.column} flex items-center`}>{children}</div>
}

export default Column
