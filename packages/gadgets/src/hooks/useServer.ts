import { useGQL } from 'wga-theme'
import { useSettings } from './useSettings'
import { config } from '../config'

export const createUseServer = <T>(options: {
  operationName?: string
  query: string
}) => () => {
  return useServer<T>(options)
}

export const useServer = <T>({
  operationName,
  query,
}: {
  operationName?: string
  query: string
}) => {
  const settings = useSettings()
  return useGQL<T>({
    url: config.api,
    authorization: [settings.domain, settings.bearer].filter(Boolean).join(','),
    operationName,
    query,
  })
}
