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
    }
  }
>({
  name: 'RemoveMembership',
  query: `
    mutation RemoveMembership($filter: RemoveMembershipValue) {
      membership: RemoveMembership(filter: $filter) {
        id
      }
    }
  `,
})
