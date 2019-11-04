import { createUseServer } from '../hooks/useServer'

export const useRetrieveSession = createUseServer<
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
  name: 'RetrieveSession',
  query: `
    query RetrieveSession {
      session: RetrieveSession {
        id
        created
        updated
        meta
      }
    }
  `,
})
