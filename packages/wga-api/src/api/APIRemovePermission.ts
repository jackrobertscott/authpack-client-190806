import { generate } from '../utils/generate'

export const APIRemovePermission = generate<
  {
    filter: {
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
  name: 'APIRemovePermission',
  query: `
    query APIRemovePermission($filter: FilterPermissions!) {
      permission: APIRemovePermission(filter: $filter) {
        id
        created
        updated
        meta
      }
    }
  `,
})
