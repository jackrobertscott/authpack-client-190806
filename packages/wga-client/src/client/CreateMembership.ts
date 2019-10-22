import { generate } from '../utils/generate'

export const CreateMembership = generate<
  {
    value: {
      meta?: { [key: string]: any }
      user?: string
      email?: string
      permissions?: string[]
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
    mutation CreateMembership($value: CreateMembershipValue) {
      membership: CreateMembership(value: $value) {
        id
        created
        updated
        meta
      }
    }
  `,
})
