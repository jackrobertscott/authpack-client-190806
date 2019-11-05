import { createUseServer } from '../hooks/useServer'

export const useSignupUser = createUseServer<
  {
    value: {
      email: string
      password: string
      username?: string
      name?: string
      meta: { [key: string]: any }
    }
  },
  {
    session: {
      id: string
      token: string
    }
  }
>({
  name: 'SignupUser',
  query: `
    mutation SignupUser($value: SignupUserValue!) {
      session: SignupUser(value: $value) {
        id
        token
      }
    }
  `,
})
