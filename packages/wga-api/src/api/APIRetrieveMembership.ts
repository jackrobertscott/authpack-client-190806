import { generate } from '../utils/generate'

export const APIRetrieveMembership = generate<
  {
    filter?: {
      id?: string
    }
  },
  {
    membership: {
      id: string
      created: string
      updated: string
      meta: { [key: string]: any }
    }
  }
>({
  name: 'APIRetrieveMembership',
  query: `
    query APIRetrieveMembership($filter: FilterMemberships) {
      membership: APIRetrieveMembership(filter: $filter) {
        id
        created
        updated
        meta
      }
    }
  `,
})
