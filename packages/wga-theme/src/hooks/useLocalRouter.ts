import { useMemo, ReactNode, useEffect } from 'react'
import { useStore } from './useStore'

export const useLocalRouter = <T>({
  local,
  options,
}: {
  local: string
  options: Array<{
    key: string
    children: ReactNode
  }>
}) => {
  const store = useStore<undefined | { key: string; children: ReactNode }>({
    key: local,
    initial: options[0],
  })
  useEffect(() => {
    const list = options.filter(i => store.state && store.state.key === i.key)
    if (store.change) store.change(list.length ? list[0] : undefined)
  }, [options])
  const change = (key: string) => {
    const list = options.filter(i => i.key === key)
    if (store.change) store.change(list.length ? list[0] : undefined)
  }
  const factory = () => ({
    current: store.state,
    change,
  })
  return useMemo(factory, [options])
}
