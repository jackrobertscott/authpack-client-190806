import { generate } from '../utils/generate'

export const APIRetrieveUser = generate<
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
  name: 'APIRetrieveUser',
  query: `
    query APIRetrieveUser($id: String!) {
      user: APIRetrieveUser(id: $id) {
        id
        created
        updated
        meta
      }
    }
  `,
})
