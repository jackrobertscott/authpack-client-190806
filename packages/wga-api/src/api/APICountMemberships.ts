import { generate } from '../utils/generate'

export const APICountMemberships = generate<
  {
    filter?: {
      id?: string
    }
  },
  {
    count: number
  }
>({
  name: 'APICountMemberships',
  query: `
    query APICountMemberships($filter: FilterMemberships) {
      count: APICountMemberships(filter: $filter)
    }
  `,
})
