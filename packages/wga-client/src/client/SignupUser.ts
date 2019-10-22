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
    }
  }
>({
  name: 'SignupUser',
  query: `
    mutation SignupUser($value: SignupUserValue) {
      session: SignupUser(value: $value) {
        id
      }
    }
  `,
})
