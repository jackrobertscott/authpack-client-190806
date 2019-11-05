import { createUseServer } from '../hooks/useServer'

export const usePendingMembership = createUseServer<
  {
    id: string
    value: {
      code: string
    }
  },
  {
    user: {
      id: string
    }
  }
>({
  name: 'PendingMembership',
  query: `
    mutation PendingMembership($id: String!, $value: PendingMembershipValue!) {
      user: PendingMembership(id: $id, value: $value) {
        id
      }
    }
  `,
})
