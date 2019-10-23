import { generate } from '../utils/generate'
import { IMeta } from '../utils/types'
import { ITeam, TeamFields } from '../models/Team'

export const APICreateTeam = generate<
  {
    value: {
      meta?: IMeta
      name: string
      tag: string
      description?: string
    }
  },
  {
    team: ITeam
  }
>({
  name: 'APICreateTeam',
  query: `
    mutation APICreateTeam($value: APICreateTeamValue!) {
      team: APICreateTeam(value: $value) {
        ${TeamFields}
      }
    }
  `,
})
