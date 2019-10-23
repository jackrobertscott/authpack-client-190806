import { generate } from '../utils/generate'

export const APICountTeams = generate<
  {
    filter?: {
      id?: string
      name?: string
      tag?: string
      description?: string
    }
  },
  {
    count: number
  }
>({
  name: 'APICountTeams',
  query: `
    query APICountTeams($filter: FilterTeams) {
      count: APICountTeams(filter: $filter)
    }
  `,
})
