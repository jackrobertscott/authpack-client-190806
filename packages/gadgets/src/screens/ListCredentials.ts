import { createElement as create, FC } from 'react'
import { Gadgets } from 'wga-theme'
import { useSettings } from '../hooks/useSettings'
import { createUseServer } from '../hooks/useServer'

export const ListCredentials: FC = () => {
  const settings = useSettings()
  return create(Gadgets, {
    title: 'Credentials',
    subtitle: settings.state.appname,
    children: null,
  })
}

const useRefreshCredential = createUseServer<{
  credential: {
    id: string
    access_token: string
    email?: string
  }
}>({
  name: 'RefreshCredential',
  query: `
    mutation RefreshCredential($id: String!, $value: RefreshCredentialValue!) {
      credential: RefreshCredential(id: $id, value: $value) {
        id
        access_token
        email
      }
    }
  `,
})

const useRemoveCredential = createUseServer<{
  credential: {
    id: string
  }
}>({
  name: 'RemoveCredential',
  query: `
    mutation RemoveCredential($id: String!) {
      credential: RemoveCredential(id: $id) {
        id
      }
    }
  `,
})

const useListCredentials = createUseServer<{
  credentials: Array<{
    id: string
    access_token: string
    email?: string
  }>
}>({
  name: 'ListCredentials',
  query: `
    query ListCredentials {
      credentials: ListCredentials {
        id
        access_token
        email
      }
    }
  `,
})
