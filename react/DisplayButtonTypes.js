const displayButtonTypes = {
  DISPLAY_ALWAYS: {
    name: 'editor.productSummary.displayBuyButton.option.always',
    value: 'displayButtonAlways',
  },
  DISPLAY_ON_HOVER: {
    name: 'editor.productSummary.displayBuyButton.option.hover',
    value: 'displayButtonHover',
  },
  DISPLAY_NONE: {
    name: 'editor.productSummary.displayBuyButton.option.none',
    value: 'displayButtonNone',
  },
}

export function getDisplayButtonNames() {
  const names = []
  for (const key in displayButtonTypes) {
    names.push(displayButtonTypes[key].name)
  }
  return names
}

export function getDisplayButtonValues() {
  const values = []
  for (const key in displayButtonTypes) {
    values.push(displayButtonTypes[key].value)
  }
  return values
}

export default displayButtonTypes
