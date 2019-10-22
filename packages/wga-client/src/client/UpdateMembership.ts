import { generate } from '../utils/generate'

export const UpdateMembership = generate<
  {
    filter: {
      id?: string
      user?: string
      team?: string
    }
    value: {
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
  name: 'UpdateMembership',
  query: `
    mutation UpdateMembership($filter: FilterMemberships!, $value: UpdateMembershipValue!) {
      membership: UpdateMembership(filter: $filter, value: $value) {
        id
        created
        updated
        meta
      }
    }
  `,
})
