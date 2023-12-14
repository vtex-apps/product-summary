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

  /**
   * Whether to show the sponsored label text.
   */
  showLabel?: boolean
}

export const SponsoredBadge = ({
  label = 'store/sponsoredBadge.title',
  showLabel = false,
}: Props) => {
  const { handles } = useCssHandles(CSS_HANDLES)

  const containerClasses = classNames(
    handles.sponsoredBadgeContainer,
    'absolute top-0 z-1'
  )

  const textClasses = classNames(
    handles.sponsoredBadgeText,
    'c-muted-1 t-mini-s'
  )

  return (
    <div className={containerClasses}>
      <span className={textClasses}>
        {showLabel ? <IOMessage id={label} /> : null}
      </span>
    </div>
  )
}
