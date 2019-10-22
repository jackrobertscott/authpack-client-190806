import { generate } from '../utils/generate'

export const SwitchTeam = generate<
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
  name: 'SwitchTeam',
  query: `
    mutation SwitchTeam($value: SwitchTeamValue) {
      team: SwitchTeam(value: $value) {
        id
      }
    }
  `,
})
