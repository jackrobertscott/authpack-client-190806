import { generate } from '../utils/generate'

export const APICountProviders = generate<
  {
    filter?: {
      id?: string
    }
  },
  {
    count: number
  }
>({
  name: 'APICountProviders',
  query: `
    query APICountProviders($filter: FilterProviders) {
      count: APICountProviders(filter: $filter)
    }
  `,
})
