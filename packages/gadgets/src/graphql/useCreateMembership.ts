import { createUseServer } from '../hooks/useServer'

export const useCreateMembership = createUseServer<
  {
    value: {
      user?: string
      email?: string
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
  name: 'CreateMembership',
  query: `
    mutation CreateMembership($value: CreateMembershipValue!) {
      membership: CreateMembership(value: $value) {
        id
      }
    }
  `,
})
