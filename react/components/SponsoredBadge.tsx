import classNames from 'classnames'
import React from 'react'
import { useCssHandles } from 'vtex.css-handles'
import { IOMessage } from 'vtex.native-types'

const CSS_HANDLES = ['sponsoredBadgeContainer', 'sponsoredBadgeText'] as const

type Props = {
  /**
   * The message ID or string for the sponsored label.
   */
  label?: string
}

export const SponsoredBadge = ({
  label = 'store/sponsoredBadge.title',
}: Props) => {
  const { handles } = useCssHandles(CSS_HANDLES)

  const containerClasses = classNames(
    handles.sponsoredBadgeContainer,
    'absolute z-1'
  )

  const textClasses = classNames(
    handles.sponsoredBadgeText,
    'c-muted-1 t-mini-s'
  )

  return (
    <div className={containerClasses}>
      <span className={textClasses}>
        <IOMessage id={label} />
      </span>
    </div>
  )
}
