import { generate } from '../utils/generate'

export const APIUpdateUser = generate<
  {
    id: string
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
  name: 'APIUpdateUser',
  query: `
    query APIUpdateUser($id: String!, $value: APIUpdateUserValue!) {
      user: APIUpdateUser(id: $id, value: $value) {
        id
        created
        updated
        meta
      }
    }
  `,
})
