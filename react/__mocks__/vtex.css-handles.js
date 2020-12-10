export const useCssHandles = (input) => {
  const handles = input.reduce((acc, cur) => {
    acc[cur] = cur

    return acc
  }, {})

  return { handles, withModifiers: (name) => name }
}
