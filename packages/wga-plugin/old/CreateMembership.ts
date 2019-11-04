import { generate } from '../utils/graphql'

export const CreateMembership = generate<
  {
    value: {
      user?: string
      email?: string
      permissions?: string[]
      meta?: { [key: string]: any }
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
  name: 'CreateMembership',
  query: `
    mutation CreateMembership($value: CreateMembershipValue!) {
      membership: CreateMembership(value: $value) {
        id
        created
        updated
        meta
      }
    }
  `,
})
