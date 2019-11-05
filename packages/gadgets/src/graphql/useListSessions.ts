import { createUseServer } from '../hooks/useServer'

export const useListSessions = createUseServer<
  {
    options: {
      limit?: number
      skip?: number
      sort?: string
      reverse?: boolean
    }
  },
  {
    sessions: Array<{
      id: string
    }>
  }
>({
  name: 'ListSessions',
  query: `
    query ListSessions($options: FilterOptions) {
      sessions: ListSessions(options: $options) {
        id
      }
    }
  `,
})
