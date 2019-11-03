import { generate } from '../utils/generate'

export const RemoveUser = generate<
  {
    value: {
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
  name: 'RemoveUser',
  query: `
    mutation RemoveUser($value: RemoveUserValue!) {
      user: RemoveUser(value: $value) {
        id
        created
        updated
        meta
      }
    }
  `,
})
