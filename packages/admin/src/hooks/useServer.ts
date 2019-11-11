import { useGQL } from 'wga-theme'
import { useGlobal } from './useGlobal'
import { wga } from '../utils/gadgets'
import { config } from '../config'

export const createUseServer = <T>(options: {
  operationName?: string
  query: string
}) => () => {
  return useServer<T>(options)
}

export const useServer = <T>(options: {
  operationName?: string
  query: string
}) => {
  const global = useGlobal()
  return useGQL<T>({
    ...options,
    url: config.api,
    authorization: [
      global.current_domain_key || config.gadgets_domain_key,
      wga.current.bearer,
    ]
      .filter(Boolean)
      .join(','),
  })
}
