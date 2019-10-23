import { generate } from '../utils/generate'

export const APIRemoveTeam = generate<
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
  name: 'APIRemoveTeam',
  query: `
    query APIRemoveTeam($id: String!) {
      team: APIRemoveTeam(id: $id) {
        id
        created
        updated
        meta
      }
    }
  `,
})
