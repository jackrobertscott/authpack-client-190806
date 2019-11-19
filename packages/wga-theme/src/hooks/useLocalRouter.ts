import { useMemo, ReactNode, useEffect, useState } from 'react'
import { useMounted } from './useMounted'

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
  const mounted = useMounted()
  const index = options.findIndex(option => option.key === nomatch)
  const start = index !== -1 ? options[index].key : options[0] && options[0].key
  const [key, keyChange] = useState<undefined | string>(start)
  const [current] = options.filter(option => key && key === option.key)
  const change = (next: string) => {
    if (!mounted.current) return
    const matching = options.filter(option => option.key === next)
    keyChange(matching.length ? matching[0].key : undefined)
  }
  useEffect(() => {
    if (!mounted.current) return
    if ((key && !current) || (current && current.key !== key)) {
      keyChange(current ? current.key : nomatch)
    }
  }, [key, options.map(option => option.key).join()])
  return useMemo(() => {
    return {
      current,
      change,
    }
  }, [key])
}
