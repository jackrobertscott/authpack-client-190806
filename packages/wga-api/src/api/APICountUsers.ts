import { generate } from '../utils/generate'

export const APICountUsers = generate<
  {
    filter?: {
      id?: string
      email?: string
      username?: string
      name?: string
    }
  },
  {
    count: number
  }
>({
  name: 'APICountUsers',
  query: `
    query APICountUsers($filter: FilterUsers) {
      count: APICountUsers(filter: $filter)
    }
  `,
})
