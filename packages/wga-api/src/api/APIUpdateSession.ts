import { generate } from '../utils/generate'

export const APIUpdateSession = generate<
  {
    id: string
    value: {
      meta?: { [key: string]: any }
    }
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
  name: 'APIUpdateSession',
  query: `
    mutation APIUpdateSession($id: String!, $value: APIUpdateSessionValue!) {
      session: APIUpdateSession(id: $id, value: $value) {
        id
        created
        updated
        meta
      }
    }
  `,
})
