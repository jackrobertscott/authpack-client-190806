import { generate } from '../utils/generate'

export const APIRemoveProvider = generate<
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
  name: 'APIRemoveProvider',
  query: `
    mutation APIRemoveProvider($id: String!) {
      provider: APIRemoveProvider(id: $id) {
        id
        created
        updated
        meta
      }
    }
  `,
})
