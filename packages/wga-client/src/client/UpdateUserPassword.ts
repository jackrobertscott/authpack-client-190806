import { generate } from '../utils/generate'

export const UpdateUserPassword = generate<
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
  name: 'UpdateUserPassword',
  query: `
    mutation UpdateUserPassword($value: UpdateUserPasswordValue) {
      user: UpdateUserPassword(value: $value) {
        id
        created
        updated
        meta
      }
    }
  `,
})
