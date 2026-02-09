/**
 * Type for data attributes that must start with 'data-'
 * Note: TypeScript 3.9 doesn't support template literal types,
 * so this is a documentation type. Runtime validation ensures keys start with 'data-'
 */
export type DataAttributes = Record<string, string>

export const sanitizeDataAttributes = (
  extraProductProps?: DataAttributes
): DataAttributes | undefined => {
  if (!extraProductProps) return undefined

  const sanitized: DataAttributes = {}
  const invalidKeys: string[] = []

  Object.keys(extraProductProps).forEach((key) => {
    if (key.startsWith('data-')) {
      sanitized[key] = extraProductProps[key]
    } else {
      invalidKeys.push(key)
    }
  })

  if (invalidKeys.length > 0) {
    console.warn(
      `extraProductProps contains keys that don't start with 'data-': ${invalidKeys.join(
        ', '
      )}`
    )
  }

  return Object.keys(sanitized).length > 0 ? sanitized : undefined
}
