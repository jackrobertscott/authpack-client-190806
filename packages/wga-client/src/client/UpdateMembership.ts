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
      created: string
      updated: string
      meta: { [key: string]: any }
    }
  }
>({
  name: 'UpdateMembership',
  query: `
    mutation UpdateMembership($value: UpdateMembershipValue) {
      membership: UpdateMembership(value: $value) {
        id
        created
        updated
        meta
      }
    }
  `,
})
