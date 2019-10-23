import { generate } from '../utils/generate'

export const APIRemoveCredential = generate<
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
  name: 'APIRemoveCredential',
  query: `
    mutation APIRemoveCredential($id: String!) {
      credential: APIRemoveCredential(id: $id) {
        id
        created
        updated
        meta
      }
    }
  `,
})
