import { createElement as create, FC } from 'react'
import { Gadgets } from 'wga-theme'
import { useSettings } from '../hooks/useSettings'
import { createUseServer } from '../hooks/useServer'

export const ListCredentials: FC = () => {
  const settings = useSettings()
  return create(Gadgets, {
    title: 'Credentials',
    subtitle: settings.appname,
    children: null,
  })
}

const useUpdateCredential = createUseServer<{
  credential: {
    id: string
    access_token: string
    email?: string
  }
}>({
  query: `
    mutation wgaUpdateCredential($id: String!, $code: String!) {
      credential: wgaUpdateCredential(id: $id, code: $code) {
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
  query: `
    mutation wgaRemoveCredential($id: String!) {
      credential: wgaRemoveCredential(id: $id) {
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
  query: `
    query wgaListCredentials {
      credentials: wgaListCredentials {
        id
        access_token
        email
      }
    }
  `,
})
