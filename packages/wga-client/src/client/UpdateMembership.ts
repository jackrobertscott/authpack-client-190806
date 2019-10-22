import { generate } from '../utils/generate'

export const UpdateMembership = generate<
  {
    value: {
      // todo...
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
    mutation UpdateMembership($value: UpdateMembershipValue) {
      membership: UpdateMembership(value: $value) {
        id
      }
    }
  `,
})
