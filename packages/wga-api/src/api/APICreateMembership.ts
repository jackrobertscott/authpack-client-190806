import { generate } from '../utils/generate'
import { IMeta } from '../utils/types'

export const APICreateMembership = generate<
  {
    value: {
      meta?: IMeta
      user: string
      team: string
      permissions?: string[]
      admin?: boolean
    }
  },
  {
    membership: {
      id: string
      created: string
      updated: string
      meta: IMeta
      user: string
      team: string
      permissions: string[]
      admin: boolean
    }
  }
>({
  name: 'APICreateMembership',
  query: `
    mutation APICreateMembership($value: APICreateMembershipValue!) {
      membership: APICreateMembership(value: $value) {
        id
        created
        updated
        meta
        user
        team
        permissions
        admin
      }
    }
  `,
})
