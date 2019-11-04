import { generate } from '../utils/graphql'

export const SignupUser = generate<
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
      created: string
      updated: string
      meta: { [key: string]: any }
    }
  }
>({
  name: 'SignupUser',
  query: `
    mutation SignupUser($value: SignupUserValue!) {
      session: SignupUser(value: $value) {
        id
        created
        updated
        meta
      }
    }
  `,
})
