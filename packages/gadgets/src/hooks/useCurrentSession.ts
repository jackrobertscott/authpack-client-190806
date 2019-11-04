import { useGQL } from 'wga-theme'
import { useConfig } from './useConfig'

export const useCurrentSession = () => {
  const config = useConfig()
  return useGQL<{
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
    url: config.state.api,
    name: 'CurrentSession',
    query: `
      query CurrentSession {
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
}
