import { useGQL } from 'wga-theme'
import { useUniversal } from './useUniversal'
import { wga } from '../utils/wga'
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
  const universal = useUniversal()
  return useGQL<T>({
    ...options,
    url: config.api,
    authorization: [
      universal.app_domain_key || config.gadgets_domain_key,
      wga.current.bearer,
    ]
      .filter(Boolean)
      .join(','),
  })
}
