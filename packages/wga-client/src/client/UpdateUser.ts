import { generate } from '../utils/generate'

export const UpdateUser = generate<
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
  name: 'UpdateUser',
  query: `
    mutation UpdateUser($value: UpdateUserValue) {
      user: UpdateUser(value: $value) {
        id
        created
        updated
        meta
      }
    }
  `,
})
