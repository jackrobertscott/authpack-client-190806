import { generate } from '../utils/generate'

export const APIRetrievePermission = generate<
  {
    filter?: {
      id?: string
    }
  },
  {
    permission: {
      id: string
      created: string
      updated: string
      meta: { [key: string]: any }
    }
  }
>({
  name: 'APIRetrievePermission',
  query: `
    query APIRetrievePermission($filter: FilterPermissions) {
      permission: APIRetrievePermission(filter: $filter) {
        id
        created
        updated
        meta
      }
    }
  `,
})
