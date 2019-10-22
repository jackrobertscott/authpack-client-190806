import { generate } from '../utils/generate'

export const APIUpdatePermission = generate<
  {
    filter: {
      id?: string
    }
    value: {
      meta?: { [key: string]: any }
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
  name: 'APIUpdatePermission',
  query: `
    query APIUpdatePermission($filter: FilterPermissions!, $value: APIUpdatePermissionValue!) {
      permission: APIUpdatePermission(filter: $filter, value: $value) {
        id
        created
        updated
        meta
      }
    }
  `,
})
