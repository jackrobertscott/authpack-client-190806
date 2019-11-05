import { createUseServer } from '../hooks/useServer'

export const useLogoutUser = createUseServer<
  {},
  {
    session: {
      id: string
    }
  }
>({
  name: 'LogoutUser',
  query: `
    mutation LogoutUser {
      session: LogoutUser {
        id
      }
    }
  `,
})
