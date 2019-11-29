import {
  createElement as create,
  FC,
  ReactNode,
  useState,
  useMemo,
  useRef,
} from 'react'
import { SpinnerContext } from '../contexts/Spinner'
import { useMounted } from '../hooks/useMounted'

export const Spinner: FC<{
  children: ReactNode
}> = ({ children }) => {
  const log = useRef<string[]>([])
  const mounted = useMounted()
  const [loading, loadingChange] = useState<boolean>(false)
  const begin = () => {
    const next = Math.random()
      .toString(36)
      .substring(6)
    if (mounted.current) loadingChange(true)
    log.current = [...log.current, next]
    return () => {
      log.current = log.current.filter(id => id !== next)
      if (mounted.current && !log.current.length) loadingChange(false)
    }
  }
  const value = useMemo(() => {
    return {
      loading,
      begin,
    }
  }, [loading])
  return create(SpinnerContext.Provider, {
    value,
    children,
  })
}
