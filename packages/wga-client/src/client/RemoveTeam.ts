import { generate } from '../utils/generate'

export const RemoveTeam = generate<
  {
    filter: {
      id?: string
      name?: string
      tag?: string
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
  name: 'RemoveTeam',
  query: `
    mutation RemoveTeam($filter: FilterTeams!) {
      team: RemoveTeam(filter: $filter) {
        id
        created
        updated
        meta
      }
    }
  `,
})
