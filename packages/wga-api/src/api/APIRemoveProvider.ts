import { generate } from '../utils/generate'

export const APIRemoveProvider = generate<
  {
    filter: {
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
  name: 'APIRemoveProvider',
  query: `
    query APIRemoveProvider($filter: FilterProviders!) {
      provider: APIRemoveProvider(filter: $filter) {
        id
        created
        updated
        meta
      }
    }
  `,
})
