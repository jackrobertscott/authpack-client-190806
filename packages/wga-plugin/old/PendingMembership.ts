import { generate } from '../utils/graphql'

export const PendingMembership = generate<
  {
    id: string
    value: {
      code: string
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
  name: 'PendingMembership',
  query: `
    mutation PendingMembership($id: String!, $value: PendingMembershipValue!) {
      user: PendingMembership(id: $id, value: $value) {
        id
        created
        updated
        meta
      }
    }
  `,
})
