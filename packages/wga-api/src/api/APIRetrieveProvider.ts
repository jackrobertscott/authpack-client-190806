import { generate } from '../utils/generate'

export const APIRetrieveProvider = generate<
  {
    id: string
  },
  {
    provider: {
      id: string
      created: string
      updated: string
      meta: { [key: string]: any }
    }
  }
>({
  name: 'APIRetrieveProvider',
  query: `
    query APIRetrieveProvider($id: String!) {
      provider: APIRetrieveProvider(id: $id) {
        id
        created
        updated
        meta
      }
    }
  `,
})
