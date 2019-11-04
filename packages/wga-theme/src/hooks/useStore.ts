import { useState, useEffect, useMemo } from 'react'
import { Store } from 'events-and-things'

export const useStore = <T>({
  key,
  initial,
  ...options
}: {
  key?: string
  store?: Store<T>
  initial?: T
}) => {
  const getStore = () => options.store || new Store<T>(initial as T, key)
  const [store, storeChange] = useState<Store<T>>(getStore())
  const [value, valueChange] = useState<T>(store ? store.state : (initial as T))
  useEffect(() => {
    if (options.store) storeChange(options.store)
  }, [options.store])
  useEffect(() => {
    if (store) return store.listen((data: T) => valueChange(data))
  }, [store])
  const factory = () => ({
    store,
    state: store.state,
    change: (data: T) => store.change(data),
  })
  return useMemo(factory, [value])
}
