import React from 'react'

export function Link({ children }) {
  return children
}

export function ExtensionPoint(props) {
  return (
    <div {...props} />
  )
}

export function withRuntimeContext(Comp) {
  return Comp
}
