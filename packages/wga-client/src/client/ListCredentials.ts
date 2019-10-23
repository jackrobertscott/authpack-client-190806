import { generate } from '../utils/generate'

export const ListCredentials = generate<
  {
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
      token: string
      identifier: string
    }>
  }
>({
  name: 'ListCredentials',
  query: `
    query ListCredentials($options: FilterOptions) {
      credentials: ListCredentials(options: $options) {
        id
        created
        updated
        meta
        token
        identifier
      }
    }
  `,
})
