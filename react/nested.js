import React from 'react'
import {Link} from 'render'

import './nested.global.css'

const Nested = ({params, page, targetParams = {}, children}) =>
  <div className="nested pa4 ph7 pt0 georgia mw8 center near-white f4">
    <h1>> Nested Route</h1>
    <Link page={page} params={targetParams} className="f4 fw6 db rebel-pink no-underline underline-hover pointer">
      Link to {page} with params: {JSON.stringify(targetParams)}
    </Link>
    <p>
      Props:
    </p>
    <p>
      {JSON.stringify({params, page, targetParams})}
    </p>
    {children}
  </div>

Nested.schema = {
  title: 'Nested',
  description: 'A nested component with a link',
  type: 'object',
  properties: {
    to: {
      type: 'string',
      title: 'Link to',
    },
  },
}

export default Nested
