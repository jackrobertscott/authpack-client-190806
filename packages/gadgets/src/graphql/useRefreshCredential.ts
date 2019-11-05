import { createUseServer } from '../hooks/useServer'

export const useRefreshCredential = createUseServer<
  {
    id: string
    value: {
      code: string
    }
  },
  {
    credential: {
      id: string
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
        access_token
        email
      }
    }
  `,
})
