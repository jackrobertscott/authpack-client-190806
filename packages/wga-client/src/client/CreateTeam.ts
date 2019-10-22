import { generate } from '../utils/generate'

export const CreateTeam = generate<
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
  name: 'CreateTeam',
  query: `
    mutation CreateTeam($value: CreateTeamValue) {
      team: CreateTeam(value: $value) {
        id
      }
    }
  `,
})
