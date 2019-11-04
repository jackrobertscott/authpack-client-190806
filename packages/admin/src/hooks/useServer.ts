import { useGQL } from 'wga-theme'
import { useConfig } from './useConfig'

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
    authorization: config.state.domain,
    name,
    query,
  })
}
