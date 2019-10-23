import { generate } from '../utils/generate'

export const APIUpdateProvider = generate<
  {
    id: string
    value: {
      meta?: { [key: string]: any }
    }
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
  name: 'APIUpdateProvider',
  query: `
    query APIUpdateProvider($id: String!, $value: APIUpdateProviderValue!) {
      provider: APIUpdateProvider(id: $id, value: $value) {
        id
        created
        updated
        meta
      }
    }
  `,
})
