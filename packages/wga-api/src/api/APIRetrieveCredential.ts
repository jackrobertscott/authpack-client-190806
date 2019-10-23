import { generate } from '../utils/generate'

export const APIRetrieveCredential = generate<
  {
    id: string
  },
  {
    credential: {
      id: string
      created: string
      updated: string
      meta: { [key: string]: any }
    }
  }
>({
  name: 'APIRetrieveCredential',
  query: `
    query APIRetrieveCredential($id: String!) {
      credential: APIRetrieveCredential(id: $id) {
        id
        created
        updated
        meta
      }
    }
  `,
})
