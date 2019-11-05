import { createUseServer } from '../hooks/useServer'

export const useResetUserPassword = createUseServer<
  {
    value: {
      code: string
      password: string
    }
  },
  {
    user: {
      id: string
    }
  }
>({
  name: 'ResetUserPassword',
  query: `
    mutation ResetUserPassword($value: ResetUserPasswordValue!) {
      user: ResetUserPassword(value: $value) {
        id
      }
    }
  `,
})
