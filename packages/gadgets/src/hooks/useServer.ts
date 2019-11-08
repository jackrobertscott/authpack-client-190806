import { useGQL } from 'wga-theme'
import { useSettings } from './useSettings'
import { config } from '../config'

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
  const settings = useSettings()
  const domainkey =
    settings.devmode && settings.domain
      ? `dev:${settings.domain}`
      : settings.domain
  return useGQL<T>({
    url: config.api,
    authorization: [domainkey, settings.bearer].filter(Boolean).join(','),
    name,
    query,
  })
}
