import { generate } from '../utils/generate'

export const APIListProviders = generate<
  {
    filter?: {
      id?: string
    }
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
  name: 'APIListProviders',
  query: `
    query APIListProviders($filter: FilterProviders, $options: OptionsList) {
      providers: APIListProviders(filter: $filter, options: $options) {
        id
        created
        updated
        meta
      }
    }
  `,
})
