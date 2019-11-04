import { createUseServer } from '../hooks/useServer'

export const useRemoveTeam = createUseServer<
  {
    id: string
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
  name: 'RemoveTeam',
  query: `
    mutation RemoveTeam($id: String!) {
      team: RemoveTeam(id: $id) {
        id
        created
        updated
        meta
      }
    }
  `,
})
