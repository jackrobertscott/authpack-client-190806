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
      created: string
      updated: string
      meta: { [key: string]: any }
      token: string
    }
  }
>({
  name: 'LoginUser',
  query: `
    mutation LoginUser($value: LoginUserValue!) {
      session: LoginUser(value: $value) {
        id
        created
        updated
        meta
        token
      }
    }
  `,
})
