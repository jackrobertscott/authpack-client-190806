import { generate } from '../utils/generate'
import { IMeta } from '../utils/types'
import { IPermission, PermissionFields } from '../models/Permission'

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
    permission: IPermission
  }
>({
  name: 'APICreatePermission',
  query: `
    mutation APICreatePermission($value: APICreatePermissionValue!) {
      permission: APICreatePermission(value: $value) {
        ${PermissionFields}
      }
    }
  `,
})
