import {
  createElement as create,
  FC,
  ReactNode,
  useState,
  useMemo,
} from 'react'
import { SpinnerContext } from '../contexts/Spinner'

export const Spinner: FC<{
  children: ReactNode
}> = ({ children }) => {
  const [log, logChange] = useState<string[]>([])
  const [loading, loadingChange] = useState<boolean>(false)
  const begin = () => {
    const next = Math.random()
      .toString(36)
      .substring(6)
    loadingChange(true)
    logChange([...log, next])
    return () => {
      const remaining = log.filter(id => id !== next)
      logChange(remaining)
      if (!remaining.length) loadingChange(false)
    }
  }
  const value = useMemo(() => {
    return {
      log,
      loading,
      begin,
    }
  }, [log, loading])
  return create(SpinnerContext.Provider, {
    value,
    children,
  })
}
