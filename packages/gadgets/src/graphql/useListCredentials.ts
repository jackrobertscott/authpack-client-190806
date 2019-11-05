import { createUseServer } from '../hooks/useServer'

export const useListCredentials = createUseServer<
  {},
  {
    credentials: Array<{
      id: string
      access_token: string
      email?: string
    }>
  }
>({
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
