import { generate } from '../utils/generate'

export const LogoutUser = generate<
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
  name: 'LogoutUser',
  query: `
    mutation LogoutUser($value: LogoutUserValue) {
      session: LogoutUser(value: $value) {
        id
      }
    }
  `,
})
