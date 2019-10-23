import { generate } from '../utils/generate'

export const APIRemovePermission = generate<
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
  name: 'APIRemovePermission',
  query: `
    query APIRemovePermission($id: String!) {
      permission: APIRemovePermission(id: $id) {
        id
        created
        updated
        meta
      }
    }
  `,
})
