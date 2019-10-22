import { generate } from '../utils/generate'

export const RemoveUser = generate<
  {
    filter: {
      // todo...
    }
  },
  {
    user: {
      id: string
      created: string
      updated: string
      meta: { [key: string]: any }
    }
  }
>({
  name: 'RemoveUser',
  query: `
    mutation RemoveUser($filter: RemoveUserValue) {
      user: RemoveUser(filter: $filter) {
        id
        created
        updated
        meta
      }
    }
  `,
})
