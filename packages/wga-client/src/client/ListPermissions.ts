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
    }>
  }
>({
  name: 'ListPermissions',
  query: `
    query ListPermissions($options: OptionsList) {
      permissions: ListPermissions(options: $options) {
        id
      }
    }
  `,
})
