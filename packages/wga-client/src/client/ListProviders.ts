import { generate } from '../utils/generate'

export const ListProviders = generate<
  {
    options?: {
      limit?: number
      skip?: number
      sort?: string
      reverse?: boolean
    }
  },
  {
    providers: Array<{
      id: string
      created: string
      updated: string
      meta: { [key: string]: any }
    }>
  }
>({
  name: 'ListProviders',
  query: `
    query ListProviders($options: OptionsList) {
      providers: ListProviders(options: $options) {
        id
        created
        updated
        meta
      }
    }
  `,
})
