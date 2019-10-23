import { generate } from '../utils/generate'

export const APIListUsers = generate<
  {
    filter?: {
      id?: string
    }
    options?: {
      limit?: number
      skip?: number
      sort?: string
      reverse?: boolean
    }
  },
  {
    users: Array<{
      id: string
      created: string
      updated: string
      meta: { [key: string]: any }
    }>
  }
>({
  name: 'APIListUsers',
  query: `
    query APIListUsers($filter: FilterUsers, $options: FilterOptions) {
      users: APIListUsers(filter: $filter, options: $options) {
        id
        created
        updated
        meta
      }
    }
  `,
})
