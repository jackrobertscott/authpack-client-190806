import { useGQL } from 'wga-theme'
import { ConfigStore } from '../utils/config'
import { SettingsStore } from '../utils/settings'

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
  const config = ConfigStore.current
  const settings = SettingsStore.current
  const domainkey =
    settings.devmode && settings.domain
      ? `dev:${settings.domain}`
      : settings.domain
  return useGQL<T>({
    url: config.api,
    authorization: [domainkey, settings.bearer].filter(String).join(','),
    name,
    query,
  })
}
