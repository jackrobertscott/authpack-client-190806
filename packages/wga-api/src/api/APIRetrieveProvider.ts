import { generate } from '../utils/generate'

export const APIRetrieveProvider = generate<
  {
    filter?: {
      id?: string
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
  name: 'APIRetrieveProvider',
  query: `
    query APIRetrieveProvider($filter: FilterProviders) {
      provider: APIRetrieveProvider(filter: $filter) {
        id
        created
        updated
        meta
      }
    }
  `,
})
