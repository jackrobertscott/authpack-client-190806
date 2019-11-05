import { createUseServer } from '../hooks/useServer'

export const useUpdateUserPassword = createUseServer<
  {
    value: {
      passwordCurrent: string
      passwordNew: string
    }
  },
  {
    user: {
      id: string
    }
  }
>({
  name: 'UpdateUserPassword',
  query: `
    mutation UpdateUserPassword($value: UpdateUserPasswordValue!) {
      user: UpdateUserPassword(value: $value) {
        id
      }
    }
  `,
})
