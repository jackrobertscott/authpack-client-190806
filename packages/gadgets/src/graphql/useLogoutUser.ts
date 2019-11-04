import { createUseServer } from '../hooks/useServer'

export const useLogoutUser = createUseServer<
  {},
  {
    session: {
      id: string
      created: string
      updated: string
      meta: { [key: string]: any }
    }
  }
>({
  name: 'LogoutUser',
  query: `
    mutation LogoutUser {
      session: LogoutUser {
        id
        created
        updated
        meta
      }
    }
  `,
})
