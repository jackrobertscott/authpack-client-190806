import { generate } from '../utils/generate'

export const APICountSessions = generate<
  {
    filter?: {
      id?: string
      user?: string
      team?: string
      deactivated?: boolean
    }
  },
  {
    count: number
  }
>({
  name: 'APICountSessions',
  query: `
    query APICountSessions($filter: FilterSessions) {
      count: APICountSessions(filter: $filter)
    }
  `,
})
