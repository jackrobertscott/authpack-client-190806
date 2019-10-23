import { generate } from '../utils/generate'
import { IMeta } from '../utils/types'

export const APICreatePermission = generate<
  {
    value: {
      meta?: IMeta
      name: string
      tag: string
      description?: string
    }
  },
  {
    permission: {
      id: string
      created: string
      updated: string
      meta: IMeta
      name: string
      tag: string
      description?: string
    }
  }
>({
  name: 'APICreatePermission',
  query: `
    mutation APICreatePermission($value: APICreatePermissionValue!) {
      permission: APICreatePermission(value: $value) {
        id
        created
        updated
        meta
        name
        tag
        description
      }
    }
  `,
})
