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
      created: string
      updated: string
      meta: { [key: string]: any }
    }
  }
>({
  name: 'SwitchTeam',
  query: `
    mutation SwitchTeam($value: SwitchTeamValue) {
      team: SwitchTeam(value: $value) {
        id
        created
        updated
        meta
      }
    }
  `,
})
