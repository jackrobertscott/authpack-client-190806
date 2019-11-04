import { generate } from '../utils/graphql'

export const UpdateUserPassword = generate<
  {
    value: {
      passwordCurrent: string
      passwordNew: string
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
    mutation UpdateUserPassword($value: UpdateUserPasswordValue!) {
      user: UpdateUserPassword(value: $value) {
        id
        created
        updated
        meta
      }
    }
  `,
})
