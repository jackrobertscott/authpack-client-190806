import { useMemo, ReactNode, useEffect, useRef } from 'react'
import { useStore } from './useStore'
import { Store } from 'events-and-things'

export const useLocalRouter = ({
  nomatch,
  options,
}: {
  nomatch?: string
  options: Array<{
    key: string
    children: ReactNode
  }>
}) => {
  const index = options.findIndex(({ key }) => key === nomatch)
  const start = index !== -1 ? options[index].key : options[0] && options[0].key
  const ref = useRef(new Store<undefined | string>(start))
  const store = useStore<undefined | string>({ store: ref.current })
  const [current] = options.filter(i => store && store === i.key)
  const change = (key: string) => {
    const matching = options.filter(i => i.key === key)
    if (ref.current.change)
      ref.current.change(matching.length ? matching[0].key : undefined)
  }
  useEffect(() => {
    if ((store && !current) || (current && current.key !== store)) {
      if (ref.current.change)
        ref.current.change(current ? current.key : nomatch)
    }
  }, [store, options.map(option => option.key).join()])
  return useMemo(() => {
    return { current, change }
  }, [store])
}
