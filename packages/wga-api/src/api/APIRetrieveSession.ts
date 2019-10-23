import { generate } from '../utils/generate'

export const APIRetrieveSession = generate<
  {
    id: string
  },
  {
    session: {
      id: string
      created: string
      updated: string
      meta: { [key: string]: any }
    }
  }
>({
  name: 'APIRetrieveSession',
  query: `
    query APIRetrieveSession($id: String!) {
      session: APIRetrieveSession(id: $id) {
        id
        created
        updated
        meta
      }
    }
  `,
})
