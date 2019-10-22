import { generate } from '../utils/generate'

export const APIUpdateTeam = generate<
  {
    filter: {
      id?: string
    }
    value: {
      meta?: { [key: string]: any }
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
  name: 'APIUpdateTeam',
  query: `
    query APIUpdateTeam($filter: FilterTeams!, $value: APIUpdateTeamValue!) {
      team: APIUpdateTeam(filter: $filter, value: $value) {
        id
        created
        updated
        meta
      }
    }
  `,
})
