import { createUseServer } from '../hooks/useServer'

export const useForgotUserPassword = createUseServer<
  {
    value:
      | object
      | {
          email: string
        }
  },
  {
    email: string
  }
>({
  name: 'ForgotUserPassword',
  query: `
    mutation ForgotUserPassword($value: ForgotUserPasswordValue!) {
      email: ForgotUserPassword(value: $value)
    }
  `,
})
