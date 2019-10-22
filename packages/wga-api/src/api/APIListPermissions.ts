import { generate } from '../utils/generate'

export const APIListPermissions = generate<
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
    permissions: Array<{
      id: string
      created: string
      updated: string
      meta: { [key: string]: any }
    }>
  }
>({
  name: 'APIListPermissions',
  query: `
    query APIListPermissions($filter: FilterPermissions, $options: OptionsList) {
      permissions: APIListPermissions(filter: $filter, options: $options) {
        id
        created
        updated
        meta
      }
    }
  `,
})
