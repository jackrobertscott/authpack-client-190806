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
  return useGQL<V, T>({
    url: config.state.api,
    authorization: [config.state.domain, config.state.bearer]
      .filter(String)
      .join(','),
    name,
    query,
  })
}
