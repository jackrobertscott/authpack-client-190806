import { generate } from '../utils/generate'

export const RemoveTeam = generate<
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
