import { useGQL } from 'wga-theme'
import { useConfig } from './useConfig'
import { useSettings } from './useSettings'

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
  const settings = useSettings()
  const domainkey =
    settings.state.devmode && settings.state.domain
      ? `dev:${settings.state.domain}`
      : settings.state.domain
  return useGQL<V, T>({
    url: config.state.api,
    authorization: [domainkey, settings.state.bearer].filter(String).join(','),
    name,
    query,
  })
}
