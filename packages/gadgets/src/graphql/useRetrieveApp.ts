import { createUseServer } from '../hooks/useServer'

export const useRetrieveApp = createUseServer<
  {},
  {
    app: {
      id: string
      created: string
      updated: string
      meta: { [key: string]: any }
      name?: string
    }
  }
>({
  name: 'RetrieveApp',
  query: `
    query RetrieveApp {
      app: RetrieveApp {
        id
        created
        updated
        meta
        name
      }
    }
  `,
})
