import { generate } from '../utils/generate'

export const UpdateTeam = generate<
  {
    value: {
      // todo...
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
    mutation UpdateTeam($value: UpdateTeamValue) {
      team: UpdateTeam(value: $value) {
        id
        created
        updated
        meta
      }
    }
  `,
})
