import { createElement as create, FC } from 'react'
import { Gadgets } from 'wga-theme'
import { useSettings } from '../hooks/useSettings'
import { createUseServer } from '../hooks/useServer'

export const ListProviders: FC = () => {
  const settings = useSettings()
  return create(Gadgets, {
    title: '3rd Party Logins',
    subtitle: settings.state.appname,
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
  name: 'CreateCredential',
  query: `
    mutation CreateCredential($value: CreateCredentialValue!) {
      credential: CreateCredential(value: $value) {
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
  name: 'ListProviders',
  query: `
    query ListProviders {
      providers: ListProviders {
        id
      }
    }
  `,
})
