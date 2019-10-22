import { generate } from '../utils/generate'

export const CreateTeam = generate<
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
  name: 'CreateTeam',
  query: `
    mutation CreateTeam($value: CreateTeamValue) {
      team: CreateTeam(value: $value) {
        id
        created
        updated
        meta
      }
    }
  `,
})
