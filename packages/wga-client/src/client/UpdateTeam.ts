import { generate } from '../utils/generate'

export const UpdateTeam = generate<
  {
    filter: {
      id?: string
      name?: string
      tag?: string
    }
    value: {
      name?: string
      tag?: string
      description?: string
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
  name: 'UpdateTeam',
  query: `
    mutation UpdateTeam($filter: FilterTeams!, $value: UpdateTeamValue!) {
      team: UpdateTeam($filter: filter, value: $value) {
        id
        created
        updated
        meta
      }
    }
  `,
})
