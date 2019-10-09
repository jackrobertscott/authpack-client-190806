/**
 * Execute the latest function and arguments called within
 * a time window equivalent to the timeout.
 */
export const drip = (timeout: number, cb: (...args: unknown[]) => void) => {
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

export const halter = (timeout: number, cb: (...args: unknown[]) => void) => {
  let available = true
  return (...args: unknown[]) => {
    if (available) {
      cb(...args)
      available = false
      setTimeout(() => {
        available = true
      }, timeout)
    }
  }
}
