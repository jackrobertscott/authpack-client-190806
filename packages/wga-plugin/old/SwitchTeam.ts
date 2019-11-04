import { generate } from '../utils/graphql'

export const SwitchTeam = generate<
  {
    value: {
      id: string
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
    mutation SwitchTeam($value: SwitchTeamValue!) {
      team: SwitchTeam(value: $value) {
        id
        created
        updated
        meta
      }
    }
  `,
})
