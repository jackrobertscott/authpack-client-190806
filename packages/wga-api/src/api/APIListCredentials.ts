import { generate } from '../utils/generate'

export const APIListCredentials = generate<
  {
    filter?: {
      id?: string
      user?: string
      provider?: string
    }
    options?: {
      limit?: number
      skip?: number
      sort?: string
      reverse?: boolean
    }
  },
  {
    credentials: Array<{
      id: string
      created: string
      updated: string
      meta: { [key: string]: any }
    }>
  }
>({
  name: 'APIListCredentials',
  query: `
    query APIListCredentials($filter: FilterCredentials, $options: FilterOptions) {
      credentials: APIListCredentials(filter: $filter, options: $options) {
        id
        created
        updated
        meta
      }
    }
  `,
})
