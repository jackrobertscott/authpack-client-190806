import { generate } from '../utils/generate'

export const APIRemoveMembership = generate<
  {
    filter: {
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
  name: 'APIRemoveMembership',
  query: `
    query APIRemoveMembership($filter: FilterMemberships!) {
      membership: APIRemoveMembership(filter: $filter) {
        id
        created
        updated
        meta
      }
    }
  `,
})
