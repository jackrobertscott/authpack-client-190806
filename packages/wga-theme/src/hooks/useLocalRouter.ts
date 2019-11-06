import { useMemo, ReactNode, useEffect } from 'react'
import { useStore } from './useStore'

export const useLocalRouter = ({
  local,
  nomatch,
  options,
}: {
  local?: string
  nomatch?: string
  options: Array<{
    key: string
    children: ReactNode
  }>
}) => {
  const store = useStore<undefined | string>({
    key: local,
    initial: options[0] && options[0].key,
  })
  const [current] = options.filter(i => store.state && store.state === i.key)
  const change = (key: string) => {
    const matching = options.filter(i => i.key === key)
    if (store.change)
      store.change(matching.length ? matching[0].key : undefined)
  }
  useEffect(() => {
    if ((store.state && !current) || (current && current.key !== store.state)) {
      if (store.change) store.change(current ? current.key : nomatch)
    }
  }, [store.state, options.map(option => option.key).join()])
  return useMemo(() => {
    return { current, change }
  }, [store.state])
}
