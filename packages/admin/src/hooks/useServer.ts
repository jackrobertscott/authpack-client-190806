import { useGQL } from '@authpack/theme'
import { useAuthpackCurrent } from '../utils/authpack'
import { useUniversal } from './useUniversal'
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
  const auth = useAuthpackCurrent()
  const universal = useUniversal()
  return useGQL<T>({
    ...options,
    url: config.api,
    authorization: [
      universal.cluster_key_client || config.gadgets_key_client,
      auth.bearer,
    ]
      .filter(Boolean)
      .join(','),
  })
}
