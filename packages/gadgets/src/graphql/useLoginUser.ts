import { createUseServer } from '../hooks/useServer'

export const useLoginUser = createUseServer<
  {
    value: {
      email: string
      password: string
    }
  },
  {
    session: {
      id: string
      token: string
    }
  }
>({
  name: 'LoginUser',
  query: `
    mutation LoginUser($value: LoginUserValue!) {
      session: LoginUser(value: $value) {
        id
        token
      }
    }
  `,
})
