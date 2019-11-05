import { createUseServer } from '../hooks/useServer'

export const useRefreshCredential = createUseServer<
  {
    id: string
    value:
      | object
      | {
          code: string
        }
  },
  {
    credential: {
      id: string
      created: string
      updated: string
      meta: { [key: string]: any }
      access_token: string
      email?: string
    }
  }
>({
  name: 'RefreshCredential',
  query: `
    mutation RefreshCredential($id: String!, $value: RefreshCredentialValue!) {
      credential: RefreshCredential(id: $id, value: $value) {
        id
        created
        updated
        meta
        access_token
        email
      }
    }
  `,
})
