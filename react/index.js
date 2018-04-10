import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {ExtensionPoint, Link, Helmet} from 'render'
import {FormattedMessage, injectIntl, intlShape} from 'react-intl'

class GettingStartedIndex extends Component {
  static propTypes = {
    intl: intlShape,
    page: PropTypes.string,
    targetParams: PropTypes.object,
  }

  render () {
    const {page, targetParams = {}, intl: {formatMessage}} = this.props

    return (
      <article className="bg-serious-black">
        <ExtensionPoint id="product-image">
        </ExtensionPoint>
      </article>
    )
  }
}

export default injectIntl(GettingStartedIndex)
