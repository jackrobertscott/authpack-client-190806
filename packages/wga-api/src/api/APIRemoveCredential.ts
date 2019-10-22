import { generate } from '../utils/generate'

export const APIRemoveCredential = generate<
  {
    filter: {
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
  name: 'APIRemoveCredential',
  query: `
    query APIRemoveCredential($filter: FilterCredentials!) {
      credential: APIRemoveCredential(filter: $filter) {
        id
        created
        updated
        meta
      }
    }
  `,
})
