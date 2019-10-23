import { generate } from '../utils/generate'
import { IMeta } from '../utils/types'

export const APICreateProvider = generate<
  {
    value: {
      meta?: IMeta
      preset: string
      client: string
      secret: string
      scopes: string[]
    }
  },
  {
    provider: {
      id: string
      created: string
      updated: string
      meta: IMeta
      preset: string
      client: string
      secret: string
      scopes: string[]
    }
  }
>({
  name: 'APICreateProvider',
  query: `
    mutation APICreateProvider($value: APICreateProviderValue!) {
      provider: APICreateProvider(value: $value) {
        id
        created
        updated
        meta
        preset
        client
        secret
        scopes
      }
    }
  `,
})
