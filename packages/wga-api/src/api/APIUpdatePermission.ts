import { generate } from '../utils/generate'

export const APIUpdatePermission = generate<
  {
    id: string
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
    mutation APIUpdatePermission($id: String!, $value: APIUpdatePermissionValue!) {
      permission: APIUpdatePermission(id: $id, value: $value) {
        id
        created
        updated
        meta
      }
    }
  `,
})
