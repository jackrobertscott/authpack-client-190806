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
      universal.cluster_key_client || config.gadgets_key_client,
      wga.current.bearer,
    ]
      .filter(Boolean)
      .join(','),
  })
}
