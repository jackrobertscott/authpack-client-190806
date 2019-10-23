import { generate } from '../utils/generate'

export const APIListTeams = generate<
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
    teams: Array<{
      id: string
      created: string
      updated: string
      meta: { [key: string]: any }
    }>
  }
>({
  name: 'APIListTeams',
  query: `
    query APIListTeams($filter: FilterTeams, $options: FilterOptions) {
      teams: APIListTeams(filter: $filter, options: $options) {
        id
        created
        updated
        meta
      }
    }
  `,
})
