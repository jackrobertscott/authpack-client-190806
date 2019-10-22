import { generate } from '../utils/generate'

export const CreateMembership = generate<
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
  name: 'CreateMembership',
  query: `
    mutation CreateMembership($value: CreateMembershipValue) {
      membership: CreateMembership(value: $value) {
        id
      }
    }
  `,
})
