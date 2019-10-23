import { generate } from '../utils/generate'

export const APICreateUser = generate<
  {
    value: {
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
  name: 'APICreateUser',
  query: `
    mutation APICreateUser($value: APICreateUserValue!) {
      user: APICreateUser(value: $value) {
        id
        created
        updated
        meta
      }
    }
  `,
})
