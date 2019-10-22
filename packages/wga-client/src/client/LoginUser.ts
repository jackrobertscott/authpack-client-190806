import { generate } from '../utils/generate'

export const LoginUser = generate<
  {
    value: {
      // todo...
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
    mutation LoginUser($value: LoginUserValue) {
      session: LoginUser(value: $value) {
        id
        created
        updated
        meta
      }
    }
  `,
})
