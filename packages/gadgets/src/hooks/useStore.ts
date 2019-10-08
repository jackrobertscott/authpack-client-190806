import { useState, useEffect, useMemo, useRef } from 'react'
import { Store } from 'events-and-things'

export const useStore = <T extends { [key: string]: any }>(
  store: string | Store<T>,
  initial: T = {} as any
): [T, Store<T>] => {
  const current = useRef(
    typeof store === 'string' ? new Store<T>(initial, store) : store
  )
  const [state, stateChange] = useState<T>(current.current.state)
  useEffect(() => {
    return current.current.listen(data => stateChange(data))
  }, [])
  return useMemo(() => [state, current.current], [state])
}
