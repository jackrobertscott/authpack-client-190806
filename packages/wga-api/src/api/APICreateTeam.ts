import { generate } from '../utils/generate'

export const APICreateTeam = generate<
  {
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
  name: 'APICreateTeam',
  query: `
    query APICreateTeam($value: APICreateTeamValue!) {
      team: APICreateTeam(value: $value) {
        id
        created
        updated
        meta
      }
    }
  `,
})
