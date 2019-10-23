import { generate } from '../utils/generate'

export const APIRemoveUser = generate<
  {
    id: string
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
  name: 'APIRemoveUser',
  query: `
    query APIRemoveUser($id: String!) {
      user: APIRemoveUser(id: $id) {
        id
        created
        updated
        meta
      }
    }
  `,
})
