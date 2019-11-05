import { createUseServer } from '../hooks/useServer'

export const useListTeams = createUseServer<
  {
    options?:
      | object
      | {
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
    query ListTeams($options: FilterOptions) {
      teams: ListTeams(options: $options) {
        id
        created
        updated
        meta
      }
    }
  `,
})
