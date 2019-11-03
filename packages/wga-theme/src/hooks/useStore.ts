import { useState, useEffect, useMemo } from 'react'
import { Store } from 'events-and-things'

export const useStore = <T>({
  key,
  store,
  initial,
}: {
  key?: string
  store?: Store<T | undefined>
  initial?: T
}) => {
  const [persistor, persistorChange] = useState<
    Store<T | undefined> | undefined
  >()
  const [value, valueChange] = useState<T | undefined>(
    store ? store.state : initial
  )
  useEffect(() => {
    persistorChange(store || new Store<T | undefined>(initial, key))
  }, [store])
  useEffect(() => {
    if (persistor)
      return persistor.listen((data: T | undefined) => valueChange(data))
  }, [persistor])
  const factory = () => ({
    state: persistor ? persistor.state : undefined,
    change: persistor ? (data: T) => persistor.change(data) : undefined,
    store: persistor,
  })
  return useMemo(factory, [value])
}
