import { generate } from '../utils/generate'

export const APIRetrieveSession = generate<
  {
    filter?: {
      id?: string
    }
  },
  {
    session: {
      id: string
      created: string
      updated: string
      meta: { [key: string]: any }
    }
  }
>({
  name: 'APIRetrieveSession',
  query: `
    query APIRetrieveSession($filter: FilterSessions) {
      session: APIRetrieveSession(filter: $filter) {
        id
        created
        updated
        meta
      }
    }
  `,
})
