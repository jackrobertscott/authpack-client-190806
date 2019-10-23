import { generate } from '../utils/generate'
import { IMeta } from '../utils/types'

export const APICreateMembership = generate<
  {
    value: {
      meta?: IMeta
      team: string
      user: string
      permissions?: string[]
    }
  },
  {
    membership: {
      id: string
      created: string
      updated: string
      meta: IMeta
      team: string
      user: string
      permissions: string[]
    }
  }
>({
  name: 'APICreateMembership',
  query: `
    query APICreateMembership($value: APICreateMembershipValue!) {
      membership: APICreateMembership(value: $value) {
        id
        created
        updated
        meta
        team
        user
        permissions
      }
    }
  `,
})
