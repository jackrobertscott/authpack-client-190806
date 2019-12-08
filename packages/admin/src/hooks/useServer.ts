import { useGQL } from 'wga-theme'
import { useUniversal } from './useUniversal'
import { authpack } from '../utils/authpack'
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
  const state = authpack.current()
  return useGQL<T>({
    ...options,
    url: config.api,
    authorization: [
      universal.cluster_key_client || config.gadgets_key_client,
      state.bearer,
    ]
      .filter(Boolean)
      .join(','),
  })
}
