import { createUseServer } from '../hooks/useServer'

export const useRefreshSession = createUseServer<
  {},
  {
    session: {
      id: string
      created: string
      updated: string
      meta: { [key: string]: any }
      token: string
    }
  }
>({
  name: 'RefreshSession',
  query: `
    mutation RefreshSession {
      session: RefreshSession {
        id
        created
        updated
        meta
        token
      }
    }
  `,
})
