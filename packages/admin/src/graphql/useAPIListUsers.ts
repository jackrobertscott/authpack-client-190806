import { createUseServer } from '../hooks/useServer'

export const useAPIListUsers = createUseServer<
  {
    filter: {
      email?: string
    }
    options: {
      limit?: number
      skip?: number
      sort?: string
      reverse?: boolean
    }
  },
  {
    count: number
    users: Array<{
      id: string
      updated: string
      email: string
      username?: string
      name?: string
    }>
  }
>({
  name: 'APIListUsers',
  query: `
    query APIListUsers($filter: FilterUsers, $options: FilterOptions) {
      count: APICountUsers(filter: $filter)
      users: APIListUsers(filter: $filter, options: $options) {
        id
        updated
        email
        username
        name
      }
    }
`,
})
