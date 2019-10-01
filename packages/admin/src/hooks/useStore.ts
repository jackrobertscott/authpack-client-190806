import { useState, useEffect, useMemo, useRef } from 'react'
import { Store } from 'events-and-things'

export const useStore = <T extends { [key: string]: any }>(
  key?: string,
  initial: T = {} as any
): [T, Store<T>] => {
  const current = useRef(new Store(initial, key))
  const [state, stateChange] = useState<T>(current.current.state)
  useEffect(() => {
    return current.current.listen(data => stateChange(data))
  }, [])
  return useMemo(() => [state, current.current], [state])
}
