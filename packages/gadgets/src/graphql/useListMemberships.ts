import { createUseServer } from '../hooks/useServer'

export const useListMemberships = createUseServer<
  {
    options?: {
      limit?: number
      skip?: number
      sort?: string
      reverse?: boolean
    }
  },
  {
    memberships: Array<{
      id: string
      created: string
      updated: string
      meta: { [key: string]: any }
    }>
  }
>({
  name: 'ListMemberships',
  query: `
    query ListMemberships($options: FilterOptions) {
      memberships: ListMemberships(options: $options) {
        id
        created
        updated
        meta
      }
    }
  `,
})
