import React from 'react'
import { ExtensionPoint, useRuntime } from 'vtex.render-runtime'

 const CustomProductSummary = () => {
   return (
    <React.Fragment>
      <ExtensionPoint id="unstable--product-summary-layout" />
    </React.Fragment>
  )
}

 export default CustomProductSummary
