import { createUseServer } from '../hooks/useServer'

export const useUpdateUser = createUseServer<
  {
    value: {
      email?: string
      username?: string
      name?: string
      meta?: { [key: string]: any }
    }
  },
  {
    user: {
      id: string
    }
  }
>({
  name: 'UpdateUser',
  query: `
    mutation UpdateUser($value: UpdateUserValue!) {
      user: UpdateUser(value: $value) {
        id
      }
    }
  `,
})
