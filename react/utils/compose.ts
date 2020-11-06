export default function compose(...funcs: Function[]) {
  const functions = funcs.reverse()

  return (...args: any[]) => {
    const [firstFunction, ...restFunctions] = functions
    let result = firstFunction(...args)

    restFunctions.forEach((fnc) => {
      result = fnc.call(null, result)
    })

    return result
  }
}
