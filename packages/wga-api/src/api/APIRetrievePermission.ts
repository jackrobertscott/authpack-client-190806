import { generate } from '../utils/generate'

export const APIRetrievePermission = generate<
  {
    id: string
  },
  {
    permission: {
      id: string
      created: string
      updated: string
      meta: { [key: string]: any }
    }
  }
>({
  name: 'APIRetrievePermission',
  query: `
    query APIRetrievePermission($id: String!) {
      permission: APIRetrievePermission(id: $id) {
        id
        created
        updated
        meta
      }
    }
  `,
})
