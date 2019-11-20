import { useMemo, ReactNode, useEffect, useState } from 'react'
import { useMounted } from './useMounted'

export const useLocalRouter = ({
  name,
  nomatch,
  options,
}: {
  name?: string
  nomatch?: string
  options: Array<{
    key: string
    children: ReactNode
  }>
}) => {
  const mounted = useMounted()
  const local = name && localStorage.getItem(`wga.router.${name}`)
  const index = options.findIndex(option => option.key === (local || nomatch))
  const start = index >= 0 ? options[index].key : options[0] && options[0].key
  const [key, keyChange] = useState<undefined | string>(start)
  const [current] = options.filter(option => key && key === option.key)
  const change = (next: string) => {
    if (!mounted.current) return
    const matching = options.filter(option => option.key === next)
    keyChange(matching.length ? matching[0].key : undefined)
  }
  useEffect(() => {
    if (!mounted.current) return
    if (!current && start) return keyChange(start)
    if (name && key) localStorage.setItem(`wga.router.${name}`, key)
  }, [key, options.map(option => option.key).join()])
  return useMemo(() => {
    return {
      current,
      change,
    }
  }, [key])
}
