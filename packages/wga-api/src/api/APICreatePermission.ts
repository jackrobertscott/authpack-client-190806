import { generate } from '../utils/generate'

export const APICreatePermission = generate<
  {
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
  name: 'APICreatePermission',
  query: `
    query APICreatePermission($value: APICreatePermissionValue!) {
      permission: APICreatePermission(value: $value) {
        id
        created
        updated
        meta
      }
    }
  `,
})
