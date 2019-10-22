import { generate } from '../utils/generate'

export const RemoveTeam = generate<
  {
    filter: {
      // todo...
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
    mutation RemoveTeam($filter: RemoveTeamValue) {
      team: RemoveTeam(filter: $filter) {
        id
        created
        updated
        meta
      }
    }
  `,
})
