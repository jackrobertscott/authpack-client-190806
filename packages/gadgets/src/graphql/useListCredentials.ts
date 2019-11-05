import { createUseServer } from '../hooks/useServer'

export const useListCredentials = createUseServer<
  {
    options?:
      | object
      | {
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
      email?: string
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
        email
      }
    }
  `,
})
