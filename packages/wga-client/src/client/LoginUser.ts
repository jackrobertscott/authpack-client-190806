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
    }
  }
>({
  name: 'LoginUser',
  query: `
    mutation LoginUser($value: LoginUserValue) {
      session: LoginUser(value: $value) {
        id
      }
    }
  `,
})
