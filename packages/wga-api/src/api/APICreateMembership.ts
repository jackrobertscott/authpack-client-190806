import { generate } from '../utils/generate'
import { IMeta } from '../utils/types'
import { IMembership, MembershipFields } from '../models/Membership'

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
    membership: IMembership
  }
>({
  name: 'APICreateMembership',
  query: `
    mutation APICreateMembership($value: APICreateMembershipValue!) {
      membership: APICreateMembership(value: $value) {
        ${MembershipFields}
      }
    }
  `,
})
