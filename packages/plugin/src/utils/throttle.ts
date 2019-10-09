export const throttle = (timeout: number, cb: (...args: unknown[]) => void) => {
  let waiting = false
  let next: undefined | (() => void)
  return (...args: unknown[]) => {
    if (waiting) {
      next = () => cb(...args)
    } else {
      cb(...args)
      waiting = true
      setTimeout(() => {
        if (next) next()
        next = undefined
        waiting = false
      }, timeout)
    }
  }
}
