import { createUseServer } from '../hooks/useServer'

export const useCreateTeam = createUseServer<
  {
    value: {
      name: string
      tag: string
      description?: string
      meta?: { [key: string]: any }
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
    mutation CreateTeam($value: CreateTeamValue!) {
      team: CreateTeam(value: $value) {
        id
      }
    }
  `,
})
