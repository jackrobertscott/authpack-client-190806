import { useGQL } from 'wga-theme'
import { useConfig } from './useConfig'

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
  const domainkey =
    config.state.devmode && config.state.domain
      ? `dev:${config.state.domain}`
      : config.state.domain
  return useGQL<T>({
    url: config.state.api,
    authorization: [domainkey, config.state.bearer].filter(String).join(','),
    name,
    query,
  })
}
