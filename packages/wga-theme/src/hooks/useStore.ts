import { useState, useEffect, useMemo } from 'react'
import { Store } from 'events-and-things'

export const useStore = <T>({ store }: { store: Store<T> }) => {
  const [value, valueChange] = useState(store.current)
  useEffect(() => {
    if (store) return store.listen((data: T) => valueChange(data))
  }, [store])
  return useMemo(() => value, [value])
}
