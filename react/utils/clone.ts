export default function clone(aObject: object) {
  if (!aObject) {
    return aObject
  }

  let v
  const bObject = Array.isArray(aObject) ? [] : {}

  for (const k in aObject) {
    // @ts-expect-error
    v = aObject[k]
    // @ts-expect-error
    bObject[k] = typeof v === 'object' ? clone(v) : v
  }

  return bObject
}
