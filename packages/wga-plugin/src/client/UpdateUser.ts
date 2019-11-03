import { generate } from '../utils/generate'

export const UpdateUser = generate<
  {
    value: {
      email?: string
      username?: string
      name?: string
      meta?: { [key: string]: any }
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
    mutation UpdateUser($value: UpdateUserValue!) {
      user: UpdateUser(value: $value) {
        id
        created
        updated
        meta
      }
    }
  `,
})
