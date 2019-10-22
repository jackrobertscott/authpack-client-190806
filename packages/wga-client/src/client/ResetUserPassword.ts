import { generate } from '../utils/generate'

export const ResetUserPassword = generate<
  {
    value: {
      // todo...
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
    mutation ResetUserPassword($value: ResetUserPasswordValue) {
      user: ResetUserPassword(value: $value) {
        id
        created
        updated
        meta
      }
    }
  `,
})
