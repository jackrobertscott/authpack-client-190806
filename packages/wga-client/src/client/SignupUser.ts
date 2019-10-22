import { generate } from '../utils/generate'

export const SignupUser = generate<
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
  name: 'SignupUser',
  query: `
    mutation SignupUser($value: SignupUserValue) {
      session: SignupUser(value: $value) {
        id
        created
        updated
        meta
      }
    }
  `,
})
