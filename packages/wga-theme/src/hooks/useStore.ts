import { useState, useEffect, useMemo } from 'react'
import { Store } from 'events-and-things'

export const useStore = <T>({
  key,
  store,
  initial,
}: {
  key?: string
  store?: Store<T>
  initial: T
}) => {
  const [persistor, persistorChange] = useState<Store<T> | undefined>()
  const [value, valueChange] = useState<T>(initial)
  useEffect(() => {
    persistorChange(store || new Store<T>(initial, key))
  }, [store])
  useEffect(() => {
    if (persistor) return persistor.listen((data: T) => valueChange(data))
  }, [persistor])
  const factory = () => ({
    state: persistor ? persistor.state : undefined,
    change: persistor ? (data: T) => persistor.change(data) : undefined,
    store: persistor,
  })
  return useMemo(factory, [value])
}
