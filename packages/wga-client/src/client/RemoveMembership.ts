import { generate } from '../utils/generate'

export const RemoveMembership = generate<
  {
    filter: {
      // todo...
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
    mutation RemoveMembership($filter: RemoveMembershipValue) {
      membership: RemoveMembership(filter: $filter) {
        id
        created
        updated
        meta
      }
    }
  `,
})
