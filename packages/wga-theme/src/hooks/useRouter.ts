import * as queryString from 'query-string'
import * as pathToRegexp from 'path-to-regexp'
import { useMemo, ReactNode, useState, useEffect } from 'react'
import { Location } from 'history'
import { history } from '../utils/history'
import { useMounted } from './useMounted'

export const useRouter = ({
  base,
  nomatch,
  options = [],
}: {
  base?: string
  nomatch?: string
  options?: Array<{
    path: string
    children: ReactNode
    exact?: boolean
  }>
} = {}) => {
  const mounted = useMounted()
  const [location, locationChange] = useState<Location>(history.location)
  const compare = (path: string, exact: boolean = false) => {
    const regexp: RegExp = pathToRegexp(`${base || ''}${path}`, [], {
      ...options,
      end: exact,
    })
    return !!regexp.exec(location.pathname)
  }
  const [current] = options
    .sort((a, b) => (a.exact ? (b.exact ? 0 : 1) : -1))
    .filter(option => compare(option.path, option.exact))
  const change = (path: string) => {
    if (!mounted.current) return
    history.push(`${base || ''}${path}`)
  }
  const forward = () => history.goForward()
  const backward = () => history.goForward()
  useEffect(() => {
    return history.listen((data: Location) => {
      if (!mounted.current) return
      locationChange(data)
    })
  }, [])
  useEffect(() => {
    if (!mounted.current) return
    if (!current && nomatch) change(nomatch)
  }, [location, options.map(option => option.path).join()])
  return useMemo(() => {
    return {
      current,
      change,
      forward,
      backward,
      compare,
      params: queryString.parse(location.search),
      location,
    }
  }, [location])
}
