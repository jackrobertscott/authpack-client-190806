import { createUseServer } from '../hooks/useServer'

export const useSwitchTeam = createUseServer<
  {
    value: {
      id: string
    }
  },
  {
    session: {
      id: string
    }
  }
>({
  name: 'SwitchTeam',
  query: `
    mutation SwitchTeam($value: SwitchTeamValue!) {
      session: SwitchTeam(value: $value) {
        id
      }
    }
  `,
})
