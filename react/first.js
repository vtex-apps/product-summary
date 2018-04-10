import React from 'react'
import {FormattedMessage, FormattedHTMLMessage} from 'react-intl'
import DiscountBadge from './DiscountBadge'
import QtdSelector from './QtdSelector'

const product = {
  listPrice: 200,
  sellingPrice: 150,
}

const FirstStep = () =>
  <div>
    <div>
      <QtdSelector qtdMax={7} />
    </div>
    <div className="relative dib">
      <DiscountBadge listPrice={product.listPrice} sellingPrice={product.sellingPrice} />
      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSd0cHfPOO0tneOT0AH3UDs7BumkdOVHZtv4DL55dFtInS2q8mi"/>
    </div>
    <h2>
      <FormattedMessage id="getting-started.first-steps-header"/>
    </h2>
    <p>
      <FormattedHTMLMessage id="getting-started.toolbelt"/>
    </p>
    <code className="code">
      <pre className="pre bg-near-black pa6 mv6">
{`  $ npm install -g vtex
`}
      </pre>
    </code>
    <p>
      <FormattedHTMLMessage id="getting-started.workspace-creation"/>
    </p>
    <code className="code">
      <pre className="pre bg-near-black pa6 mv6">
{`  $ vtex login
? Email: seuemail@vtex.com
? Account: ${global.__RUNTIME__.account}
! Please check your email - we've sent you a temporary code.
? Code:
? Workspaces: Create new workspace...
? New workspace name: meu-workspace-unico
`}
      </pre>
    </code>
    <p>
      <FormattedHTMLMessage id="getting-started.workspace-description"/>
    </p>
    <p>
      <FormattedMessage id="getting-started.clone"/>
    </p>
    <code className="code">
      <pre className="pre bg-near-black pa6 mv6">
{`  $ git clone git@github.com:vtex-apps/render-getting-started.git
  $ cd render-getting-started
  $ vtex local eslint
`}
      </pre>
    </code>
    <p>
      <FormattedMessage id="getting-started.synchronize"/> ✨
    </p>
    <p>
      <FormattedHTMLMessage id="getting-started.watch"/>
    </p>
    <code className="code">
      <pre className="pre bg-near-black pa6 mv6">
{`  $ vtex install vtex.builder-hub
info:    Installed app vtex.builder-hub@0.x successfully
  $ vtex link
info:    Linking app vtex.getting-started
Your URL: http://meu-workspace-unico.basedevmkp.myvtex.com/getting-started
`}
      </pre>
    </code>
    <p>
      <FormattedHTMLMessage id="getting-started.online"/>
    </p>
    <p>
      <FormattedMessage id="getting-started.edit-file"
        values={{ fileName: <i>react/second.js</i> }}
      />
    </p>
    <p>
      <FormattedMessage id="getting-started.change-css"/>
    </p>
    <code className="code">
      <pre className="pre bg-near-black pa6 mv6">
{`  // Before
<h2 className="dn">

// After
<h2 className="green">
`}
      </pre>
    </code>
    <p>
      <FormattedHTMLMessage id="getting-started.save"/>
    </p>
  </div>

export default FirstStep
