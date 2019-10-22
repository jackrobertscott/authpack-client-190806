import { generate } from '../utils/generate'

export const APICreateMembership = generate<
  {
    value: {
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
  name: 'APICreateMembership',
  query: `
    query APICreateMembership($value: APICreateMembershipValue!) {
      membership: APICreateMembership(value: $value) {
        id
        created
        updated
        meta
      }
    }
  `,
})
