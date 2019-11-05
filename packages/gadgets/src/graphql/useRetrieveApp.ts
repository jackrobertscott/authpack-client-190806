import { createUseServer } from '../hooks/useServer'

export const useRetrieveApp = createUseServer<
  {},
  {
    app: {
      id: string
      created: string
      updated: string
      name: string
      subscribed: boolean
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
        name
        subscribed
      }
    }
  `,
})
