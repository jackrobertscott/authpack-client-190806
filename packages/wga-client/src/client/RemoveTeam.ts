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
    }
  }
>({
  name: 'RemoveTeam',
  query: `
    mutation RemoveTeam($filter: RemoveTeamValue) {
      team: RemoveTeam(filter: $filter) {
        id
      }
    }
  `,
})
