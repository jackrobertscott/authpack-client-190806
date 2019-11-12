/**
 * Execute the latest function and arguments called within
 * a time window equivalent to the timeout.
 */
export const drip = (timeout: number, cb: (...args: any[]) => void) => {
  let waiting = false
  let next: undefined | (() => void)
  return (...args: any[]) => {
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

/**
 * Execute the latest function and arguments called within
 * a time window equivalent to the timeout.
 */
export const dribble = <T>(
  max: number,
  timeout: number,
  cb: (...args: any[]) => Promise<T>
) => {
  if (max < 1) throw new Error('Dribble max can not be less than 1')
  let waiting = false
  let queue: Array<() => void> = []
  return (...args: any[]): Promise<T> => {
    const go = () => {
      if (waiting) return
      waiting = true
      const tasks = queue.slice(0, max)
      queue = queue.slice(max, queue.length)
      tasks.forEach(task => (console.log(Date.now()) as any) || task())
      setTimeout(() => {
        waiting = false
        if (queue.length) go()
      }, timeout)
    }
    return new Promise<T>((resolve, reject) => {
      queue.push(() => resolve(cb(...args)))
      try {
        go()
      } catch (error) {
        reject(error)
      }
    })
  }
}

/**
 * Execute only if the timeout time has elapsed since last execution.
 */
export const halter = (timeout: number, cb: (...args: any[]) => void) => {
  let available = true
  return (...args: any[]) => {
    if (available) {
      cb(...args)
      available = false
      setTimeout(() => {
        available = true
      }, timeout)
    }
  }
}
