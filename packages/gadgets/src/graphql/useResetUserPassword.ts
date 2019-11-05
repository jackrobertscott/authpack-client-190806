import { createUseServer } from '../hooks/useServer'

export const useResetUserPassword = createUseServer<
  {
    value:
      | object
      | {
          code: string
          password: string
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
  name: 'ResetUserPassword',
  query: `
    mutation ResetUserPassword($value: ResetUserPasswordValue!) {
      user: ResetUserPassword(value: $value) {
        id
        created
        updated
        meta
      }
    }
  `,
})
