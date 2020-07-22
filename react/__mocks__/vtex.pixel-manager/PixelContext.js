import React from 'react'

export function Pixel(Comp) {
  return function ComposedComponent(props) {
    return <Comp {...props} push={() => {}} subscribe={() => {}} />
  }
}
