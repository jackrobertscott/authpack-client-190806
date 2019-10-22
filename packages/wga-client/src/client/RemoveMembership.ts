import { generate } from '../utils/generate'

export const RemoveMembership = generate<
  {
    filter: {
      id?: string
      user?: string
      team?: string
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
  name: 'RemoveMembership',
  query: `
    mutation RemoveMembership($filter: FilterMemberships!) {
      membership: RemoveMembership(filter: $filter) {
        id
        created
        updated
        meta
      }
    }
  `,
})
