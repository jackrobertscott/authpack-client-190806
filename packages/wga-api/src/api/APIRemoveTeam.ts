import { generate } from '../utils/generate'

export const APIRemoveTeam = generate<
  {
    filter: {
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
  name: 'APIRemoveTeam',
  query: `
    query APIRemoveTeam($filter: FilterTeams!) {
      team: APIRemoveTeam(filter: $filter) {
        id
        created
        updated
        meta
      }
    }
  `,
})
