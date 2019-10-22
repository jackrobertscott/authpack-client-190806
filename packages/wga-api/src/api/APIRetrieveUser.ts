import { generate } from '../utils/generate'

export const APIRetrieveUser = generate<
  {
    filter?: {
      id?: string
    }
  },
  {
    user: {
      id: string
      created: string
      updated: string
      meta: { [key: string]: any }
    }
  }
>({
  name: 'APIRetrieveUser',
  query: `
    query APIRetrieveUser($filter: FilterUsers) {
      user: APIRetrieveUser(filter: $filter) {
        id
        created
        updated
        meta
      }
    }
  `,
})
