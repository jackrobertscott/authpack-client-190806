import { generate } from '../utils/generate'

export const APIUpdateTeam = generate<
  {
    id: string
    value: {
      meta?: { [key: string]: any }
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
  name: 'APIUpdateTeam',
  query: `
    query APIUpdateTeam($id: String!, $value: APIUpdateTeamValue!) {
      team: APIUpdateTeam(id: $id, value: $value) {
        id
        created
        updated
        meta
      }
    }
  `,
})
