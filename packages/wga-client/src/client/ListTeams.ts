import { generate } from '../utils/generate'

export const ListTeams = generate<
  {
    options?: {
      limit?: number
      skip?: number
      sort?: string
      reverse?: boolean
    }
  },
  {
    teams: Array<{
      id: string
      created: string
      updated: string
      meta: { [key: string]: any }
    }>
  }
>({
  name: 'ListTeams',
  query: `
    query ListTeams($options: OptionsList) {
      teams: ListTeams(options: $options) {
        id
        created
        updated
        meta
      }
    }
  `,
})
