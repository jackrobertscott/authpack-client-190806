import { createUseServer } from '../hooks/useServer'

export const useRefreshSession = createUseServer<
  {},
  {
    session: {
      id: string
      token: string
    }
  }
>({
  name: 'RefreshSession',
  query: `
    mutation RefreshSession {
      session: RefreshSession {
        id
        token
      }
    }
  `,
})
