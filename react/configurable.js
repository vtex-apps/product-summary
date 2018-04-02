import React from 'react'

export default function configurable({show, titleScale = 2, textScale = 4, title, text}) {
  if (!show) {
    return null
  }
  return (
    <div>
      <h1 className={`f${titleScale}`}>
        {title}
      </h1>
      <p className={`f${textScale}`}>
        {text}
      </p>
    </div>
  )
}

configurable.schema = {
  title: 'Configurable',
  description: 'A simple configurable component',
  type: 'object',
  properties: {
    show: {
      type: 'boolean',
      title: 'Show component'
    },
    title: {
      type: 'string',
      title: 'Title',
    },
    titleScale: {
      type: 'integer',
      title: 'Title scale',
    },
    text: {
      type: 'string',
      title: 'Text',
    },
    textScale: {
      type: 'integer',
      title: 'Text scale',
    }
  }
}
