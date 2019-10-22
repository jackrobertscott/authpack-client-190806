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
      created: string
      updated: string
      meta: { [key: string]: any }
    }
  }
>({
  name: 'LogoutUser',
  query: `
    mutation LogoutUser($value: LogoutUserValue) {
      session: LogoutUser(value: $value) {
        id
        created
        updated
        meta
      }
    }
  `,
})
