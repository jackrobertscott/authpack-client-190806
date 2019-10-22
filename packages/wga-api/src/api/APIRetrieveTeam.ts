import { generate } from '../utils/generate'

export const APIRetrieveTeam = generate<
  {
    filter?: {
      id?: string
    }
  },
  {
    team: {
      id: string
      created: string
      updated: string
      meta: { [key: string]: any }
    }
  }
>({
  name: 'APIRetrieveTeam',
  query: `
    query APIRetrieveTeam($filter: FilterTeams) {
      team: APIRetrieveTeam(filter: $filter) {
        id
        created
        updated
        meta
      }
    }
  `,
})
