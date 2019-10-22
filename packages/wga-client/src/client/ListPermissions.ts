import { generate } from '../utils/generate'

export const ListPermissions = generate<
  {
    options: {
      // todo...
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
  name: 'ListPermissions',
  query: `
    query ListPermissions($options: OptionsList) {
      permissions: ListPermissions(options: $options) {
        id
        created
        updated
        meta
      }
    }
  `,
})
