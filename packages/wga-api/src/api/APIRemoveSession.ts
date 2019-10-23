import { generate } from '../utils/generate'

export const APIRemoveSession = generate<
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
  name: 'APIRemoveSession',
  query: `
    mutation APIRemoveSession($id: String!) {
      session: APIRemoveSession(id: $id) {
        id
        created
        updated
        meta
      }
    }
  `,
})
