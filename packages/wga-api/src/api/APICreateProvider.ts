import { generate } from '../utils/generate'

export const APICreateProvider = generate<
  {
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
  name: 'APICreateProvider',
  query: `
    query APICreateProvider($value: APICreateProviderValue!) {
      provider: APICreateProvider(value: $value) {
        id
        created
        updated
        meta
      }
    }
  `,
})
