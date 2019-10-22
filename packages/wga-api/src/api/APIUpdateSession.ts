import { generate } from '../utils/generate'

export const APIUpdateSession = generate<
  {
    filter: {
      id?: string
    }
    value: {
      meta?: { [key: string]: any }
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
  name: 'APIUpdateSession',
  query: `
    query APIUpdateSession($filter: FilterSessions!, $value: APIUpdateSessionValue!) {
      session: APIUpdateSession(filter: $filter, value: $value) {
        id
        created
        updated
        meta
      }
    }
  `,
})
