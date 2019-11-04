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
  return useGQL<V, T>({
    url: config.state.api,
    authorization: [settings.state.domain, settings.state.bearer]
      .filter(String)
      .join(','),
    name,
    query,
  })
}
