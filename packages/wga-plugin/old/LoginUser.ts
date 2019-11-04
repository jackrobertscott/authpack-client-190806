import { generate } from '../utils/graphql'

export const LoginUser = generate<
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
      }
    }
  `,
})
