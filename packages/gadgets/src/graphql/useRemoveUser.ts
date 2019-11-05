import { createUseServer } from '../hooks/useServer'

export const useRemoveUser = createUseServer<
  {
    value: {
      password: string
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
    mutation RemoveUser($value: RemoveUserValue!) {
      user: RemoveUser(value: $value) {
        id
      }
    }
  `,
})
