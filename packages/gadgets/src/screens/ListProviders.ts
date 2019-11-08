import { createElement as create, FC } from 'react'
import { Gadgets } from 'wga-theme'
import { useSettings } from '../hooks/useSettings'
import { createUseServer } from '../hooks/useServer'

export const ListProviders: FC = () => {
  const settings = useSettings()
  return create(Gadgets, {
    title: '3rd Party Logins',
    subtitle: settings.appname,
    children: null,
  })
}

const useCreateCredential = createUseServer<{
  credential: {
    id: string
    access_token: string
    email?: string
  }
}>({
  name: 'wgaCreateCredential',
  query: `
    mutation wgaCreateCredential($provider_id: String!, $code: String!) {
      credential: wgaCreateCredential(provider_id: $provider_id, code: $code) {
        id
        access_token
        email
      }
    }
  `,
})

const useListProviders = createUseServer<{
  providers: Array<{
    id: string
  }>
}>({
  name: 'wgaListProviders',
  query: `
    query wgaListProviders {
      providers: wgaListProviders {
        id
      }
    }
  `,
})
