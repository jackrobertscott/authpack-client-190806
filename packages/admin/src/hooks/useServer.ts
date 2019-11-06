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
    url: config.state.api,
    authorization: [
      config.state.devmode && config.state.domain
        ? `dev:${config.state.domain}`
        : config.state.domain,
      wga.state && wga.state.token && `Bearer${wga.state.token}`,
    ]
      .filter(Boolean)
      .join(','),
    name,
    query,
  })
}
