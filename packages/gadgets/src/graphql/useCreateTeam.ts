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
      created: string
      updated: string
      meta: { [key: string]: any }
      name: string
      tag: string
      description?: string
    }
  }
>({
  name: 'CreateTeam',
  query: `
    mutation CreateTeam($value: CreateTeamValue!) {
      team: CreateTeam(value: $value) {
        id
        created
        updated
        meta
        name
        tag
        description
      }
    }
  `,
})
