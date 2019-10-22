import { generate } from '../utils/generate'

export const APIListSessions = generate<
  {
    filter?: {
      id?: string
    }
    options?: {
      limit?: number
      skip?: number
      sort?: string
      reverse?: boolean
    }
  },
  {
    sessions: Array<{
      id: string
      created: string
      updated: string
      meta: { [key: string]: any }
    }>
  }
>({
  name: 'APIListSessions',
  query: `
    query APIListSessions($filter: FilterSessions, $options: OptionsList) {
      sessions: APIListSessions(filter: $filter, options: $options) {
        id
        created
        updated
        meta
      }
    }
  `,
})
