import { generate } from '../utils/generate'

export const APIRemoveSession = generate<
  {
    filter: {
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
  name: 'APIRemoveSession',
  query: `
    query APIRemoveSession($filter: FilterSessions!) {
      session: APIRemoveSession(filter: $filter) {
        id
        created
        updated
        meta
      }
    }
  `,
})
