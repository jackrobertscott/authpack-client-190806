import { generate } from '../utils/generate'

export const UpdateTeam = generate<
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
      created: string
      updated: string
      meta: { [key: string]: any }
    }
  }
>({
  name: 'UpdateTeam',
  query: `
    mutation UpdateTeam($id: String!, $value: UpdateTeamValue!) {
      team: UpdateTeam(id: $id, value: $value) {
        id
        created
        updated
        meta
      }
    }
  `,
})
