import { generate } from '../utils/generate'

export const APIUpdateProvider = generate<
  {
    filter: {
      id?: string
    }
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
    query APIUpdateProvider($filter: FilterProviders!, $value: APIUpdateProviderValue!) {
      provider: APIUpdateProvider(filter: $filter, value: $value) {
        id
        created
        updated
        meta
      }
    }
  `,
})
