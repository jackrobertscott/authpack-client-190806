import { generate } from '../utils/generate'

export const APIRetrieveCredential = generate<
  {
    filter?: {
      id?: string
    }
  },
  {
    credential: {
      id: string
      created: string
      updated: string
      meta: { [key: string]: any }
    }
  }
>({
  name: 'APIRetrieveCredential',
  query: `
    query APIRetrieveCredential($filter: FilterCredentials) {
      credential: APIRetrieveCredential(filter: $filter) {
        id
        created
        updated
        meta
      }
    }
  `,
})
