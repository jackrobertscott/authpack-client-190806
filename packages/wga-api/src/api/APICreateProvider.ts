import { generate } from '../utils/generate'
import { IMeta } from '../utils/types'
import { IProvider, ProviderFields } from '../models/Provider'

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
    provider: IProvider
  }
>({
  name: 'APICreateProvider',
  query: `
    mutation APICreateProvider($value: APICreateProviderValue!) {
      provider: APICreateProvider(value: $value) {
        ${ProviderFields}
      }
    }
  `,
})
