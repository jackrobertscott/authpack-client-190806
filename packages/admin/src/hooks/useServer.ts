import { useGQL } from '@authpack/theme'
import { useAuthpack } from '@authpack/react'
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
  const authpack = useAuthpack()
  const universal = useUniversal()
  return useGQL<T>({
    ...options,
    url: config.api,
    authorization: [
      universal.cluster_key_client || config.gadgets_key_client,
      authpack.bearer,
    ]
      .filter(Boolean)
      .join(','),
  })
}
