import { generate } from '../utils/generate'

export const UpdateTeam = generate<
  {
    value: {
      // todo...
    }
  },
  {
    team: {
      id: string
    }
  }
>({
  name: 'UpdateTeam',
  query: `
    mutation UpdateTeam($value: UpdateTeamValue) {
      team: UpdateTeam(value: $value) {
        id
      }
    }
  `,
})
