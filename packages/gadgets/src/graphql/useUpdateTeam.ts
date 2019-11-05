import { createUseServer } from '../hooks/useServer'

export const useUpdateTeam = createUseServer<
  {
    id: string
    value: {
      name?: string
      tag?: string
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
  name: 'UpdateTeam',
  query: `
    mutation UpdateTeam($id: String!, $value: UpdateTeamValue!) {
      team: UpdateTeam(id: $id, value: $value) {
        id
      }
    }
  `,
})
