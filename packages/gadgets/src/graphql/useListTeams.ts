import { createUseServer } from '../hooks/useServer'

export const useListTeams = createUseServer<
  {},
  {
    teams: Array<{
      id: string
      name: string
    }>
  }
>({
  name: 'ListTeams',
  query: `
    query ListTeams {
      teams: ListTeams {
        id
        name
      }
    }
  `,
})
