import { generate } from '../utils/generate'

export const APIRetrieveTeam = generate<
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
  name: 'APIRetrieveTeam',
  query: `
    query APIRetrieveTeam($id: String!) {
      team: APIRetrieveTeam(id: $id) {
        id
        created
        updated
        meta
      }
    }
  `,
})
