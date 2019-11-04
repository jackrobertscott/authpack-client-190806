import * as queryString from 'query-string'
import * as pathToRegexp from 'path-to-regexp'
import { useMemo, ReactNode, useState, useEffect } from 'react'

export const useRouter = ({
  base,
  nomatch,
  options,
}: {
  base?: string
  nomatch?: string
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
  const assert = (path: string, exact: boolean = false) => {
    const regexp: RegExp = pathToRegexp(`${base || ''}${path}`, [], {
      ...options,
      end: exact,
    })
    return !!regexp.exec(location.pathname)
  }
  const [current] = options
    .sort((a, b) => (a.exact ? (b.exact ? 0 : 1) : -1))
    .filter(option => assert(option.path, option.exact))
  const change = (path: string) => {
    location.pathname = `${base || ''}${path}`
  }
  useEffect(() => {
    if (!current && nomatch) change(nomatch)
  }, [location, options.map(option => option.path).join()])
  const factory = () => ({
    current,
    change,
    assert,
    params: queryString.parse(location.search),
    location,
  })
  return useMemo(factory, [location])
}
