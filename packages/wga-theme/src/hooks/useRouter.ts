import * as queryString from 'query-string'
import * as pathToRegexp from 'path-to-regexp'
import { useMemo, ReactNode, useState, useEffect } from 'react'

export const useRouter = (
  createArgs: (
    location: Location
  ) => {
    nomatch?: string
    options: Array<{
      path: string
      children: ReactNode
      exact?: boolean
    }>
  }
) => {
  const [location, locationChange] = useState<Location>(document.location)
  const { nomatch, options } = createArgs(location)
  useEffect(() => {
    const listener = () => locationChange(document.location)
    window.addEventListener('popstate', listener)
    return () => window.removeEventListener('popstate', listener)
  }, [])
  const [current] = options
    .sort((a, b) => (a.exact ? (b.exact ? 0 : 1) : -1))
    .filter(option => assert(option.path, option.exact))
  useEffect(() => {
    if (!current && nomatch) change(nomatch)
  }, [location, options.map(option => option.path).join()])
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
  const factory = () => ({
    current,
    change,
    assert,
    params: queryString.parse(location.search),
    location,
  })
  return useMemo(factory, [location])
}
