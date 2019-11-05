import { createUseServer } from '../hooks/useServer'

export const usePendingMembership = createUseServer<
  {
    id: string
    value:
      | object
      | {
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
