import { createUseServer } from '../hooks/useServer'

export const useUpdateMembership = createUseServer<
  {
    id: string
    value: {
      permission_ids?: string[]
      meta?: { [key: string]: any }
    }
  },
  {
    membership: {
      id: string
    }
  }
>({
  name: 'UpdateMembership',
  query: `
    mutation UpdateMembership($id: String!, $value: UpdateMembershipValue!) {
      membership: UpdateMembership(id: $id, value: $value) {
        id
      }
    }
  `,
})
