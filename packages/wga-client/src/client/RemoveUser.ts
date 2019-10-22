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
    }
  }
>({
  name: 'RemoveUser',
  query: `
    mutation RemoveUser($filter: RemoveUserValue) {
      user: RemoveUser(filter: $filter) {
        id
      }
    }
  `,
})
