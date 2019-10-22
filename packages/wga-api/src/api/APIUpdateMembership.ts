import { generate } from '../utils/generate'

export const APIUpdateMembership = generate<
  {
    filter: {
      id?: string
    }
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
  name: 'APIUpdateMembership',
  query: `
    query APIUpdateMembership($filter: FilterMemberships!, $value: APIUpdateMembershipValue!) {
      membership: APIUpdateMembership(filter: $filter, value: $value) {
        id
        created
        updated
        meta
      }
    }
  `,
})
