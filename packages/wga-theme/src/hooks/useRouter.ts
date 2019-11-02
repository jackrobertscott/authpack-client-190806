import * as pathToRegexp from 'path-to-regexp'
import { useMemo, ReactNode, useState, useEffect } from 'react'

export const useRouter = ({
  options,
}: {
  options: Array<{
    path: string
    children: ReactNode
    exact?: boolean
  }>
}) => {
  const [location, locationChange] = useState<Location>(document.location)
  useEffect(() => {
    const listener = () => locationChange(document.location)
    window.addEventListener('popstate', listener)
    return () => window.removeEventListener('popstate', listener)
  }, [])
  const change = (path: string) => {
    location.pathname = path
  }
  const assert = (path: string, exact: boolean = false) => {
    const regexp: RegExp = pathToRegexp(path, [], {
      ...options,
      end: exact,
    })
    return !!regexp.exec(location.pathname)
  }
  const list = options
    .sort((a, b) => (a.exact ? (b.exact ? 0 : 1) : -1))
    .filter(option => assert(option.path, option.exact))
  const factory = () => ({
    current: list.length ? list[0] : undefined,
    change,
    assert,
  })
  return useMemo(factory, [location])
}
