import { createUseGraph } from './useGraph'

export const useCurrentSession = createUseGraph<{
  session: {
    id: string
    token: string
    user: {
      id: string
      email: string
      username?: string
      avatar?: string
      name?: string
    }
    workspace?: {
      id: string
      name: string
      tag: string
      description?: string
      active: boolean
    }
    permissions?: Array<{
      id: string
      name: string
      tag: string
      description?: string
    }>
  }
}>({
  query: `
    mutation CurrentSession {
      session: CurrentSession {
        id
        token
        user {
          id
          email
          username
          avatar
          name
        }
        workspace {
          id
          name
          tag
          description
          active
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
