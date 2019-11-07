import { useGQL } from 'wga-theme'
import { useConfig } from './useConfig'
import { wga } from '../utils/wga'

export const createUseServer = <T>(options: {
  name: string
  query: string
}) => () => {
  return useServer<T>(options)
}

export const useServer = <T>({
  name,
  query,
}: {
  name: string
  query: string
}) => {
  const config = useConfig()
  return useGQL<T>({
    url: config.api,
    authorization: [
      config.devmode && config.domain ? `dev:${config.domain}` : config.domain,
      wga.current.bearer,
    ]
      .filter(Boolean)
      .join(','),
    name,
    query,
  })
}
