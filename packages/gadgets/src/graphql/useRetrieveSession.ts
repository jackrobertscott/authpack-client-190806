import { createUseServer } from '../hooks/useServer'

export const useRetrieveSession = createUseServer<
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
  name: 'RetrieveSession',
  query: `
    query RetrieveSession {
      session: RetrieveSession {
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
