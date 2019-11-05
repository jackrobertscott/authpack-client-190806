import { useGQL } from 'wga-theme'
import { useConfig } from './useConfig'

export const createUseServer = <V, T>(options: {
  name: string
  query: string
}) => () => {
  return useServer<V, T>(options)
}

export const useServer = <V, T>({
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
  return useGQL<V, T>({
    url: config.state.api,
    authorization: [domainkey, config.state.bearer].filter(String).join(','),
    name,
    query,
  })
}
