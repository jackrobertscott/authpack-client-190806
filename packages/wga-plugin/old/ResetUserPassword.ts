import { generate } from '../utils/graphql'

export const ResetUserPassword = generate<
  {
    value: {
      code: string
      password: string
    }
  },
  {
    user: {
      id: string
      created: string
      updated: string
      meta: { [key: string]: any }
    }
  }
>({
  name: 'ResetUserPassword',
  query: `
    mutation ResetUserPassword($value: ResetUserPasswordValue!) {
      user: ResetUserPassword(value: $value) {
        id
        created
        updated
        meta
      }
    }
  `,
})
