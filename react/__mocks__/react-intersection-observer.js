export const useInView = (threshold, triggerOnce) => {
  const inViewRef = undefined
  const inView = threshold === triggerOnce
  return [inViewRef, inView]
}
