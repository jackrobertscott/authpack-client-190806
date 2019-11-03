import { generate } from '../utils/generate'

export const LogoutUser = generate<
  {},
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
    mutation LogoutUser {
      session: LogoutUser {
        id
        created
        updated
        meta
      }
    }
  `,
})
