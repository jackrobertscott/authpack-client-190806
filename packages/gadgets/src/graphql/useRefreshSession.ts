import { createUseServer } from '../hooks/useServer'

export const useRefreshSession = createUseServer<
  {},
  {
    session: {
      id: string
      token: string
      user: {
        id: string
        email: string
        username?: string
        given_name?: string
        family_name?: string
      }
      team?: {
        id: string
        name: string
        tag: string
        description?: string
      }
      permissions?: Array<{
        id: string
        name: string
        tag: string
        description?: string
      }>
    }
  }
>({
  name: 'RefreshSession',
  query: `
    mutation RefreshSession {
      session: RefreshSession {
        id
        token
        user {
          id
          email
          username
          given_name
          family_name
        }
        team {
          id
          name
          tag
          description
        }
        permissions {
          id
          name
          tag
          description
        }
      }
    }
  `,
})
